
function parseLine(s, nombreOnLeft = false) {
    const arr = s.split("\t").slice(0, 2).map(x => String(x).trim());
    if (arr.length < 2) {
        return {
            "item": String(arr[0]),
            "nombre": ""
        };
    }
    if (nombreOnLeft) {
        arr.reverse()
    }
    return {
        "item": String(arr[0]),
        "nombre": String(arr[1])
    };
}

function nayose (lines, nombreOnLeft = false) {
    const map = new Map()
    lines.filter(x => x.trim()).forEach(line => {
        const l = parseLine(line, nombreOnLeft);
        if (map.has(l.item)) {
            const conc = map.get(l.item) + ", " + l.nombre;
            map.set(l.item, conc);
        }
        else {
            map.set(l.item, l.nombre);
        }
    });
    const ret = [];
    map.forEach((nombres, item) => {
        const parsed = new Nombre(nombres);
        parsed.order();
        parsed.unique();
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
                "item": l.item,
                "Nombres": l.nombre
            });
            continue;
        }
        const lastIdx = stack.length - 1;
        if (l.item == (stack[lastIdx]).item) {
            const conc = (stack[lastIdx]).Nombres + ", " + l.nombre;
            (stack[lastIdx]).Nombres = conc;
        }
        else {
            stack.push({
                "item": l.item,
                "Nombres": l.nombre
            });
        }
    }

    return stack.map(pair => {
        const parsed = new Nombre(pair.Nombres);
        parsed.order();
        parsed.unique();
        parsed.hyphenate();
        return (pair.item + "　　" + parsed.toString()).trim();
    });

}