class NombreGroup {

    constructor(s) {
        this.parsed = new Nombre(s).parse();
    }

    static isConsecutive (a, b, c) {
        if (a.intValue+1 == b.intValue && a.intValue+2 == c.intValue) {
            if (String(b.display.text).match(/^\d+$/)) {
                return true;
            }
        }
        return false;
    }

    order() {
        this.parsed = this.parsed.filter(x => x.display.text).sort((a, b) => a.intValue - b.intValue);
    }

    unify() {
        const stack = [];
        this.parsed = this.parsed.filter(nombre => {
            if (stack.includes(nombre.display.text)) {
                return false;
            }
            stack.push(nombre.display.text);
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
            const current = this.parsed[i];
            const next1 = this.parsed[i+1];
            const next2 = this.parsed[i+2];
            stack.push({
                "item": next1,
                "isHyphen": NombreGroup.isConsecutive(current, next1, next2)
            });
        }
        stack.push({
            "item": this.parsed.slice(-1)[0],
            "isHyphen": false
        });
        this.parsed = stack.map(x => {
            if (x.isHyphen) {
                x.item.display.text = "\u2013";
            }
            return x.item;
        });
    }

    toString() {
        return this.parsed.map(p => p.display.text).join(", ").replace(/, (\u2013, )+/g, "\u2013");
    }

}

function parseLine(s, nombreOnLeft = false) {
    const arr = s.split("\t").slice(0, 2).map(x => String(x).trim());
    if (arr.length < 2) {
        return {
            "Item": String(arr[0]),
            "Nombre": ""
        };
    }
    if (nombreOnLeft) {
        arr.reverse()
    }
    return {
        "Item": String(arr[0]),
        "Nombre": String(arr[1])
    };
}

function nayose (lines, nombreOnLeft = false) {
    const map = new Map()
    lines.filter(x => x.trim()).forEach(line => {
        const l = parseLine(line, nombreOnLeft);
        if (map.has(l.Item)) {
            const conc = map.get(l.Item) + ", " + l.Nombre;
            map.set(l.Item, conc);
        }
        else {
            map.set(l.Item, l.Nombre);
        }
    });
    const ret = [];
    map.forEach((nombres, item) => {
        const parsed = new NombreGroup(nombres);
        parsed.order();
        parsed.unify();
        parsed.hyphenate();
        ret.push((item + "　　" + parsed.toString()).trim());
    });
    return ret;
}

function nayoseByOrder(lines, nombreOnLeft = false) {
    const netArr = lines.filter(x => x.trim());
    const stack = [];
    for (let i = 0; i < netArr.length; i++) {
        const l = parseLine(netArr[i], nombreOnLeft);
        if (i == 0) {
            stack.push({
                "Item": l.Item,
                "Nombres": l.Nombre
            });
            continue;
        }
        const lastIdx = stack.length - 1;
        if (l.Item == (stack[lastIdx]).Item) {
            const conc = (stack[lastIdx]).Nombres + ", " + l.Nombre;
            (stack[lastIdx]).Nombres = conc;
        }
        else {
            stack.push({
                "Item": l.Item,
                "Nombres": l.Nombre
            });
        }
    }

    return stack.map(pair => {
        const parsed = new NombreGroup(pair.Nombres);
        parsed.order();
        parsed.unify();
        parsed.hyphenate();
        return (pair.Item + "　　" + parsed.toString()).trim();
    });

}