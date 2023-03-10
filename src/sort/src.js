import {Util} from "../../assets/utils.js";

const convertMap = new Map();
[
    ["ァ", "ア"], ["ィ", "イ"], ["ゥ", "ウ"], ["ェ", "エ"],["ォ", "オ"], ["ヴ", "ウ"],
    ["ガ", "カ"], ["ギ", "キ"], ["グ", "ク"], ["ゲ", "ケ"],["ゴ", "コ"],
    ["ザ", "サ"], ["ジ", "シ"], ["ズ", "ス"], ["ゼ", "セ"],["ゾ", "ソ"],
    ["ダ", "タ"], ["ヂ", "チ"], ["ヅ", "ツ"], ["ッ", "ツ"],["デ", "テ"], ["ド", "ト"],
    ["バ", "ハ"], ["ビ", "ヒ"], ["ブ", "フ"], ["ベ", "ヘ"],["ボ", "ホ"],
    ["パ", "ハ"], ["ピ", "ヒ"], ["プ", "フ"], ["ペ", "ヘ"],["ポ", "ホ"],
    ["ャ", "ヤ"], ["ュ", "ユ"], ["ョ", "ヨ"],
    ["ー", ""]
].forEach(x => convertMap.set(...x));
function normalize(s, removeNoise) {
    let katakana = Util.toHalfWidth(Util.toKatakana(s));
    for (let k of convertMap.keys()) {
        katakana = katakana.replaceAll(k, convertMap.get(k));
    }
    if (removeNoise) {
        return katakana.replace(/[^ァ-ヴa-zA-Z\uff41-\uff5a\uff21-\uff3a0-9\uff10-\uff19\r\n]/g, "");
    }
    return katakana;
}

const comparer = (a, b) => {
    const aLower = String(a).toLowerCase();
    const bLower = String(b).toLowerCase();
    if (aLower > bLower) return 1;
    if (aLower < bLower) return -1;
    return 0;
}

export class Sorter {

    constructor() {
        this.parsedLines = [];
    }

    addData(item, reading) {
        this.parsedLines.push({
            "item": item,
            "reading": reading,
            "normalized": normalize(reading, true)
         });
    }

    execute() {
        return this.parsedLines.sort((a,b) => {
            return comparer(a.item, b.item);
        }).sort((a,b) => {
            return comparer(a.reading, b.reading);
        }).sort((a,b) => {
            return comparer(a.normalized, b.normalized);
        });
    }

    static normalize(s, removeNoise) {
        return normalize(s, removeNoise);
    }

}
