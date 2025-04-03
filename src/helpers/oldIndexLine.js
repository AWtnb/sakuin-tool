const toAddressOnly = (s) => {
  const m = String(s).match(/\u3000\u3000\d/);
  if (m) {
    return s.replace(/^.+\u3000(?=\d)/, "");
  }
  return "";
};

const BARS = ["\u2010", "\u2011", "\u2012", "\u2013", "\u2014", "\u2015", "\uFF0D", "\u2500", "\u002d"];

const toNameOnly = (s) => {
  const m = String(s).match(/\u3000\u3000\d/);
  if (m) {
    return s.replace(/\u3000\u3000\d.*/, "");
  }
  return "";
};

class BarHandler {
  constructor(s) {
    this.valiation = BARS;
    this.rawStr = s;
  }
  format(to = "\u2013") {
    let fmt = this.rawStr;
    this.valiation.forEach((b) => {
      fmt = fmt.replaceAll(b, "\u002d");
    });
    return fmt.replace(/\u002d+/g, to);
  }
  getHeaderLen() {
    let len = 0;
    for (let i = 0; i < this.rawStr.length; i++) {
      if (this.valiation.includes(this.rawStr[i])) {
        len += 1;
      } else {
        break;
      }
    }
    return len;
  }
  getTrailerLen() {
    let len = 0;
    for (let i = this.rawStr.length - 1; 0 <= i; i--) {
      if (this.valiation.includes(this.rawStr[i])) {
        len += 1;
      } else {
        break;
      }
    }
    return len;
  }
  formatChildEntry() {
    const hLen = this.getHeaderLen();
    const prefix = hLen > 0 ? "\u2015\u2015" : "";
    const tLen = this.getTrailerLen();
    const suffix = tLen > 0 ? "\u2015\u2015" : "";
    return prefix + this.rawStr.slice(hLen, this.rawStr.length - tLen) + suffix;
  }
}

/*

- `\u3001-\u30ff\u4e00-\u9fff\uff01-\uff5e`
  - \u3001-\u30ff：日本語約物・ひらがな・カタカナ
  - \u4e00-\u9fff：CJK統合漢字（ここに含まれない漢字は見逃してしまう可能性あり）
  - \uff01-\uff5e：全角約物・全角英数
- `(?<=[a-zA-Z0-9]) +(?![\u0021-\u007e])`
  - 英数と非ASCII文字の間の半角空白
  - `(?<![\u0021-\u007e]) +(?=[a-zA-Z0-9])`
  - 非ASCII文字と英数の間の半角空白

*/
const removeNoisySpaces = (s) => {
  return s
    .trim()
    .replace(/(?<=[\u3001-\u30ff\u4e00-\u9fff\uff01-\uff5e]) +(?=[\u3001-\u30ff\u4e00-\u9fff\uff01-\uff5e])/g, "")
    .replace(/(?<=[a-zA-Z0-9]) +(?![\u0021-\u007e])/g, "")
    .replace(/(?<![\u0021-\u007e]) +(?=[a-zA-Z0-9])/g, "");
};

export class OldIndexLine {
  constructor(s) {
    this.prefix = s.startsWith(" ") || s.startsWith("\u3000") ? "\u3000" : "";
    const pureStr = removeNoisySpaces(String(s).replace(/\uff0c/g, ","));
    const adr = toAddressOnly(new BarHandler(pureStr).format());
    if (adr.length > 0) {
      this.address = adr.replaceAll(",", ", ").replace(/, {2,}/g, ", ");
      this.name = toNameOnly(pureStr);
      return;
    }

    this.address = "";
    this.name = pureStr.replace(/(?<!\u3000)→/g, "\u3000→");
  }

  getFormattedLine() {
    const name = this.prefix + new BarHandler(this.name).formatChildEntry();
    if (this.address.length > 0) {
      return name + "\u3000\u3000" + this.address;
    }
    return name;
  }
}
