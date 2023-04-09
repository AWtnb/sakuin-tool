import { Entry } from "@/helpers/entry";
import { arrayOfLines } from "@/helpers/utils.js";

export class ReferenceChecker {
  constructor(s) {
    const lines = arrayOfLines(s);
    this.entries = lines.filter((x) => String(x).trim()).map((line) => new Entry(line));
    this.refs = this.entries.filter((entry) => entry.isReference);
    this.nonRefs = this.entries.filter((entry) => !entry.isReference);
    this.referred = this.entries.filter((entry) => entry.backLink.length > 0);
  }

  /**
   * 見よ項目があるのに参照先に括弧で付記されていないものを探す
   */
  findMissingRefferdFrom() {
    return this.refs
      .map((ref) => {
        const grep = this.nonRefs.filter((entry) => {
          return entry.basename == ref.referTo && entry.backLink.includes(ref.basename);
        });
        if (grep.length > 0) {
          return null;
        }
        return {
          problem: ref.name,
          require: `${ref.referTo}\uff08${ref.basename}\uff09`,
        };
      })
      .filter(Boolean);
  }

  /**
   * 参照元として括弧書きされているのに見よ項目がないものを探す
   */
  findMissingRefs() {
    return this.referred
      .map((refed) => {
        const required = refed.backLink.filter((s) => {
          const correctRefs = this.refs.filter((entry) => entry.basename == s && entry.referTo == refed.basename);
          return correctRefs.length < 1;
        });
        if (required.length < 1) {
          return null;
        }
        return {
          problem: refed.name,
          require: required.map((s) => `${s}\u3000\u2192${refed.basename}`),
        };
      })
      .filter(Boolean);
  }

  /**
   * 見よ項目と見よ先項目が隣接しているものを探す
   */
  findAdjacent() {
    const stack = [];
    this.entries.forEach((entry, idx) => {
      // filter で要素数を減らしてしまうとインデックスで参照できなくなるので注意
      if (entry.isReference) {
        const previous = this.entries[idx - 1];
        if (previous && !previous.isReference && previous.backLink.includes(entry.basename)) {
          stack.push(entry);
        }
        const next = this.entries[idx + 1];
        if (next && !next.isReference && next.backLink.includes(entry.basename)) {
          stack.push(entry);
        }
      }
    });
    return stack.map((entry) => entry.name);
  }
}
