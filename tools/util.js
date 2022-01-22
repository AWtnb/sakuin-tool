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

    static parse(nombre) {
        /**
         * nombre: must be string sepatated by comma
         */
        const stack = [];
        this.arrayByComma(nombre).map(nStr => {
            const s = toHalfWidth(nStr).trim();
            if (s.match(this.barsReg)) {
                const [start, end] = s.split(this.barsReg);
                this.rangedNombres(start, end).forEach(x => stack.push(x[0]));
            }
            else {
                stack.push({
                    "display": s,
                    "intValue": Number(s.replace(/[^\d]/g, ""))
                });
            }
        });
        return stack;
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

    static isConsecutive (a, b, c) {
        if (a.intValue+1 == b.intValue && a.intValue+2 == c.intValue) {
            if (!isNaN(b.display)) {
                return true;
            }
        }
        return false;
    }

}

class Nombre {

    constructor(s) {
        this.parsed = NombreParser.parse(s);
    }

    order() {
        this.parsed = this.parsed.filter(x => x.display).sort((a, b) => a.intValue - b.intValue);
    }

    unique() {
        const stack = [];
        this.parsed = this.parsed.filter(nombre => {
            if (stack.includes(nombre.display)) {
                return false;
            }
            stack.push(nombre.display);
            return true;
        });
    }

    hyphenate() {
        if (this.parsed.length < 3) {
            return;
        }
        const stack = [];
        stack.push({
            "item": this.parsed[0],
            "isHyphen": false
        });
        for (let i = 0; i < this.parsed.length - 2; i++) {
            const [current, next1, next2] = this.parsed.slice(i, i+3);
            stack.push({
                "item": next1,
                "isHyphen": NombreParser.isConsecutive(current, next1, next2)
            });
        }
        stack.push({
            "item": this.parsed.slice(-1)[0],
            "isHyphen": false
        });
        this.parsed = stack.map(x => {
            if (x.isHyphen) {
                return {
                    "display": "\u2013",
                    "intValue": x.item.intValue
                }
            }
            return x.item;
        });
    }

    toString() {
        return this.parsed.map(p => p.display).join(", ").replace(/, (\u2013, )+/g, "\u2013");
    }

}
