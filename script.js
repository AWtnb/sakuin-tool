
////////////////////////////////////////////////
// 汎用関数
////////////////////////////////////////////////

function escapeMeta(str) {
    return str.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&");
}

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

function getYomi(token) {
    console.log(token.surface_form, token.word_type, token.pos, token.reading);
    const surface = token.surface_form;
    if (surface.match(/([a-zA-Z]|[ァ-ヴー・])+/g)) {
        return surface;
    }
    if (token.pos == "記号") {
        return surface;
    }
    if (token.word_type != "KNOWN") {
        return token.surface_form;
    }
    return token.reading;
}

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
    promise.then(tokenizer => {
        const result = inputLines.split(/\r?\n/g).map(line => {
            return tokenizer.tokenize(line).map(getYomi).join("");
        });
        outputArea.value = result.join("\n")
    })
    .catch((e) => {
        outputArea.value = "解析失敗…\nやり直してみてください！";
        console.log(e);
    });
}

function clickBtn_yomi() {
    const yomiElem = document.querySelector("#userinterface_forYomi");
    const lines = yomiElem.querySelector("form.yomi .userInput").value;
    const outputArea = yomiElem.querySelector("form.yomi .displayResult");
    setYomi(outputArea, lines);
}
function clickBtn_yomi_copy() {
    document.querySelector("#userinterface_forYomi form.yomi .displayResult").select();
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
    const katahiraElem = document.querySelector("#userinterface_forKatahira");
    const lines_toConvert = katahiraElem.querySelector("form.convert .userInput").value;
    const mode = katahiraElem.querySelector("form.katahiraFlag").radio1.value;
    const converted = convertHiraKata(lines_toConvert, mode);
    katahiraElem.querySelector("form.convert .displayResult").value = converted;
}
function clickBtn_katahira_copy() {
    document.querySelector("#userinterface_forKatahira form.convert .displayResult").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 配列読み
////////////////////////////////////////////////

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

    let katakana = hira2kata(lines);
    for (let k of map.keys()) {
        const reg = new RegExp(k, "g");
        katakana = katakana.replace(reg, map.get(k));
    }
    return (removeNoise)? katakana.replace(/[^ァ-ヴa-zA-Z0-9０-９\r\n]/g, "") : katakana;
}

function clickBtn_hairetsu() {
    const hairetsuElem = document.querySelector("#userinterface_forHairetsu");
    const lines_toHairetsu = hairetsuElem.querySelector("form.hairetsu .userInput").value;
    const removeFlag = hairetsuElem.querySelector("form.removeFlag .removeFlag");

    const converted = toHairetsu(lines_toHairetsu, removeFlag.checked);
    const msg = converted;
    // const msg = converted.join("\n");
    hairetsuElem.querySelector("form.hairetsu .displayResult").value = msg;
}
function clickBtn_hairetsu_copy() {
    document.querySelector("#userinterface_forHairetsu form.hairetsu .displayResult").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 名寄せ
////////////////////////////////////////////////

function hasNaN(array) {
    const reg = new RegExp(/[^\d]/)
    return reg.test(array.join(""))
}

function hyphenateConsecutive (inputArray) {
    if (inputArray.length < 3) {
        return inputArray
    }
    const stack = [];
    stack.push({
        Item: inputArray[0],
        Hyphenate: false
    });
    for (let i = 0; i <= inputArray.length - 3; i++) {
        const [current, next1, next2] = inputArray.slice(i, i+3);
        const isConsecutive = (hasNaN(inputArray.slice(i, i+3)))?
            false :
            (Number(current)+1 == next1 && Number(current)+2 == next2)
        stack.push({
            Item: next1,
            Hyphenate: isConsecutive
        });
    }
    stack.push({
        Item: inputArray[inputArray.length - 1],
        Hyphenate: false
    });
    const nombres = stack.map(x => ((x.Hyphenate)? "-" : x.Item));
    return Array.from(new Set(nombres))
}

function asNumber(s) {
    return Number(toHankaku(s.replace(/[^[0-9０-９]/g, "")))
}

function nayose (lines, nombreOnLeft = false) {
    const map = new Map()
    const lineArray = lines.split(/[\r\n]+/g);
    // 集約
    lineArray.filter(line => line).filter(line => !line.match(/^\s+$/)).forEach(line => {
        const [item, nombre, ...rest] = (nombreOnLeft)? line.split("\t").slice(0, 2).reverse() : line.split("\t");
        if (map.has(item)) {
            map.get(item).push(nombre);
        }
        else {
            map.set(item, [nombre]);
        }
    });

    // 整形
    const ret = [];
    map.forEach((v, k) => {
        const sorted = v.filter(x => x).sort((a, b) => asNumber(a) - asNumber(b));
        const uniq = Array.from(new Set(sorted));
        if (uniq.length < 1) {
            ret.push(k);
        }
        else {
            const hyphenated = hyphenateConsecutive(uniq);
            ret.push(k + "　　" + hyphenated.join(", ").replace(", -, ", "-"));
        }
    })
    return ret;
}

function nayoseFromTop(lines, nombreOnLeft = false) {
    const lineArray = lines.split(/[\r?\n]+/g).filter(line => line).filter(line => !line.match(/^\s+$/));
    const stack = [];
    for (let i = 0; i < lineArray.length; i++) {
        const line = lineArray[i];
        const [item, nombre, ...rest] = (nombreOnLeft)? line.split("\t").slice(0, 2).reverse() : line.split("\t");
        if (i == 0) {
            stack.push([item, [nombre]]);
            continue;
        }
        const lastIdx = stack.length - 1;
        if (item == stack[lastIdx][0]) {
            stack[lastIdx][1].push(nombre);
            continue;
        }
        stack.push([item, [nombre]]);
    }

    return stack.map(pair => {
        const [item, nombreArray] = pair;
        const sorted = nombreArray.filter(x => x).sort((a, b) => asNumber(a) - asNumber(b));
        const uniq = Array.from(new Set(sorted));
        if (uniq.length < 1) {
            return item;
        }
        const hyphenated = hyphenateConsecutive(uniq);
        return (item + "　　" + hyphenated.join(", ").replace(", -, ", "-"));
    });

}

function clickBtn_nayose() {
    const nayoseElem = document.querySelector("#userinterface_forNayose");
    const lines_toNayose = nayoseElem.querySelector("form.nayose .userInput").value;
    const nys = (nayoseElem.querySelector("form.orderedFlag .isOrdered").checked)?
        nayoseFromTop(lines_toNayose, nayoseElem.querySelector("form.nombreLeftFlag .isLeft").checked) :
        nayose(lines_toNayose, nayoseElem.querySelector("form.nombreLeftFlag .isLeft").checked);
    const msg = nys.join("\n");
    nayoseElem.querySelector("form.nayose .displayResult").value = msg;
}
function clickBtn_nayose_copy() {
    document.querySelector("#userinterface_forNayose form.nayose .displayResult").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 名開き
////////////////////////////////////////////////

function releaseNayoseLines (multiLines) {
    const releasedObj = [];
    const lines = multiLines.split(/[\r\n]+/g);
    lines.filter(line => line)
    .map(line => line.replace("　　", "\t"))
    .forEach(line => {
        if (line.indexOf("\t") == -1) {
            releasedObj.push({name: line, nombre: ""});
            return
        }
        const [name, nombres, ...rest] = line.split("\t");
        if (!nombres) {
            releasedObj.push({name: name, nombre: ""});
            return
        }
        const nombreArray = nombres.replace(/\s+/g, "").replace(/，/g, ",").split(",");
        nombreArray.forEach(n => {
            releasedObj.push({name: name, nombre: n});
        });
    });
    return releasedObj
}

function clickBtn_release() {
    const releaseElem = document.querySelector("#userinterface_forRelease");

    const linesToRelease = releaseElem.querySelector("form.release .userInput").value;
    const releasedObj = releaseNayoseLines(linesToRelease);

    const outputTable = releaseElem.querySelector(".resultTable");
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
    const outputTable = document.querySelector("#userinterface_forRelease .resultTable");
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
    const completeElem = document.querySelector("#userinterface_toComplete");

    const delimiter = completeElem.querySelector("form.delimiter").radio1.value;
    const lines_toComplete = completeElem.querySelector("form.complete .userInput").value;
    const completedArray = completeChildItem(lines_toComplete, delimiter);
    completeElem.querySelector("form.complete .displayResult").value = completedArray.join("\n");
}
function clickBtn_complete_copy() {
    document.querySelector("#userinterface_toComplete form.complete .displayResult").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// 索引テンプレート生成
////////////////////////////////////////////////

function generateTemplare(multiLines) {
    const templateArray = [];
    const lines = multiLines.split(/[\r\n]+/g).filter(line => line);
    lines
    .filter(line => !(line.match(/(\t)0/)))
    .forEach((line, index) => {
        const [page, counter, ...rest] = line.split("\t");
        const nItem = toHankaku(counter);
        if (nItem.match(/^\d+$/)) {
            for (let i = 0; i < Number(nItem); i++) {
                templateArray.push({index:(index + 1), page:page});
            }
        }
    });
    return templateArray
}

function clickBtn_generate() {
    const generateElem = document.querySelector("#userinterface_toGenerate");

    const linesToGenerate = generateElem.querySelector("form.generate .userInput").value;
    const templateArray = generateTemplare(linesToGenerate);

    const outputTable = generateElem.querySelector(".resultTable");
    resetTable(outputTable)

    templateArray.forEach((line, idx) => {
        const row = outputTable.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        cell1.innerHTML = (idx + 1);
        cell2.innerHTML = line.index;
        cell3.innerHTML = line.page;
        cell4.innerHTML = "";
    });
}
function clickBtn_generate_copy() {
    const templateTable = document.querySelector("#userinterface_toGenerate .resultTable");
    copyTable(templateTable);
}

////////////////////////////////////////////////
// 子項目候補の確認
////////////////////////////////////////////////

function highlightChildItem(multilines, mode = "tail") {
    const lines = multilines.split(/[\r\n]+/g);
    const nonMiyoItems = lines.filter(line => !line.match(/→/g));
    const indexItems = nonMiyoItems
    .filter(line => line)
    .filter(line => !line.match(/^　/g))
    .map(line => line.replace(/　　\d.*$/g, ""))
    .sort((a, b) => b.length - a.length);
    const possibleChildItemArray = indexItems.map(item => {
        const itemBaseName = item.replace(/（.*?）|［.*?］/g, "");
        const escaped = escapeMeta(itemBaseName);

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
            .filter(line => (line != item))
            .map(line => line.replace(reg, "<b class=\"blue\">$&</b>"))
            .join("<br>");
            return `<b>${item}</b> を含む項目：<br>${markup}`;
        }
        return null
    }).filter(x => x);
    return possibleChildItemArray.map(item => `<p>${item}</p>`).join("\n");
}

function clickBtn_checkChild() {
    const checkChildElem = document.querySelector("#userinterface_forCheckChild");

    const lines = checkChildElem.querySelector("form.check .userInput").value;
    const mode = checkChildElem.querySelector("form.searchPos").radio1.value;
    const markup = highlightChildItem(lines, mode);
    checkChildElem.querySelector(".displayResult").innerHTML = markup;
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
            const nombres = line.replace(/^.+?　　/, "").replace(/\s+/, "").replace(/，/g, ",");
            const nombreArray = nombres.replace(/-/g, ",").split(",");
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
    const checkNombreElem = document.querySelector("#userinterface_forCheckNombre");
    const lines = checkNombreElem.querySelector("form.check .userInput").value;
    const markup = highlightInvalidNombreLine(lines);
    checkNombreElem.querySelector(".displayResult").innerHTML = markup;
}

////////////////////////////////////////////////
// 見よ項目チェック
////////////////////////////////////////////////

// 見よ項目があるのに見よ先の項目に括弧書きで付記されていないものを探す関数
function findLostMiyoParenthesis(multilines) {
    const lines = multilines.split(/[\r\n]+/g).map(line => line.replace(/　　.+$/, "")).filter(line => line);
    const miyoLines = lines.filter(line => (line.indexOf("→") != -1));
    return miyoLines.map(line => {
        const [fromItem, toItem, ...rest] = line.split(/\s*→\s*/);
        const fromItemESCAPED = escapeMeta(fromItem);
        const toItemESCAPED = escapeMeta(toItem);
        const targetPattern = new RegExp(`^${toItemESCAPED}[（［].*${fromItemESCAPED}.*[）］]`);
        const grep = lines.filter(line => line.match(targetPattern));
        if (grep.length < 1) {
            return {found: line, shouldExist:`${toItem}（${fromItem}）`}
        }
        return null
    }).filter(x => x);
}

// 括弧書きで付記されているのに見よ項目がないものを探す関数
function findLostMiyoItem(multilines) {
    const lines = multilines.split(/[\r\n]+/g).filter(line => line);
    const miyoReferredLines = lines.filter(line => line.match(/[［（\(].+?[］）\)]/));
    const lostInfo = [];
    miyoReferredLines.forEach(line => {
        const toItem = line.replace(/[［（\(].+$/, "");
        const toItemESCAPED = escapeMeta(toItem);
        const fromItemArray = line.replace(/^.+?[［（\(]/, "").replace(/[］）\)].*$/, "").split(/[,，] */);
        fromItemArray.forEach(fromItem => {
            const fromItemESCAPED = escapeMeta(fromItem);
            const targetPattern = new RegExp(`${fromItemESCAPED}\\s*→\\s*${toItemESCAPED}`);
            const grep = lines.filter(line => line.match(targetPattern));
            if (grep.length < 1) {
                lostInfo.push({found: line, shouldExist:`${fromItem}→${toItem}`});
            }
        });
    });
    return lostInfo
}

function clickBtn_checkMiyo(){
    const checkMiyoElem = document.querySelector("#userinterface_forCheckMiyo");

    const lines = checkMiyoElem.querySelector("form.check .userInput").value;
    const lostMiyoParenInfo = findLostMiyoParenthesis(lines);
    const foundArray = [];
    if (lostMiyoParenInfo.length > 0) {
        foundArray.push("<label>見よ項目があるのに参照先に括弧で付記されていないもの</label>");
        lostMiyoParenInfo.forEach(item => {
            foundArray.push(`<li style="margin-left:1em"><span style="font-weight:bold">${item.found}</span> …… <span style="color:red">${item.shouldExist}</span></li>`);
        });
    }
    const lostMiyoItemInfo = findLostMiyoItem(lines);
    if (lostMiyoItemInfo.length > 0) {
        foundArray.push("<label>参照元として括弧書きされているのに見よ項目がないもの</label>");
        lostMiyoItemInfo.forEach(item => {
            foundArray.push(`<li style="margin-left:1em"><span style="font-weight:bold">${item.found}</span> …… <span style="color:blue">${item.shouldExist}</span></li>`);
        });
    }
    const markup = foundArray.join("\n");
    checkMiyoElem.querySelector(".displayResult").innerHTML = markup;
}

////////////////////////////////////////////////
// ノンブル加算減算
////////////////////////////////////////////////

function adjustNombre(multiline, startNombre, endNombre, nombreDelta, useFullWidthComma = false) {
    const commaType = (useFullWidthComma)? "，" : ", ";
    const lineArray = multiline.split(/[\r\n]+/g);
    return lineArray
    .filter(x => x)
    .map(line => {
        const [item, nombres, ...rest] = line.split("　　");
        if (!nombres) {
            return {
                original: line,
                adjusted: line,
                isModified: false
            }
        }
        const nombresArray = nombres
        .split(commaType)
        .map(nbr => {
            if (Number(startNombre) <= Number(nbr) && Number(nbr) <= Number(endNombre)) {
                return Number(nbr) + Number(nombreDelta);
            }
            return nbr
        });
        const adjustedLine = item + "　　" + nombresArray.join(commaType);
        return {
            original: line,
            adjusted: adjustedLine,
            isModified: (line != adjustedLine)
        }
    });
}


function clickBtn_adjustNombre(){
    const adjustNombreElem = document.querySelector("#userinterface_forAdjustNombre");

    const adjustedArray = adjustNombre(
        adjustNombreElem.querySelector("form.adjustNombre .userInput").value,
        adjustNombreElem.querySelector("input.startNombre").value,
        adjustNombreElem.querySelector("input.endNombre").value,
        adjustNombreElem.querySelector("input.nombreDelta").value,
        adjustNombreElem.querySelector("input.fullWidthCommaFlag").checked
    );
    const adjustedLines = adjustedArray.map(item => item.adjusted).join("\n");
    adjustNombreElem.querySelector("form.adjustNombre textarea.displayResult").value = adjustedLines;
    const modified = adjustedArray.filter(item => item.isModified);
    const markup = (modified.length)?
    `<p>■${modified.length}行の変更：</p>` + modified.map(item => {
        return `<p style="margin:2px 0;"><span style="color:gray">${item.original}</span><br><span style="color:red">${item.adjusted}</span></p>`;
    }).join("\n") :
    "<p>（変更箇所はありません）</p>";
    adjustNombreElem.querySelector("div.displayResult").innerHTML = markup;
}

function clickBtn_adjustNombre_copy(){
    document.querySelector("#userinterface_forAdjustNombre form.adjustNombre .displayResult").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}

////////////////////////////////////////////////
// ローマ字に変換
////////////////////////////////////////////////

// const romajiHash = {
//     "ア":"A", "イ":"I", "ウ":"U", "エ":"E", "オ":"O",
//     "カ":"Ka", "キ":"Ki", "ク":"Ku", "ケ":"Ke", "コ":"Ko", "サ":"Sa", "シ":"Shi", "ス":"Su", "セ":"Se", "ソ":"So",
//     "タ":"Ta", "チ":"Chi", "ツ":"Tsu", "テ":"Te", "ト":"To",
//     "ナ":"Na", "ニ":"Ni", "ヌ":"Nu", "ネ":"Ne", "ノ":"No",
//     "ハ":"Ha", "ヒ":"Hi", "フ":"Fu", "ヘ":"He", "ホ":"Ho",
//     "マ":"Ma", "ミ":"Mi", "ム":"Mu", "メ":"Me", "モ":"Mo",
//     "ヤ":"Ya", "ユ":"Yu", "ヨ":"Yo",
//     "ラ":"Ra", "リ":"Ri", "ル":"Ru", "レ":"Re", "ロ":"Ro",
//     "ワ":"Wa", "ヲ":"Wo", "ン":"N",
//     "ガ":"Ga", "ギ":"Gi", "グ":"Gu", "ゲ":"Ge", "ゴ":"Go",
//     "ザ":"Za", "ジ":"Ji", "ズ":"Zu", "ゼ":"Ze", "ゾ":"Zo",
//     "ダ":"Da", "ヂ":"Di", "ヅ":"Zu", "デ":"De", "ド":"Do",
//     "バ":"Ba", "ビ":"Bi", "ブ":"Bu", "ベ":"Be", "ボ":"Bo",
//     "パ":"Pa", "ピ":"Pi", "プ":"Pu", "ペ":"Pe", "ポ":"Po",
//     "ャ":"Lya", "ュ":"Lyu", "ョ":"Lyo", "ッ":"Ltu",
// };

function toRoman(s) {
    const map = new Map();
    [
        ["ア", "A"], ["イ", "I"], ["ウ", "U"], ["エ", "E"], ["オ", "O"],
        ["カ", "Ka"], ["キ", "Ki"], ["ク", "Ku"], ["ケ", "Ke"], ["コ", "Ko"],
        ["サ", "Sa"], ["シ", "Shi"], ["ス", "Su"], ["セ", "Se"], ["ソ", "So"],
        ["タ", "Ta"], ["チ", "Chi"], ["ツ", "Tsu"], ["テ", "Te"], ["ト", "To"],
        ["ナ", "Na"], ["ニ", "Ni"], ["ヌ", "Nu"], ["ネ", "Ne"], ["ノ", "No"],
        ["ハ", "Ha"], ["ヒ", "Hi"], ["フ", "Fu"], ["ヘ", "He"], ["ホ", "Ho"],
        ["マ", "Ma"], ["ミ", "Mi"], ["ム", "Mu"], ["メ", "Me"], ["モ", "Mo"],
        ["ヤ", "Ya"], ["ユ", "Yu"], ["ヨ", "Yo"],
        ["ラ", "Ra"], ["リ", "Ri"], ["ル", "Ru"], ["レ", "Re"], ["ロ", "Ro"],
        ["ワ", "Wa"], ["ヲ", "Wo"], ["ン", "N"],
        ["ガ", "Ga"], ["ギ", "Gi"], ["グ", "Gu"], ["ゲ", "Ge"], ["ゴ", "Go"],
        ["ザ", "Za"], ["ジ", "Ji"], ["ズ", "Zu"], ["ゼ", "Ze"], ["ゾ", "Zo"],
        ["ダ", "Da"], ["ヂ", "Di"], ["ヅ", "Zu"], ["デ", "De"], ["ド", "Do"],
        ["バ", "Ba"], ["ビ", "Bi"], ["ブ", "Bu"], ["ベ", "Be"], ["ボ", "Bo"],
        ["パ", "Pa"],["ピ", "Pi"],["プ", "Pu"],["ペ", "Pe"],["ポ", "Po"],
        ["ャ", "Lya"], ["ュ", "Lyu"], ["ョ", "Lyo"], ["ッ", "Ltu"]
    ].forEach(x => map.set(...x))

    let converted = hira2kata(s);
    for (let k of map.keys()) {
        const reg = new RegExp(k, "g");
        converted = converted.replace(reg, map.get(k));
    }
    // サ行タ行の拗音処理 → 拗音処理 → 促音処理
    converted = converted.replace(/([CS]h|J)iLy(.)/g, '$1$2').replace(/([A-Z])iL(y.)/g, '$1$2').replace(/Ltu(.)/g, '$1$1')
    return converted.toLowerCase();
}

function clickBtn_roman() {
    const romanElem = document.querySelector("#userinterface_forRoman");
    const lines_toConvert = romanElem.querySelector("form.convert .userInput").value;
    const converted = toRoman(lines_toConvert);
    romanElem.querySelector("form.convert .displayResult").value = converted;
}

function clickBtn_roman_copy() {
    document.querySelector("#userinterface_forRoman form.convert .displayResult").select();
    document.execCommand("Copy");
    alert("コピーしました！");
}
