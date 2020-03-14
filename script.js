////////////////////////////////////////////////
// 読み取得
////////////////////////////////////////////////

function setYomi(inputLines){
    const outputArea = document.form_toYomi.textarea2;
    outputArea.value = "（🤔よみがな計算中…）";
    const promise = new Promise((resolve, reject) => {
        kuromoji.builder({ dicPath: "./dict" }).build(function(err, _tokenizer){
            if (err) {
                reject("failed to build tokenizer...");
            }
            else {
                resolve(_tokenizer);
            }
        });
    });
    promise.then((tokenizer) => {
        let yomiArray = inputLines.split(/\n/).map(line => {
            let parsed = tokenizer.tokenize(line);
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
            console.log("----------");
            return yomi.join("");
        });
        outputArea.value = yomiArray.join("\n")
    })
    .catch((e) => {
        outputArea.value = "解析失敗…\nやり直してみてください！";
        console.log(e);
    });
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
                table[pair[0]] = (table[pair[0]] + ", " + pair[1]);
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

////////////////////////////////////////////////
// 名開き
////////////////////////////////////////////////

function releaseNayoseLines (multiLines, nombreConnector, delimiter) {
    const regConnector = new RegExp(nombreConnector);
    const regDelimiter = new RegExp(delimiter);
    const releasedObj = [];
    const lines = multiLines.split(/[\r\n]+/g);
    lines.filter(line => line.match(/./g)).forEach(line => {
        if (! line.match(regDelimiter)) {
            releasedObj.push({name: line, nombre: ""});
            return
        }
        let pair = line.split(regDelimiter);
        let name = String(pair[0]);
        let nombre = String(pair[1]);
        if (nombre.match(regConnector)) {
            nombre = nombre.replace(/\s/g, "");
            let nombreArray = nombre.split(regConnector);
            nombreArray.forEach(n => {
                releasedObj.push({name: name, nombre: n});
            });
        }
        else {
            if (typeof nombre === 'undefined') {
                releasedObj.push({name: name, nombre: ""});
            }
            else {
                releasedObj.push({name: name, nombre: nombre});
            }
        }
    });
    return releasedObj
}


////////////////////////////////////////////////
// 子項目復活
////////////////////////////////////////////////

function completeChildItem (multiLines, delimiter) {
    const lines = multiLines.split(/[\r\n]+/g).filter(line => line.match(/./g));
    const regAfterDelim = new RegExp("(" + delimiter + ").+", "g");
    const regFiller = new RegExp("(\u2500|\u2015|\u2500)+");
    const completedArray = [];
    completedArray.push(lines[0]);
    let lastParentItem = lines[0].replace(regAfterDelim, "");
    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i];
        if (currentLine.match(regFiller)) {
            let completedItem = currentLine.replace(/^\s+/, "").replace(regFiller, lastParentItem);
            completedArray.push(completedItem);
        }
        else {
            completedArray.push(currentLine);
            lastParentItem = currentLine.replace(regAfterDelim, "");
        }
    }
    return completedArray
}