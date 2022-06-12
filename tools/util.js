function linesArray(multiline) {
    /**
     * value of textarea never contains \r(carriage return)
     * 
     * - https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element
     * - https://zzz.buzz/2017/12/21/javascript-traps-and-pitfalls-three-normalizations-of-textarea-elements-value/
     * - https://knooto.info/html-textarea-newline-character/
     */
    return multiline.split(/\n/).map(line => String(line));
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
    for (let r = maxRow - 1; r >= 0; r--) {
        tbody.deleteRow(r);
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


class Entry {

    static parseParen(s) {
        const inner = s.replace(/^.*[（\(［\[](.+?)[）\)］\]]$/, "$1");
        if (inner == s) {
            return [];
        }
        return inner.replace(/，/g, ",").split(",").map(x => String(x).trim()).filter(Boolean);
    }

    static trimTrailingParen(s) {
        return s.replace(/(（.+?）|［.+?］|\(.+?\)|\[.+?\])$/, "");
    }

    static isIndented(s) {
        return s.trimStart() != s;
    }

    static parse(s, separator = "　　") {
        /**
         * split index entry to name and nombre
         */
        let info = {
            "name": "",
            "basename": "",
            "nombre": "",
            "referredFrom": [],
            "referTo": "",
            "isReference": false,
            "isChild": false
        }
        const elems = s.split(separator).filter(Boolean).map(x => String(x));
        if (elems.length > 2) {
            const nm = elems.slice(0,-1).join(separator);
            info.name = nm;
            info.basename = Entry.trimTrailingParen(nm);
            info.nombre = elems.slice(-1)[0];
            info.referredFrom = Entry.parseParen(nm);
            info.isChild = Entry.isIndented(nm);
            return info;
        }
        if (elems.length == 2) {
            const nm = elems[0];
            info.name = nm;
            info.basename = Entry.trimTrailingParen(nm);
            info.nombre = elems[1];
            info.referredFrom = Entry.parseParen(nm);
            info.isChild = Entry.isIndented(nm);
            return info;
        }
        if (elems[0]) {
            const nm = elems[0];
            info.name = nm;
            info.basename = Entry.trimTrailingParen(nm);
            info.isChild = Entry.isIndented(nm);
            info.referredFrom = Entry.parseParen(nm);
            const refs = nm.split("→").map(x => String(x).trim()).filter(Boolean);
            if (refs.length > 1) {
                info.referTo = refs.slice(-1)[0];
                info.basename = refs[0];
                info.isReference = true;
            }
            return info;
        }
        return info;
    }

}