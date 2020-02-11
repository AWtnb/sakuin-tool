////////////////////////////////////////////////
// 読み取得
////////////////////////////////////////////////
// kuromoji.js
let GROBAL_TOKENIZER = null
kuromoji.builder({ dicPath: "./dict" }).build(function(err, _tokenizer){
    if(!err){
        GROBAL_TOKENIZER = _tokenizer;
    }
});

function getYomi(inputLines){
    if (! GROBAL_TOKENIZER) {
        console.log("failed to load tokenizer...");
        return "取得できませんでした…\nもう一度やり直すか画面を更新してみてください！"
    }
    let yomiArray = inputLines.split(/\n/).map(line => {
        let parsed = GROBAL_TOKENIZER.tokenize(line);
        let yomi = parsed.map(token => {
            console.log(token.surface_form, token.word_type, token.pos, token.reading);
            let surface = token.surface_form;
            if (surface.match(/([a-zA-Z]|[ァ-ヴー・])+/g)) {
                return surface;
            }
            if (token.pos == "記号") {
                return "";
            }
            if (token.word_type != "KNOWN") {
                return token.surface_form;
            }
            return token.reading;
        });
        return yomi.join("")
    });
    return yomiArray.join("\n")
}

////////////////////////////////////////////////
// カタカナひらがな相互変換
////////////////////////////////////////////////
function hira2kata(str){
    return str.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
}

function kata2hira(str){
    return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

////////////////////////////////////////////////
// 配列読み
////////////////////////////////////////////////
function toHairetsu (str, removeNoise) {
    let table = [];
    table["ァ"]="ア";table["ィ"]="イ";table["ゥ"]="ウ";table["ェ"]="エ";table["ォ"]="オ";table["ヴ"]="ウ";
    table["ガ"]="カ";table["ギ"]="キ";table["グ"]="ク";table["ゲ"]="ケ";table["ゴ"]="コ";
    table["ザ"]="サ";table["ジ"]="シ";table["ズ"]="ス";table["ゼ"]="セ";table["ゾ"]="ソ";
    table["ダ"]="タ";table["ヂ"]="チ";table["ヅ"]="ツ";table["ッ"]="ツ";table["デ"]="テ";table["ド"]="ト";
    table["バ"]="ハ";table["ビ"]="ヒ";table["ブ"]="フ";table["ベ"]="ヘ";table["ボ"]="ホ";table["パ"]="ハ";table["ピ"]="ヒ";table["プ"]="フ";table["ペ"]="ヘ";table["ポ"]="ホ";
    table["ャ"]="ヤ";table["ュ"]="ユ";table["ョ"]="ヨ";
    table["ー"]="";
    let lines = str.split(/[\r\n]/g); // windows
    let ret = [];
    lines.forEach (line => {
        if (!line) {
            ret.push("")
            return;
        }
        let ktkn = hira2kata(line);
        for (let t in table) {
            let reg = new RegExp(t, "g")
            ktkn = ktkn.replace(reg, table[t]);
        }
        if (removeNoise == true) {
            ktkn = ktkn.replace(/[^ァ-ヴa-zA-Z0-9０-９]/g, "");
        }
        ret.push(ktkn);
    });
    return ret;
}

////////////////////////////////////////////////
// 名寄せ
////////////////////////////////////////////////
function nayose (str) {
    let table = {};
    let lines = str.split(/[\r\n]+/g);
    // 集約
    lines.forEach(item => {
        if (item && item.replace(/\s/g, "")) {
            let pair = item.split("\t");
            if (pair[0] in table) {
                table[pair[0]] = (table[pair[0]] + "，" + pair[1]);
            }
            else {
                table[pair[0]] = pair[1];
            }
        }
    });

    // 整形
    let ret = [];
    for (let n in table) {
        if (typeof (table[n]) === "undefined") {
            ret.push(n);
        }
        else {
            let line = n + "　　" + table[n]
            ret.push(line);
        }
    }
    return ret;
}