import { Entry } from "@/helpers/entry";

export class ReferenceChecker {
  constructor(lines) {
    this.entries = lines.filter((x) => String(x).trim()).map((line) => new Entry(line));
    this.refs = this.entries.filter((entry) => entry.isReference);
    this.nonRefs = this.entries.filter((entry) => !entry.isReference);
    this.referred = this.entries.filter((entry) => entry.referredFrom.length > 0);
  }

  goalLostReference() {
    // 見よ項目があるのに参照先に括弧で付記されていないものを探す
    return this.refs
      .map((ref) => {
        const grep = this.nonRefs.filter((entry) => {
          return entry.basename == ref.referTo && entry.referredFrom.includes(ref.basename);
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

  requiredFromReference() {
    // 参照元として括弧書きされているのに見よ項目がないものを探す
    return this.referred
      .map((refed) => {
        const required = refed.referredFrom.filter((s) => {
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

  findAdjacent() {
    // 見よ項目と見よ先項目が隣接しているものを探す
    const stack = [];
    this.entries.forEach((entry, idx) => {
      // filter で要素数を減らしてしまうとインデックスで参照できなくなるので注意
      if (entry.isReference) {
        const previous = this.entries[idx - 1];
        if (previous && !previous.isReference && previous.referredFrom.includes(entry.basename)) {
          stack.push(entry);
        }
        const next = this.entries[idx + 1];
        if (next && !next.isReference && next.referredFrom.includes(entry.basename)) {
          stack.push(entry);
        }
      }
    });
    return stack.map((entry) => entry.name);
  }
}
