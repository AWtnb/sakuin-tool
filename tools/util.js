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

function parseParen(s) {
    const inner = s.replace(/^.*[（\(［\[]/, "").replace(/[）\)］\]].*/, "");
    if (inner == s) {
        return [];
    }
    return inner.replace("，", ",").split(",").filter(Boolean).map(x => String(x).trim());
}

function getBasename(s) {
    return s.replace(/[（［\(\[].+?[）］\)\]]$/, "");
}

function isIndented(s) {
    return s.trimStart() != s;
}

function parseEntry(s, separator = "　　") {
    /**
     * split index entry to name and nombre
     */
    let info = {
        "name": "",
        "basename": "",
        "nombre": "",
        "referredFrom": [],
        "referTo": "",
        "isChild": false
    }
    const elems = s.split(separator).filter(Boolean).map(x => String(x));
    if (elems.length > 2) {
        const name = elems.slice(0,-1).join(separator);
        info.name = name;
        info.basename = getBasename(name);
        info.nombre = elems.slice(-1)[0];
        info.referredFrom = parseParen(name);
        info.isChild = isIndented(name);
        return info;
    }
    if (elems.length == 2) {
        const name = elems[0];
        info.name = name;
        info.basename = getBasename(name);
        info.nombre = elems[1];
        info.referredFrom = parseParen(name);
        info.isChild = isIndented(name);
        return info;
    }
    if (elems[0]) {
        const name = elems[0];
        info.name = name;
        info.basename = getBasename(name);
        info.isChild = isIndented(name);
        const refs = name.split("→").map(x => String(x).trim());
        if (refs.length > 1) {
            info.referTo = refs.slice(-1)[0];
        }
        return info;
    }
    return info;
}