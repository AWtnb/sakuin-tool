
////////////////////////////////////////////////
// 汎用関数
////////////////////////////////////////////////

function copyTable(elementId) {
    const range = document.createRange();
    const result = document.getElementById(elementId);
    range.selectNodeContents(result);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
    alert("コピーしました！");
}

function resetTable() {}

////////////////////////////////////////////////
// 読み取得
////////////////////////////////////////////////

function setYomi(outputArea, inputLines){
    outputArea.value = "（\u{1f914}よみがな計算中…）";
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

function clickBtn_yomi() {
    const lines = document.form_toYomi.textarea1.value;
    const outputArea = document.form_toYomi.textarea2;
    setYomi(outputArea, lines);
}
function clickBtn_yomi_copy() {
    document.form_toYomi.textarea2.select()
    document.execCommand("Copy");
    alert("コピーしました！");
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

function clickBtn_katahira() {
    const lines_toConvert = document.form_toConvert.textarea1.value;
    let mode = document.querySelector("#inputarea_forKatahira > .form_katahiraFlag").radio1.value;
    let msg = kata2hira(lines_toConvert);
    if (mode == "toKata") {
        msg = hira2kata(lines_toConvert);
    }
    document.querySelector("#inputarea_forKatahira .output").value = msg;
}
function clickBtn_katahira_copy() {
    document.querySelector("#inputarea_forKatahira .output").select();
    document.execCommand("Copy");
    alert("コピーしました！");
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

function clickBtn_hairetsu() {
    const lines_toHairetsu = document.form_toHairetsu.textarea1.value;
    const removeFlag = document.form_removeFlag.removeFlag;
    let converted = [];
    if (removeFlag.checked) {
        converted = toHairetsu(lines_toHairetsu, true);
    }
    else {
        converted = toHairetsu(lines_toHairetsu, false);
    }
    const msg = converted.join("\n");
    document.form_toHairetsu.textarea2.value = msg;
}
function clickBtn_hairetsu_copy() {
    document.form_toHairetsu.textarea2.select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 名寄せ
////////////////////////////////////////////////

function nayose (lines) {
    let table = {};
    let lineArray = lines.split(/[\r\n]+/g);
    // 集約
    lineArray.forEach(item => {
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

function clickBtn_nayose() {
    const lines_toNayose = document.form_toNayose.textarea1.value;
    const nys = nayose(lines_toNayose);
    const msg = nys.join("\n");
    document.form_toNayose.textarea2.value = msg;
}
function clickBtn_nayose_copy() {
    document.form_toNayose.textarea2.select();
    document.execCommand("Copy");
    alert("コピーしました！");
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

function clickBtn_release() {
    let delimiter = "\t"
    const delimRadioBtn = document.form_delimiter.delim1;
    for (let i = 0; i < delimRadioBtn.length; i++){
        if(delimRadioBtn[i].checked){
            delimiter = delimRadioBtn[i].value;
            break;
        }
    }

    let nombreConnector = "，"
    const commaRadioBtn = document.form_nombreConnector.connect1;
    for (let j = 0; j < commaRadioBtn.length; j++){
        if(commaRadioBtn[j].checked){
            nombreConnector = commaRadioBtn[j].value;
            break;
        }
    }
    const linesToRelease = document.form_toRelease.textarea1.value;
    const releasedObj = releaseNayoseLines(linesToRelease, nombreConnector, delimiter);

    const resultTable = document.getElementById("releaseTable");
    const maxRow = resultTable.rows.length;
    if (maxRow > 1) {
        for (let r = maxRow - 1; r >= 1; r--) {
            resultTable.deleteRow(r);
        }
    }
    for (let item in releasedObj) {
        let row = resultTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = releasedObj[item].name;
        cell2.innerHTML = releasedObj[item].nombre;
    }
}
function clickBtn_release_copy() {
    copyTable("releaseTable");
}


////////////////////////////////////////////////
// 子項目復活
////////////////////////////////////////////////

function completeChildItem (multiLines, delimiter) {
    const lines = multiLines.split(/[\r\n]+/g).filter(line => line.match(/./g));
    const regAfterDelim = new RegExp(`${delimiter}.+$`, "g");
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

function clickBtn_complete() {
    let delimiter = document.querySelector("#form_delim_toComplete").radio1.value;
    const lines_toComplete = document.form_toComplete.textarea1.value;
    const completedArray = completeChildItem(lines_toComplete, delimiter);
    document.form_toComplete.textarea2.value = completedArray.join("\n");
}
function clickBtn_complete_copy() {
    document.form_toComplete.textarea2.select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 索引テンプレート生成
////////////////////////////////////////////////

function toHankaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

function generateTemplare(multiLines) {
    const lines = multiLines.split(/[\r\n]+/g).filter(line => line.match(/./g));
    const templateArray = [];
    lines.forEach(line => {
        let pair = line.split("\t");
        let page = pair[0];
        let nItem = toHankaku(pair[1]);
        if (String(nItem) != "0" && nItem.match(/^\d+$/)) {
            for (let i = 0; i < Number(nItem); i++) {
                templateArray.push(page);
            }
        }
    });
    return templateArray
}

function clickBtn_generate() {
    const linestoGenerate = document.querySelector("#inputarea_toGenerate .input").value;
    const templateArray = generateTemplare(linestoGenerate);

    const resultTable = document.getElementById("templateTable");
    const maxRow = resultTable.rows.length;
    if (maxRow > 1) {
        for (let r = maxRow - 1; r >= 1; r--) {
            resultTable.deleteRow(r);
        }
    }
    templateArray.forEach(line => {
        let row = resultTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = line;
        cell2.innerHTML = "";
    });
}
function clickBtn_generate_copy() {
    copyTable("templateTable");
}