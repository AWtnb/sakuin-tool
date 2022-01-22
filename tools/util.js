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

class NombreParser {

    static get barsReg() {
        return new RegExp("\s*[\u002d\u2010\u2011\u2012\u2013\u2014\uFF0D]+\s*");
    }

    static arrayByComma(s) {
        return s.replace(/，/g, ",").split(",");
    }

    static parse(nombres) {
        return this.arrayByComma(nombres).map(nStr => {
            const s = toHalfWidth(nStr).trim();
            const range = [];
            if (s.match(this.barsReg)) {
                const [start, end] = s.split(this.barsReg);
                this.rangedNombres(start, end).forEach(x => range.push(x));
            }
            return {
                "display": s,
                "range": range,
                "hasRange": (range.length > 0),
                "intValue": (range.length > 0)? range[0][0].intValue : Number(s.replace(/[^\d]/g, ""))
            }
        });
    }

    static rangedNombres(start, end) {
        const range = [];
        const s = this.parse(start);
        const e = this.parse(end);
        range.push(s);
        for (let idx = s[0].intValue + 1; idx < e[0].intValue; idx++) {
            range.push(this.parse(String(idx)));
        }
        range.push(e);
        return range;
    }

}

class Nombre {

    constructor(text) {
        this.text = text;
        this.parsed = NombreParser.parse(text);
    }

}
