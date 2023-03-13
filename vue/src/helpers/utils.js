export class Util {
  static toHalfWidth(str) {
    return str.replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  }

  static toKatakana(str) {
    return str.replace(/[\u3041-\u3096]/g, function (match) {
      const chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
    });
  }

  static toHiragana(str) {
    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
      const chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  }
}

const convertMap = new Map();
[
  ["ァ", "ア"],
  ["ィ", "イ"],
  ["ゥ", "ウ"],
  ["ェ", "エ"],
  ["ォ", "オ"],
  ["ヴ", "ウ"],
  ["ガ", "カ"],
  ["ギ", "キ"],
  ["グ", "ク"],
  ["ゲ", "ケ"],
  ["ゴ", "コ"],
  ["ザ", "サ"],
  ["ジ", "シ"],
  ["ズ", "ス"],
  ["ゼ", "セ"],
  ["ゾ", "ソ"],
  ["ダ", "タ"],
  ["ヂ", "チ"],
  ["ヅ", "ツ"],
  ["ッ", "ツ"],
  ["デ", "テ"],
  ["ド", "ト"],
  ["バ", "ハ"],
  ["ビ", "ヒ"],
  ["ブ", "フ"],
  ["ベ", "ヘ"],
  ["ボ", "ホ"],
  ["パ", "ハ"],
  ["ピ", "ヒ"],
  ["プ", "フ"],
  ["ペ", "ヘ"],
  ["ポ", "ホ"],
  ["ャ", "ヤ"],
  ["ュ", "ユ"],
  ["ョ", "ヨ"],
  ["ー", ""],
].forEach((x) => convertMap.set(...x));

export const normalizeReading = (s, removeNoise) => {
  let katakana = Util.toHalfWidth(Util.toKatakana(s));
  for (let k of convertMap.keys()) {
    katakana = katakana.replaceAll(k, convertMap.get(k));
  }
  if (removeNoise) {
    return katakana.replace(/[^ァ-ヴa-zA-Z\uff41-\uff5a\uff21-\uff3a0-9\uff10-\uff19\r\n]/g, "");
  }
  return katakana;
};
