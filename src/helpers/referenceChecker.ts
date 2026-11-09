import { Entry } from "@/helpers/entry";
import { arrayOfLines } from "@/helpers/utils";

type MissingBackLinkIssue = { problem: string; require: string };
type MissingRefIssue = { problem: string; require: string[] };

export class ReferenceChecker {
  readonly entries: Entry[];
  readonly refs: Entry[];
  readonly nonRefs: Entry[];
  readonly referred: Entry[];

  constructor(s: string) {
    const lines = arrayOfLines(s);
    this.entries = lines
      .filter((line) => String(line).trim())
      .map((line) => new Entry(line));
    this.refs = this.entries.filter((entry) => entry.isReference);
    this.nonRefs = this.entries.filter((entry) => !entry.isReference);
    this.referred = this.entries.filter((entry) => entry.backLink.length > 0);
  }

  /**
   * 見よ項目があるのに参照先に括弧で付記されていないものを探す
   */
  findMissingBackLink(): MissingBackLinkIssue[] {
    return this.refs
      .map((ref) => {
        if (this.hasMatchingBackLink(ref)) {
          return null;
        }

        return {
          problem: ref.name,
          require: `${ref.referTo}（${ref.basename}）`,
        };
      })
      .filter((result): result is MissingBackLinkIssue => result !== null);
  }

  /**
   * 参照元として括弧書きされているのに見よ項目がないものを探す
   */
  findMissingRefs(): MissingRefIssue[] {
    return this.referred
      .map((entry) => {
        const required = this.getMissingReferences(entry);
        if (required.length < 1) {
          return null;
        }

        return {
          problem: entry.name,
          require: required.map((source) => `${source}　→${entry.basename}`),
        };
      })
      .filter((result): result is MissingRefIssue => result !== null);
  }

  /**
   * 見よ項目と見よ先項目が隣接しているものを探す
   */
  findAdjacent(): string[] {
    const stack: Entry[] = [];

    this.entries.forEach((entry, index) => {
      // filter で要素数を減らしてしまうとインデックスで参照できなくなるので注意
      if (!entry.isReference) {
        return;
      }

      const previous = this.entries[index - 1];
      if (previous && !previous.isReference && previous.backLink.includes(entry.basename)) {
        stack.push(entry);
      }

      const next = this.entries[index + 1];
      if (next && !next.isReference && next.backLink.includes(entry.basename)) {
        stack.push(entry);
      }
    });

    return stack.map((entry) => entry.name);
  }

  private hasMatchingBackLink(ref: Entry): boolean {
    return this.nonRefs.some(
      (entry) => entry.basename === ref.referTo && entry.backLink.includes(ref.basename),
    );
  }

  private getMissingReferences(entry: Entry): string[] {
    return entry.backLink.filter((source) => {
      return !this.refs.some(
        (ref) => ref.basename === source && ref.referTo === entry.basename,
      );
    });
  }
}
