class Util {

    static getElemValueLines(selector) {
        /**
         * value of textarea never contains \r(carriage return)
         *
         * - https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element
         * - https://zzz.buzz/2017/12/21/javascript-traps-and-pitfalls-three-normalizations-of-textarea-elements-value/
         * - https://knooto.info/html-textarea-newline-character/
         */
        return document.querySelector(selector).value.split(/\n/).map(line => String(line));
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

    constructor(s, separator = "\u3000\u3000") {
        this.rawStr = s;
        this.separator = separator;
        this.elems = this.rawStr.split(this.separator).filter(Boolean).map(x => String(x));

        this.name = ""; // 項目名
        this.basename = ""; // 項目名から括弧を除いた部分（見よ項目の場合は「見よ元」部分）
        this.address = ""; // ノンブルの集合部分
        this.referredFrom = []; // カッコ内に付記された「見よ元」情報
        this.referTo = ""; // 見よ先
        this.isReference = false; // 見よ項目かどうか
        this.isChild = false; // 子項目かどうか

        this.parse();
    }

    parse() {
        if (this.elems.length >= 2) {
            if (this.elems.length > 2) {
                this.name = this.elems.slice(0,-1).join(this.separator).trimEnd();
                this.address = this.elems.slice(-1)[0].trim();
            }
            else {
                this.name = this.elems[0].trimEnd();
                this.address = this.elems[1].trim();
            }
            this.basename = Entry.trimTrailingParen(this.name);
            this.referredFrom = Entry.parseParen(this.name);
            this.isChild = Entry.isIndented(this.name);
        }
        if (this.elems[0]) {
            this.name = this.elems[0].trimEnd();
            this.basename = Entry.trimTrailingParen(this.name);
            this.referredFrom = Entry.parseParen(this.name);
            this.isChild = Entry.isIndented(this.name);
            const refElems = this.name.split("→").map(x => String(x).trim()).filter(Boolean);
            if (refElems.length > 1) {
                this.isReference = true;
                this.referTo = refElems.slice(-1)[0];
                this.basename = refElems[0];
            }
        }
    }


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

}


class EntryAddress {

    constructor(s) {
        const sanitized = EntryAddress.sanitize(s);
        this.rawElements = sanitized.split(",").map(x => x.trim()).filter(Boolean);
        this.nombres = [];
        this.parse();
    }

    static sanitize(s) {
        return s.replace(/\s/g, "").replace(/\uff0c/g, ",").replace(/[\u002d\u2010\u2011\u2012\u2013\u2014\uFF0D]/g, "-").replace(/\-+/g, "-").replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g, function(m) {
            return String.fromCharCode(m.charCodeAt(0) - 0xFEE0);
        });
    }

    static getPrefix(s) {
        if (s.match(/^[0-9]/)) {
            return "";
        }
        return s.split(/\d+/)[0];
    }

    static getSuffix(s) {
        if (s.match(/[0-9]$/)) {
            return "";
        }
        return s.split(/\d+/).slice(-1)[0];
    }

    static toNombre(s, hyphenated) {
        return {
            "display": {
                "text": s,
                "prefix": EntryAddress.getPrefix(s),
                "suffix": EntryAddress.getSuffix(s),
            },
            "intValue": Number(s.replace(/[^\d]/g, "")),
            "hyphenated": hyphenated
        };
    }

    parse() {
        this.rawElements.map(elem => {
            const nbr = String(elem);
            if (nbr.indexOf("-") != -1) {
                const [start, end, ...rest] = nbr.split("-");
                const s = EntryAddress.toNombre(start, false);
                const e = EntryAddress.toNombre(end, false);
                this.nombres.push(s);
                for (let i = s.intValue + 1; i < e.intValue; i++) {
                    const n = EntryAddress.toNombre(String(i), true);
                    this.nombres.push(n);
                }
                this.nombres.push(e);
            }
            else {
                this.nombres.push(EntryAddress.toNombre(nbr, false));
            }
        });
    }

    beginsConsecutiveTriplet(startIdx) {
        if (this.nombres.length - 3 < startIdx) {
            return false;
        }
        const focus = this.nombres[startIdx];
        const next1 = this.nombres[startIdx+1];
        const next2 = this.nombres[startIdx+2];
        if (focus.intValue+1 == next1.intValue && focus.intValue+2 == next2.intValue) {
            if (String(next1.display.text).match(/^\d+$/)) {
                return true;
            }
        }
        return false;
    }

    order() {
        const ns = this.nombres;
        this.nombres = ns.filter(x => x.display.text).sort((a, b) => a.intValue - b.intValue);
    }

    unify() {
        const ns = this.nombres;
        const stack = [];
        this.nombres = ns.filter(nbr => {
            if (stack.includes(nbr.display.text)) {
                return false;
            }
            stack.push(nbr.display.text);
            return true;
        });
    }

    hyphenate() {
        if (this.nombres.length < 3) {
            return;
        }
        const stack = [];
        stack.push({
            "item": this.nombres[0],
            "isHyphen": false
        });
        for (let i = 0; i < this.nombres.length - 2; i++) {
            const next = this.nombres[i+1];
            stack.push({
                "item": next,
                "isHyphen": this.beginsConsecutiveTriplet(i)
            });
        }
        stack.push({
            "item": this.nombres.slice(-1)[0],
            "isHyphen": false
        });
        this.nombres = stack.map(x => {
            if (x.isHyphen) {
                x.item.display.text = "\u2013";
            }
            return x.item;
        });
        return this.nombres;
    }

    formatAll() {
        this.order();
        this.unify();
        this.hyphenate();
        return this.nombres.map(p => p.display.text).join(", ").replace(/, (\u2013, )+/g, "\u2013");
    }

}
