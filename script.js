
////////////////////////////////////////////////
// 汎用関数
////////////////////////////////////////////////

function toHankaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

function copyTable(tableElem) {
    const range = document.createRange();
    range.selectNodeContents(tableElem);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("Copy");
    alert("コピーしました！");
}

function resetTable(tableElem) {
    const maxRow = tableElem.rows.length;
    if (maxRow > 1) {
        for (let r = maxRow - 1; r >= 1; r--) {
            tableElem.deleteRow(r);
        }
    }
}

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
        const yomiArray = inputLines.split(/\n/).map(line => {
            const parsed = tokenizer.tokenize(line);
            const yomi = parsed.map(token => {
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
    const lines = document.querySelector("#inputarea_forYomi form.yomi .input").value;
    const outputArea = document.querySelector("#inputarea_forYomi form.yomi .output");
    setYomi(outputArea, lines);
}
function clickBtn_yomi_copy() {
    document.querySelector("#inputarea_forYomi form.yomi .output").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// カタカナひらがな相互変換
////////////////////////////////////////////////

function hira2kata(str){
    return str.replace(/[\u3041-\u3096]/g, function(match) {
        const chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
}

function kata2hira(str){
    return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        const chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

function convertHiraKata(str, mode){
    if (mode == "toKata") {
        return hira2kata(str)
    }
    return kata2hira(str)
}

function clickBtn_katahira() {
    const lines_toConvert = document.querySelector("#inputarea_forKatahira form.convert .input").value;
    const mode = document.querySelector("#inputarea_forKatahira form.katahiraFlag").radio1.value;
    const converted = convertHiraKata(lines_toConvert, mode);
    document.querySelector("#inputarea_forKatahira form.convert .output").value = converted;
}
function clickBtn_katahira_copy() {
    document.querySelector("#inputarea_forKatahira form.convert .output").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 配列読み
////////////////////////////////////////////////

function toHairetsu (str, removeNoise) {
    const table = [];
    table["ァ"]="ア";table["ィ"]="イ";table["ゥ"]="ウ";table["ェ"]="エ";table["ォ"]="オ";table["ヴ"]="ウ";
    table["ガ"]="カ";table["ギ"]="キ";table["グ"]="ク";table["ゲ"]="ケ";table["ゴ"]="コ";
    table["ザ"]="サ";table["ジ"]="シ";table["ズ"]="ス";table["ゼ"]="セ";table["ゾ"]="ソ";
    table["ダ"]="タ";table["ヂ"]="チ";table["ヅ"]="ツ";table["ッ"]="ツ";table["デ"]="テ";table["ド"]="ト";
    table["バ"]="ハ";table["ビ"]="ヒ";table["ブ"]="フ";table["ベ"]="ヘ";table["ボ"]="ホ";table["パ"]="ハ";table["ピ"]="ヒ";table["プ"]="フ";table["ペ"]="ヘ";table["ポ"]="ホ";
    table["ャ"]="ヤ";table["ュ"]="ユ";table["ョ"]="ヨ";
    table["ー"]="";
    const lines = str.split(/\r?\n/g);
    const ret = lines.map (line => {
        if (!line) {
            return "";
        }
        let katakana = hira2kata(line);
        for (let t in table) {
            let reg = new RegExp(t, "g");
            katakana = katakana.replace(reg, table[t]);
        }
        if (removeNoise) {
            katakana = katakana.replace(/[^ァ-ヴa-zA-Z0-9０-９]/g, "");
        }
        return katakana;
    });
    return ret;
}

function clickBtn_hairetsu() {
    const lines_toHairetsu = document.querySelector("#inputarea_forHairetsu form.hairetsu .input").value;
    const removeFlag = document.querySelector("#inputarea_forHairetsu form.removeFlag .removeFlag");

    const converted = toHairetsu(lines_toHairetsu, removeFlag.checked);
    const msg = converted.join("\n");
    document.querySelector("#inputarea_forHairetsu form.hairetsu .output").value = msg;
}
function clickBtn_hairetsu_copy() {
    document.querySelector("#inputarea_forHairetsu form.hairetsu .output").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 名寄せ
////////////////////////////////////////////////

function nayose (lines) {
    const map = new Map()
    const lineArray = lines.split(/[\r\n]+/g);
    // 集約
    lineArray
        .filter(line => line)
        .filter(line => !line.match(/^\s+$/))
        .forEach(item => {
            const [itemName, nombre, ...rest] = item.split("\t");
            if (map.has(itemName)) {
                const currentValue = map.get(itemName);
                if (currentValue == "") {
                    map.set(itemName, String(nombre));
                }
                else if (nombre != "") {
                    map.set(itemName, currentValue + ", " + String(nombre));
                }
            }
            else {
                map.set(itemName, String(nombre));
            }
        });

    // 整形
    const ret = [];
    map.forEach((v, k) => {
        if (v == "" || typeof(v) === "undefined") {
            ret.push(k)
        }
        else {
            ret.push(k + "　　" + v);
        }
    })
    return ret;
}

function clickBtn_nayose() {
    const lines_toNayose = document.querySelector("#inputarea_forNayose form.nayose .input").value;
    const nys = nayose(lines_toNayose);
    const msg = nys.join("\n");
    document.querySelector("#inputarea_forNayose form.nayose .output").value = msg;
}
function clickBtn_nayose_copy() {
    document.querySelector("#inputarea_forNayose form.nayose .output").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 名開き
////////////////////////////////////////////////

function releaseNayoseLines (multiLines, nombreConnector, delim) {
    const delimiter = (delim == "tab")? "\t": "　　";
    const releasedObj = [];
    const lines = multiLines.split(/[\r\n]+/g);
    lines.filter(line => line).forEach(line => {
        if (line.indexOf(delimiter) == -1) {
            releasedObj.push({name: line, nombre: ""});
            return
        }
        const [name, nombre, ...rest] = line.split(delimiter);
        if (nombre.indexOf(nombreConnector) != -1) {
            const nombreArray = nombre.replace(/\s+/g, "").split(nombreConnector);
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
    const delim = document.querySelector("#inputarea_forRelease form.delimiter").radio1.value;
    const nombreConnector = document.querySelector("#inputarea_forRelease form.nombreConnector").radio1.value;

    const linesToRelease = document.querySelector("#inputarea_forRelease form.release .input").value;
    const releasedObj = releaseNayoseLines(linesToRelease, nombreConnector, delim);

    const outputTable = document.querySelector("#inputarea_forRelease .outputTable");
    resetTable(outputTable);

    for (let item in releasedObj) {
        let row = outputTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = releasedObj[item].name;
        cell2.innerHTML = releasedObj[item].nombre;
    }
}
function clickBtn_release_copy() {
    const outputTable = document.querySelector("#inputarea_forRelease .outputTable");
    copyTable(outputTable);
}


////////////////////////////////////////////////
// 子項目復活
////////////////////////////////////////////////

function completeChildItem (multiLines, delim) {
    const lines = multiLines.split(/[\r\n]+/g).filter(line => line);
    const delimiter = (delim == "spaces")? "　　": "\t";
    const regAfterDelim = new RegExp(`${delimiter}.+$`, "g");
    const regFiller = new RegExp("(\u2500|\u2015|\u2500)+");
    const completedArray = [];
    completedArray.push(lines[0]);
    let lastParentItem = lines[0].replace(regAfterDelim, "");
    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i];
        if (currentLine.match(regFiller)) {
            const completedItem = currentLine.replace(/^\s+/, "").replace(regFiller, lastParentItem);
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
    const delimiter = document.querySelector("#inputarea_toComplete form.delimiter").radio1.value;
    const lines_toComplete = document.querySelector("#inputarea_toComplete form.complete .input").value;
    const completedArray = completeChildItem(lines_toComplete, delimiter);
    document.querySelector("#inputarea_toComplete form.complete .output").value = completedArray.join("\n");
}
function clickBtn_complete_copy() {
    document.querySelector("#inputarea_toComplete form.complete .input").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 索引テンプレート生成
////////////////////////////////////////////////

function generateTemplare(multiLines) {
    const templateArray = [];
    const lines = multiLines.split(/[\r\n]+/g).filter(line => line);
    lines.forEach(line => {
        const [page, counter, ...rest] = line.split("\t");
        const nItem = toHankaku(counter);
        if (String(nItem) != "0" && nItem.match(/^\d+$/)) {
            for (let i = 0; i < Number(nItem); i++) {
                templateArray.push(page);
            }
        }
    });
    return templateArray
}

function clickBtn_generate() {
    const linesToGenerate = document.querySelector("#inputarea_toGenerate form.generate .input").value;
    const templateArray = generateTemplare(linesToGenerate);

    const outputTable = document.querySelector("#inputarea_toGenerate .outputTable");
    resetTable(outputTable)

    templateArray.forEach(line => {
        let row = outputTable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = line;
        cell2.innerHTML = "";
    });
}
function clickBtn_generate_copy() {
    const templateTable = document.querySelector("#inputarea_toGenerate .outputTable");
    copyTable(templateTable);
}

////////////////////////////////////////////////
// 子項目候補の確認
////////////////////////////////////////////////

function highlightChildItem(multilines, mode="tail") {
    const lines = multilines.split(/[\r\n]+/g);
    const nonMiyoItems = lines.filter(line => !line.match(/→/g));
    const indexItems = nonMiyoItems
        .filter(line => line)
        .filter(line => !line.match(/^　/g))
        .map(line => line.replace(/　　\d.*$/g, ""));
    const array = indexItems.map(item => {
        const itemBaseName = item.replace(/（.*?）|［.*?］/g, "");
        const escaped = itemBaseName.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");

        let reg
        if (mode == "tail") {
            reg = new RegExp(`${escaped}$`, "g");
        }
        else if (mode == "head") {
            reg = new RegExp(`^${escaped}`, "g");
        }
        else {
            reg = new RegExp(`^${escaped}|${escaped}$`, "g");
        }

        const grep = indexItems.filter(line => line.match(reg));
        if (grep.length > 1) {
            const markup = grep
                .filter(line => !(line == item))
                .map(line => line.replace(reg, "<b class=\"blue\">$&</b>"))
                .join("<br>");
            return `<b>${item}</b> を含む項目：<br>${markup}`;
        }
    }).filter(x => x);
    return array.map(item => `<p>${item}</p>`).join("\n");
}

function clickBtn_checkChild() {
    const lines = document.querySelector("#inputarea_forCheckChild form.check .input").value;
    const mode = document.querySelector("#inputarea_forCheckChild form.searchPos").radio1.value;
    const markup = highlightChildItem(lines, mode);
    document.querySelector("#inputarea_forCheckChild .output").innerHTML = markup;
}

////////////////////////////////////////////////
// ノンブル並びチェック
////////////////////////////////////////////////

function isSorted(array) {
    for (let i = 0; i < array.length - 1; i++) {
        if (Number(array[i]) >= Number(array[i + 1])) {
            return false
        }
    }
    return true
}

function hasConsecutiveTriplet(array) {
    for (let i = 0; i < array.length - 2; i++) {
        const current = Number(array[i]);
        if (current + 1 == Number(array[i + 1]) && current + 2 == Number(array[i + 2])) {
            return true
        }
    }
    return false
}

function highlightInvalidNombreLine(multilines) {
    const invalidLines = multilines.split(/[\r\n]+/g)
        .filter(line => line)
        .map(line => {
            const nombres = line.replace(/^.+?　　/, "").replace(/\s+/, "").replace("，", ",");
            const nombreArray = nombres.replace("-", ",").split(",");
            const ret = [line];
            if (!isSorted(nombreArray)) {
                ret.push("<span style=\"font-weight:bold;color:red;margin:0 4px;\">←順番</span>");
            }
            if (hasConsecutiveTriplet(nombreArray)) {
                ret.push("<span style=\"font-weight:bold;color:blue;margin:0 4px;\">←連続</span>");
            }
            return (ret.join("") == line)? null : ret.join("");
        }).filter(x => x);
    return (invalidLines.length < 1)? "<p>\u{1F389}問題は見当たりません！</p>" : "<p>" + invalidLines.join("<br>\n") + "</p>";
}

function clickBtn_checkNombre() {
    const lines = document.querySelector("#inputarea_forCheckNombre form.check .input").value;
    const markup = highlightInvalidNombreLine(lines);
    document.querySelector("#inputarea_forCheckNombre .output").innerHTML = markup;
}
