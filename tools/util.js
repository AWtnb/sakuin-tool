function multiline2array(multiline) {
    return multiline.replace(/\r\n/g, "\n").split(/\n/).map(line => String(line));
}

function escapeMeta(str) {
    return str.replace(/[-[\]{}()*+?.,\\^$|]/g, "\\$&");
}

function toHalfWidth(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

function copyTable(tbody) {
    const lines = [];
    const maxRow = tbody.rows.length;
    for (let i = 0; i < maxRow; i++) {
        const row = tbody.rows[i];
        const maxCol = row.cells.length;
        const cells = [];
        for (let c = 0; c < maxCol; c++) {
            const cell = row.cells[c];
            cells.push(String(cell.innerHTML).replace(/&amp;/g, "&"));
        }
        lines.push(cells.join("\t"));
    }
    const s = lines.join("\r\n");
    navigator.clipboard.writeText(s);
    alert("コピーしました！");
}

function copyValue(elem) {
    navigator.clipboard.writeText(String(elem.value).replace(/&amp;/g, "&"));
    alert("コピーしました！");
}

function resetTable(tbody) {
    const maxRow = tbody.rows.length;
    if (maxRow > 1) {
        for (let r = maxRow - 1; r >= 0; r--) {
            tbody.deleteRow(r);
        }
    }
}

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

function parseNombre(strNombre) {
    const reg = new RegExp("[\u002d\u2010\u2011\u2012\u2013\u2014\u2015\uFF0D\u2500]+");
    return strNombre.replace(/，/g, ",").split(",").map(nStr => String(nStr).trim()).map(nStr => {
        const s = toHalfWidth(nStr);
        const range = [];
        if (s.match(reg)) {
            const [start, end] = s.split(reg);
            const startObj = parseNombre(start);
            const endObj = parseNombre(end);
            range.push(startObj);
            for (let idx = startObj[0].intValue + 1; idx < endObj[0].intValue; idx++) {
                range.push(parseNombre(String(idx)));
            }
            range.push(endObj);
        }
        return {
            "display": s,
            "range": range,
            "hasRange": (range.length > 0),
            "intValue": Number(toHalfWidth(s).replace(/[^\d]/g, ""))
        }
    });
}