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
    return strNombre.replace(/，/g, ",").split(",").map(nStr => String(nStr).trim()).map(nStr => {
        const s = String(nStr)
        const prefix = s.split(/\d+/)[0];
        const suffix = s.split(/\d+/).slice(-1)[0];
        return {
            "display": s,
            "prefix": prefix,
            "suffix": suffix,
            "intValue": toHalfWidth(s).replace(/[^\d]/g, "")
        }
    });
}