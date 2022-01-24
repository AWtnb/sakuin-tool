class NombreParser {

    static get barsReg() {
        return new RegExp("\s*[\u002d\u2010\u2011\u2012\u2013\u2014\uFF0D]+\s*");
    }

    static arrayByComma(s) {
        return s.replace(/，/g, ",").split(",");
    }

    static removeFullWidth(s) {
        return s.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(m) {
            return String.fromCharCode(m.charCodeAt(0) - 0xFEE0);
        });
    }

    static parse(nombre) {
        /**
         * nombre: must be string sepatated by comma
         */
        const stack = [];
        this.arrayByComma(nombre).map(nStr => {
            const s = this.removeFullWidth(nStr).trim();
            if (s.match(this.barsReg)) {
                const [start, end] = s.split(this.barsReg);
                this.rangedNombres(start, end).forEach(x => stack.push(x));
            }
            else {
                stack.push({
                    "display": s,
                    "intValue": Number(s.replace(/[^\d]/g, "")),
                    "hyphenated": false
                });
            }
        });
        return stack;
    }

    static rangedNombres(start, end) {
        const range = [];
        const s = this.parse(start);
        const e = this.parse(end);
        range.push(s[0]);
        for (let idx = s[0].intValue + 1; idx < e[0].intValue; idx++) {
            const p = this.parse(String(idx))[0];
            p.hyphenated = true;
            range.push(p);
        }
        range.push(e[0]);
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
