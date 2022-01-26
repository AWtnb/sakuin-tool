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

function toKatakana(str){
    return str.replace(/[\u3041-\u3096]/g, function(match) {
        const chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
}

function toHiragana(str){
    return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        const chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

function parseEntry(s, separator = "　　") {
    /**
     * split index entry to name and nombre
     */
    const elems = s.split(separator).filter(Boolean).map(x => String(x));
    if (elems.length > 2) {
        const name = elems.slice(0,-1).join(separator);
        return {
            "name": name,
            "nombre": elems.slice(-1)[0],
            "isReference": false,
            "isChild": (name.trimStart() != name)
        }
    }
    if (elems.length == 2) {
        const name = elems[0];
        return {
            "name": name,
            "nombre": elems[1],
            "isReference": false,
            "isChild": (name.trimStart() != name)
        }
    }
    if (elems[0]) {
        const name = elems[0];
        return {
            "name": name,
            "nombre": "",
            "isReference": elems[0].includes("→"),
            "isChild": (name.trimStart() != name)
        }
    }
    return {
        "name": "",
        "nombre": "",
        "isReference": false,
        "isChild": false
    }
}