class Util {

    static linesArray(multiline) {
        /**
         * value of textarea never contains \r(carriage return)
         *
         * - https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element
         * - https://zzz.buzz/2017/12/21/javascript-traps-and-pitfalls-three-normalizations-of-textarea-elements-value/
         * - https://knooto.info/html-textarea-newline-character/
         */
        return multiline.split(/\n/).map(line => String(line));
    }

    static toHalfWidth(str) {
        return str.replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }

    static copyTable(tbody) {
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

    static copyValue(elem) {
        navigator.clipboard.writeText(String(elem.value).replace(/&amp;/g, "&"));
        alert("コピーしました！");
    }

    static resetTable(tbody) {
        const maxRow = tbody.rows.length;
        for (let r = maxRow - 1; r >= 0; r--) {
            tbody.deleteRow(r);
        }
    }

    static toKatakana(str){
        return str.replace(/[\u3041-\u3096]/g, function(match) {
            const chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    }

    static toHiragana(str){
        return str.replace(/[\u30a1-\u30f6]/g, function(match) {
            const chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
    }

}


class Entry {

    static parseParen(s) {
        const inner = s.replace(/^.*[\uff08\u0028\uff3b\u005b](.+?)[\uff09\u0029\uff3d\u005d]$/, "$1");
        if (inner == s) {
            return [];
        }
        return inner.replace(/\uff0c/g, ",").split(",").map(x => String(x).trim()).filter(Boolean);
    }

    static trimTrailingParen(s) {
        return s.replace(/(\uff08.+?\uff09|\uff3b.+?\uff3d|\u0028.+?\u0029|\u005b.+?\u005d)$/, "");
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
            info.basename = this.trimTrailingParen(nm);
            info.nombre = elems.slice(-1)[0];
            info.referredFrom = this.parseParen(nm);
            info.isChild = this.isIndented(nm);
            return info;
        }
        if (elems.length == 2) {
            const nm = elems[0];
            info.name = nm;
            info.basename = this.trimTrailingParen(nm);
            info.nombre = elems[1];
            info.referredFrom = this.parseParen(nm);
            info.isChild = this.isIndented(nm);
            return info;
        }
        if (elems[0]) {
            const nm = elems[0];
            info.name = nm;
            info.basename = this.trimTrailingParen(nm);
            info.isChild = this.isIndented(nm);
            info.referredFrom = this.parseParen(nm);
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


class Address {

    constructor(s) {
        const sanitized = this.constructor.sanitize(s);
        this.RawElements = sanitized.split(",").map(x => x.trim()).filter(Boolean);
        this.ParsedNombres = this.constructor.parse(sanitized);
    }


    static parse(s) {
        const stack = [];
        s.split(",").map(x => x.trim()).filter(Boolean).map(nombre => {
            const nStr = String(nombre);
            if (nStr.indexOf("-") != -1) {
                const [start, end, ...rest] = nStr.split("-");
                this.parseRange(start, end).forEach(x => stack.push(x));
            }
            else {
                stack.push({
                    "display": {
                        "text": nStr,
                        "prefix": this.getNombrePrefix(nStr),
                        "suffix": this.getNombreSuffix(nStr),
                    },
                    "intValue": Number(nStr.replace(/[^\d]/g, "")),
                    "hyphenated": false,
                });
            }
        });
        return stack;
    }

    static sanitize(s) {
        return s.replace(/\s/g, "").replace(/\uff0c/g, ",").replace(/[\u002d\u2010\u2011\u2012\u2013\u2014\uFF0D]/g, "-").replace(/\-+/g, "-").replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g, function(m) {
            return String.fromCharCode(m.charCodeAt(0) - 0xFEE0);
        });
    }

    static getNombrePrefix(s) {
        if (s.match(/^[0-9]/)) {
            return "";
        }
        return s.split(/\d+/)[0];
    }

    static getNombreSuffix(s) {
        if (s.match(/[0-9]$/)) {
            return "";
        }
        return s.split(/\d+/).slice(-1)[0];
    }

    static parseRange(start, end) {
        const range = [];
        const s = this.parse(String(start))[0];
        const e = this.parse(String(end))[0];
        range.push(s);
        for (let idx = s.intValue + 1; idx < e.intValue; idx++) {
            const p = this.parse(String(idx))[0];
            p.hyphenated = true;
            range.push(p);
        }
        range.push(e);
        return range;
    }

    isConsecutiveTriplet(startIdx) {
        if (this.ParsedNombres.length - 3 < startIdx) {
            return false;
        }
        const current = this.ParsedNombres[startIdx];
        const next1 = this.ParsedNombres[startIdx+1];
        const next2 = this.ParsedNombres[startIdx+2];
        if (current.intValue+1 == next1.intValue && current.intValue+2 == next2.intValue) {
            if (String(next1.display.text).match(/^\d+$/)) {
                return true;
            }
        }
        return false;
    }

    order() {
        const p = this.ParsedNombres;
        this.ParsedNombres = p.filter(x => x.display.text).sort((a, b) => a.intValue - b.intValue);
        return this.ParsedNombres;
    }

    unify() {
        const p = this.ParsedNombres;
        const stack = [];
        this.ParsedNombres = p.filter(nombre => {
            if (stack.includes(nombre.display.text)) {
                return false;
            }
            stack.push(nombre.display.text);
            return true;
        });
        return this.ParsedNombres;
    }

    hyphenate() {
        if (this.ParsedNombres.length < 3) {
            return;
        }
        const stack = [];
        stack.push({
            "item": this.ParsedNombres[0],
            "isHyphen": false
        });
        for (let i = 0; i < this.ParsedNombres.length - 2; i++) {
            const next = this.ParsedNombres[i+1];
            stack.push({
                "item": next,
                "isHyphen": this.isConsecutiveTriplet(i)
            });
        }
        stack.push({
            "item": this.ParsedNombres.slice(-1)[0],
            "isHyphen": false
        });
        this.ParsedNombres = stack.map(x => {
            if (x.isHyphen) {
                x.item.display.text = "\u2013";
            }
            return x.item;
        });
        return this.ParsedNombres;
    }

    format() {
        this.order();
        this.unify();
        this.hyphenate();
        return this.ParsedNombres.map(p => p.display.text).join(", ").replace(/, (\u2013, )+/g, "\u2013");
    }

}