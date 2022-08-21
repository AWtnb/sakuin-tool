import {Util, Entry} from "../../assets/common.js";

function normalize(s, removeNoise) {
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

    let katakana = Util.toHalfWidth(Util.toKatakana(s));
    for (let k of map.keys()) {
        const reg = new RegExp(k, "g");
        katakana = katakana.replace(reg, map.get(k));
    }
    return (removeNoise)? katakana.replace(/[^ァ-ヴa-zA-Z\uff41-\uff5a\uff21-\uff3a0-9\uff10-\uff19\r\n]/g, "") : katakana;

}

function getReading(tokens) {
    return tokens.reduce((accum, token) => {
        console.log(token.surface_form, token.word_type, token.pos, token.reading);
        const surface = token.surface_form;
        if (surface.replace(/[a-zA-Zァ-ヴー・]/g, "").length < 1) {
            return accum + surface;
        }
        if (token.pos == "記号") {
            return accum + surface;
        }
        if (token.word_type != "KNOWN") {
            return accum + token.surface_form;
        }
        return accum + token.reading;
    }, "");
}

export class Reading {
    constructor(tokenizer, removeNoise=true) {
        this.tokenizer = tokenizer;
        this.removeNoise = removeNoise;
    }
    parseLines(lines) {
        return lines.map(line => {
            const target = new Entry(line).basename;
            const tokens = this.tokenizer.tokenize(target);
            const r = getReading(tokens);
            return {
                "item": line,
                "reading": r,
                "normalized": normalize(r, this.removeNoise)
            }
        });
    }
    static normalize(s, removeNoise=true) {
        return normalize(s, removeNoise);
    }
}