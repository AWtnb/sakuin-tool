function toHairetsu (lines, removeNoise) {
    const map = new Map();
    [
        ["ァ", "ア"], ["ィ", "イ"], ["ゥ", "ウ"], ["ェ", "エ"],["ォ", "オ"], ["ヴ", "ウ"],
        ["ガ", "カ"], ["ギ", "キ"], ["グ", "ク"], ["ゲ", "ケ"],["ゴ", "コ"],
        ["ザ", "サ"], ["ジ", "シ"], ["ズ", "ス"], ["ゼ", "セ"],["ゾ", "ソ"],
        ["ダ", "タ"], ["ヂ", "チ"], ["ヅ", "ツ"], ["ッ", "ツ"],["デ", "テ"], ["ド", "ト"],
        ["バ", "ハ"], ["ビ", "ヒ"], ["ブ", "フ"], ["ベ", "ヘ"],["ボ", "ホ"],
        ["パ", "ハ"], ["ピ", "ヒ"], ["プ", "フ"], ["ペ", "ヘ"],["ポ", "ホ"],
        ["ャ", "ヤ"], ["ュ", "ユ"], ["ョ", "ヨ"],
        ["ー", ""]
    ].forEach(x => map.set(...x));

    let katakana = toHankaku(hira2kata(lines));
    for (let k of map.keys()) {
        const reg = new RegExp(k, "g");
        katakana = katakana.replace(reg, map.get(k));
    }
    return (removeNoise)? katakana.replace(/[^ァ-ヴa-zA-Zａ-ｚＡ-Ｚ0-9０-９\r\n]/g, "") : katakana;
}