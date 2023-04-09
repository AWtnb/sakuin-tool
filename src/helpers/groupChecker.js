import { arrayOfLines } from "@/helpers/utils.js";
import { Entry } from "@/helpers/entry";

export class GroupChecker {
  constructor(s) {
    const lines = arrayOfLines(s);
    this.entries = lines.filter((x) => String(x).trim()).map((line) => new Entry(line));
    this.refs = this.entries.filter((entry) => entry.isReference);
    this.nonRefs = this.entries.filter((entry) => !entry.isReference);
    this.mainEntries = this.nonRefs.filter((entry) => !entry.isChild);
  }

  /**
   * basename が同じものが2つ以上ないか（括弧の有無だけで別項目扱いになっていないか）探す
   * @returns Array
   */
  getUngrouped() {
    const stack = [];
    this.mainEntries.forEach((entry) => {
      const target = entry.basename;
      const grep = this.mainEntries.filter((ent) => ent.basename == target).map((ent) => ent.rawStr);
      if (grep.length == 1) {
        return;
      }
      stack.push(grep);
    });
    const uniq = stack.filter((elem, idx, self) => {
      return idx === self.findIndex((x) => x.join("") === elem.join(""));
    });
    return uniq;
  }

  /**
   * 本項目として残っている見よ項目を探す
   * @returns Array
   */
  getConflicting() {
    return this.refs
      .map((entry) => {
        const target = entry.basename;
        const grep = this.mainEntries.filter((e) => e.basename == target);
        if (grep.length < 1) {
          return null;
        }
        return [entry.name].concat(grep.map((e) => e.rawStr));
      })
      .filter(Boolean);
  }
}
