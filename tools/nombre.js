class Nombre {

    static get connectors() {
        return [
            "\u002d",
            "\u2010",
            "\u2011",
            "\u2012",
            "\u2013",
            "\u2014",
            "\uFF0D"
        ];
    }

    static arrayByComma(s) {
        return s.replace(/，/g, ",").split(",").map(x => x.trim()).filter(Boolean);
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
        const barsReg = new RegExp(`\\s*[${this.connectors.join("")}]+\\s*`);
        this.arrayByComma(nombre).map(nStr => {
            const s = this.removeFullWidth(nStr);
            if (s.match(barsReg)) {
                const [start, end] = s.split(barsReg);
                this.rangedNombres(start, end).forEach(x => stack.push(x));
            }
            else {
                const prefix = s.split(/\d+/)[0];
                const suffix = s.split(/\d+/).slice(-1)[0];
                stack.push({
                    "display": {
                        "text": s,
                        "prefix": prefix,
                        "suffix": suffix,
                    },
                    "intValue": Number(s.replace(/[^\d]/g, "")),
                    "hyphenated": false
                });
            }
        });
        return stack;
    }

    static rangedNombres(start, end) {
        const range = [];
        const s = this.parse(start)[0];
        const e = this.parse(end)[0];
        range.push(s);
        for (let idx = s.intValue + 1; idx < e.intValue; idx++) {
            const p = this.parse(String(idx))[0];
            p.hyphenated = true;
            range.push(p);
        }
        range.push(e);
        return range;
    }

    static isConsecutive (a, b, c) {
        if (a.intValue+1 == b.intValue && a.intValue+2 == c.intValue) {
            if (!isNaN(b.display.text)) {
                return true;
            }
        }
        return false;
    }

}
