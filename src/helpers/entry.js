class EntryName {
  constructor(s) {
    this.reg = new RegExp("(\uff08.+?\uff09|\uff3b.+?\uff3d|\\(.+?\\)|\\[.+?\\])$");
    this.name = s;
  }

  getBasename() {
    return this.name
      .replace(this.reg, "")
      .trim()
      .replace(/\u3000{1,2}/, "");
  }

  getRefBasename() {
    return this.name.split("→")[0].trim();
  }

  getSource() {
    const m = this.name.match(this.reg);
    if (m) {
      const inner = m[0].slice(1, -1).trim();
      return inner
        .replace(/\uff0c/g, ",")
        .split(",")
        .map((x) => String(x).trim())
        .filter(Boolean);
    }
    return [];
  }

  getReferTo() {
    const refElems = this.name
      .split("→")
      .map((x) => String(x).trim())
      .filter(Boolean);
    if (refElems.length == 2) {
      return refElems.at(-1);
    }
    return "";
  }
}

/**
 * Entry of book index
 * @class
 */
export class Entry {
  /**
   * constructor
   * @param {String} s 対象の文字列
   * @param {String} separator 項目名とノンブル間の区切り文字
   */
  constructor(s, separator = "\u3000\u3000") {
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
    this.name = "";

    /**
     * 項目名から括弧を除いた部分（見よ項目の場合は「見よ元」部分）。項目の文字間はアキツメル。
     * @type {String}
     */
    this.basename = "";

    /**
     * ノンブルの集合部分
     * @type {String}
     */
    this.address = "";

    /**
     * カッコ内に付記された「見よ元」情報
     * @type {String[]}
     */
    this.referredFrom = [];

    /**
     * 見よ先
     * @type {String}
     */
    this.referTo = "";

    /**
     * 見よ項目かどうか
     * @type {Boolean}
     */
    this.isReference = false;

    this.parse();
  }

  /**
   * 初期値を設定する
   */
  parse() {
    if (this.elems.length >= 2) {
      const sides = (() => {
        if (this.elems.length > 2) {
          return {
            left: this.elems.slice(0, -1).join(this.separator),
            right: this.elems.at(-1),
          };
        }
        return {
          left: this.elems[0],
          right: this.elems[1],
        };
      })();
      this.name = (this.isChild ? "\u3000" : "") + sides.left.trim();
      this.address = sides.right.trim();
      const nm = new EntryName(this.name);
      this.basename = nm.getBasename();
      this.referredFrom = nm.getSource();
      return;
    }

    if (this.elems.length < 1) {
      return;
    }

    const s = this.elems[0];
    if (s.trim().length < 1) {
      return;
    }
    this.name = (this.isChild ? "\u3000" : "") + s.trim();

    const nm = new EntryName(this.name);
    this.referTo = nm.getReferTo();
    this.isReference = this.referTo.length > 0;
    this.basename = nm.getRefBasename();
    this.referredFrom = nm.getSource();
  }
}
