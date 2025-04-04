const getAddress = (s) => {
  const m = String(s).match(/\u3000\u3000\d/);
  if (m) {
    return s.replace(/^.+\u3000(?=\d)/, "");
  }
  return "";
};

const getName = (s) => {
  const m = String(s).match(/\u3000\u3000\d/);
  if (m) {
    return s.replace(/\u3000\u3000\d.*/, "");
  }
  return "";
};

const POSSIBLE_BARS = ["\u2010", "\u2011", "\u2012", "\u2013", "\u2014", "\u2015", "\uFF0D", "\u2500", "\u002d"];

class BarHandler {
  constructor(s) {
    this.rawStr = s;
  }
  getHeaderLen() {
    let len = 0;
    for (let i = 0; i < this.rawStr.length; i++) {
      if (POSSIBLE_BARS.includes(this.rawStr[i])) {
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
      if (POSSIBLE_BARS.includes(this.rawStr[i])) {
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
    const baseLine = removeNoisySpaces(s);

    let a = getAddress(baseLine);
    if (0 < a.length) {
      POSSIBLE_BARS.forEach((b) => {
        a = a.replaceAll(b, "\u002d");
      });
      a = a.replace(/\u002d+/g, "\u2013");
      a = a
        .replaceAll(",", ", ")
        .replace(/, {2,}/g, ", ")
        .trimEnd();
      this.address = a;
      this.name = getName(baseLine);
      this.separator = "\u3000".repeat(2);
      return;
    }

    const i = baseLine.lastIndexOf("→");
    if (i != -1) {
      this.name = baseLine.substring(0, i).trim();
      this.separator = "\u3000→";
      this.address = baseLine.substring(i + 1).trim();
      return;
    }

    this.address = "";
    this.separator = "";
    this.name = baseLine;
  }

  getFormattedLine() {
    return this.prefix + new BarHandler(this.name).formatChildEntry() + this.separator + this.address;
  }
}
