class EntryName {
  private readonly reg: RegExp;
  private readonly name: string;

  constructor(s: string) {
    this.reg = new RegExp(
      "(\uff08.+?\uff09|\uff3b.+?\uff3d|\\(.+?\\)|\\[.+?\\])$",
    );
    this.name = s;
  }

  getBasename(): string {
    const t = this.name.replace(this.reg, "").trim();
    if (this.getReferTo().length) {
      return (
        t
          .split("→")[0]
          ?.trim()
          .replace(/\u3000{1,2}/, "") ?? ""
      );
    }
    return t.replace(/\u3000{1,2}/, "");
  }

  getRefBasename(): string {
    return this.name.split("→")[0].trim();
  }

  getSource(): string[] {
    const m = this.name.match(this.reg);
    if (m) {
      const inner = m[0].slice(1, -1).trim();
      return inner
        .replace(/[\uff0c\uff1b\u003b]/g, ",")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
    }
    return [];
  }

  getReferTo(): string {
    const refElems = this.name.split("→").filter((x) => x.trim().length > 0);
    if (refElems.length == 2) {
      return refElems.at(-1)?.trim() ?? "";
    }
    return "";
  }
}

/**
 * Entry of book index
 * @class
 */
export class Entry {
  readonly rawStr: string;
  readonly isChild: boolean;
  readonly separator: string;
  readonly elems: string[];
  readonly name: string;
  readonly basename: string;
  readonly address: string;
  readonly getFullname: string;
  readonly backLink: string[];
  readonly referTo: string;
  readonly isReference: boolean;

  /**
   * constructor
   * @param {String} s 対象の文字列
   * @param {String} separator 項目名とノンブル間の区切り文字
   */
  constructor(s: string, separator: string = "\u3000\u3000") {
    /**
     * 元の文字列
     * @type {String} rawStr
     */
    this.rawStr = s;

    /**
     * 子項目かどうか
     * @type {Boolean}
     */
    this.isChild = s.trim().length > 0 && s.trimStart() != s;

    /**
     * 項目名とノンブル間の区切り文字
     * @type {String}
     */
    this.separator = separator;

    /**
     * separator で区切った各要素
     * @type {string[]}
     */
    this.elems = this.rawStr
      .split(this.separator)
      .filter(Boolean)
      .map((x) => String(x));

    /**
     * 項目名
     * @type {String}
     */
    this.name = this.getName();

    const entryName = new EntryName(this.name);

    /**
     * 項目名から括弧を除いた部分。
     * - 項目の文字間および前後の空白は削除。
     * - 子項目の場合はインデントの空白文字を除いた部分。
     * - 見よ項目の場合は「見よ元」部分。
     * @type {String}
     */
    this.basename = entryName.getBasename();

    /**
     * ノンブルの集合部分
     * @type {String}
     */
    this.address = this.getRightSide().trim();

    /**
     * 最終的な全体の文字列
     * @type {String}
     */
    this.getFullname = this.name + this.separator + this.address;

    /**
     * カッコ内に付記された「見よ元」情報
     * @type {String[]}
     */
    this.backLink = entryName.getSource();

    /**
     * 見よ先
     * @type {String}
     */
    this.referTo = entryName.getReferTo();

    /**
     * 見よ項目かどうか
     * @type {Boolean}
     */
    this.isReference =
      0 < this.referTo.length &&
      0 < this.name.length &&
      this.address.length < 1;
  }

  /**
   * 入力文字列を separator で分割した「左側」を返す。
   * @returns String
   */
  getLeftSide(): string {
    if (this.elems.length >= 2) {
      if (this.elems.length > 2) {
        return this.elems.slice(0, -1).join(this.separator);
      }
      return this.elems[0] ?? "";
    }
    if (this.elems.length == 1) {
      return this.elems[0] ?? "";
    }
    return "";
  }

  getName(): string {
    const t = this.getLeftSide().trim();
    if (t.length < 1) {
      return "";
    }
    return (this.isChild ? "\u3000" : "") + t;
  }

  /**
   * 入力文字列を separator で分割した「右側」を返す。
   * @returns String
   */
  getRightSide(): string {
    if (this.elems.length >= 2) {
      if (this.elems.length > 2) {
        return this.elems.at(-1) ?? "";
      }
      return this.elems[1] ?? "";
    }
    return "";
  }
}
