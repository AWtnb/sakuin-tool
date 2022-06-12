class NombreParser {

    static parse(s) {
        const stack = [];
        s.split(",").map(x => x.trim()).filter(Boolean).map(nombre => {
            const nStr = String(nombre);
            if (nStr.indexOf("-") != -1) {
                const [start, end, ...rest] = nStr.split("-");
                NombreParser.parseRange(start, end).forEach(x => stack.push(x));
            }
            else {
                stack.push({
                    "display": {
                        "text": nStr,
                        "prefix": NombreParser.getPrefix(nStr),
                        "suffix": NombreParser.getSuffix(nStr),
                    },
                    "intValue": Number(nStr.replace(/[^\d]/g, "")),
                    "hyphenated": false,
                });
            }
        });
        return stack;
    }

    static sanitize(s) {
        return s.replace(/\s/g, "").replace(/\uff0c/g, ",").replace(/[\u002d\u2010\u2011\u2012\u2013\u2014\uFF0D]/g, "-").replace(/\-+/g, "-").replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(m) {
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

    static parseRange(start, end) {
        const range = [];
        const s = NombreParser.parse(String(start))[0];
        const e = NombreParser.parse(String(end))[0];
        range.push(s);
        for (let idx = s.intValue + 1; idx < e.intValue; idx++) {
            const p = NombreParser.parse(String(idx))[0];
            p.hyphenated = true;
            range.push(p);
        }
        range.push(e);
        return range;
    }

}

class Nombre {

    constructor(s) {
        const sanitized = NombreParser.sanitize(s);
        this.RawElements = sanitized.split(",").map(x => x.trim()).filter(Boolean);
        this.Parsed = NombreParser.parse(sanitized);
    }

    isConsecutiveTriplet(startIdx) {
        if (this.Parsed.length - 3 < startIdx) {
            return false;
        }
        const current = this.Parsed[startIdx];
        const next1 = this.Parsed[startIdx+1];
        const next2 = this.Parsed[startIdx+2];
        if (current.intValue+1 == next1.intValue && current.intValue+2 == next2.intValue) {
            if (String(next1.display.text).match(/^\d+$/)) {
                return true;
            }
        }
        return false;
    }

    order() {
        const p = this.Parsed;
        this.Parsed = p.filter(x => x.display.text).sort((a, b) => a.intValue - b.intValue);
        return this.Parsed;
    }

    unify() {
        const p = this.Parsed;
        const stack = [];
        this.Parsed = p.filter(nombre => {
            if (stack.includes(nombre.display.text)) {
                return false;
            }
            stack.push(nombre.display.text);
            return true;
        });
        return this.Parsed;
    }

    hyphenate() {
        if (this.Parsed.length < 3) {
            return;
        }
        const stack = [];
        stack.push({
            "item": this.Parsed[0],
            "isHyphen": false
        });
        for (let i = 0; i < this.Parsed.length - 2; i++) {
            const next = this.Parsed[i+1];
            stack.push({
                "item": next,
                "isHyphen": this.isConsecutiveTriplet(i)
            });
        }
        stack.push({
            "item": this.Parsed.slice(-1)[0],
            "isHyphen": false
        });
        this.Parsed = stack.map(x => {
            if (x.isHyphen) {
                x.item.display.text = "\u2013";
            }
            return x.item;
        });
        return this.Parsed;
    }

    format() {
        this.order();
        this.unify();
        this.hyphenate();
        return this.Parsed.map(p => p.display.text).join(", ").replace(/, (\u2013, )+/g, "\u2013");
    }

}

