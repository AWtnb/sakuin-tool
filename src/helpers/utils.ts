export const toHalfWidth = (str: string): string => {
  return str.replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
};

export const toKatakana = (str: string): string => {
  return str.replace(/[\u3041-\u3096]/g, (match) => {
    const chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
};

export const toHiragana = (str: string): string => {
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
};

const convertMap = new Map<string, string>();
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
].forEach(([source, replacement]) => convertMap.set(source, replacement));

export const normalizeReading = (s: string, removeNoise = false): string => {
  let katakana = toHalfWidth(toKatakana(s));
  for (const [source, replacement] of convertMap) {
    katakana = katakana.replaceAll(source, replacement);
  }
  if (removeNoise) {
    return katakana.replace(/[^ァ-ヴa-zA-Z\uff41-\uff5a\uff21-\uff3a0-9\uff10-\uff19\r\n]/g, "");
  }
  return katakana;
};

export const arrayOfLines = (str: string): string[] => {
  if (str.length < 1) {
    return [];
  }
  return str.split(/\n/).map((line) => String(line));
}