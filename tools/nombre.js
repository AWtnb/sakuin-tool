class Nombre {

    constructor(s) {
        this.sanitized = Nombre.sanitize(s);
        this.Elements = this.sanitized.split(",").map(x => x.trim()).filter(Boolean);
    }

    parse() {
        /**
         * nombre: must be string sepatated by comma
         */
        const stack = [];
        this.Elements.map(s => {
            if (String(s).indexOf("-") != -1) {
                const [start, end, ...rest] = s.split("-");
                Nombre.parseRange(start, end).forEach(x => stack.push(x));
            }
            else {
                stack.push({
                    "display": {
                        "text": String(s),
                        "prefix": Nombre.getPrefix(s),
                        "suffix": Nombre.getSuffix(s),
                    },
                    "intValue": Number(s.replace(/[^\d]/g, "")),
                    "hyphenated": false
                });
            }
        });
        return stack;
    }

    static sanitize(s) {
        return s.replace(/\s/g, "").replace(/\uff0c/g, ",").replace(/[\u002d\u2010\u2011\u2012\u2013\u2014\uFF0D]/g, "-").replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(m) {
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
        const s = new Nombre(start).parse()[0];
        const e = new Nombre(end).parse()[0];
        range.push(s);
        for (let idx = s.intValue + 1; idx < e.intValue; idx++) {
            const p = new Nombre(String(idx)).parse()[0];
            p.hyphenated = true;
            range.push(p);
        }
        range.push(e);
        return range;
    }

}
