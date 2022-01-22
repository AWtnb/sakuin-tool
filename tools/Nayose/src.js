
function isConsecutive (a, b, c) {
    if(a.match(/[^\d]/) || b.match(/[^\d]/) || c.match(/[^\d]/)) {
        return false;
    }
    return (Number(a)+1 == b && Number(a)+2 == c);
}

function hyphenateConsecutive (inputArray) {
    if (inputArray.length < 3) {
        return inputArray.join(", ");
    }
    const stack = [];
    stack.push({
        Item: inputArray[0],
        Hyphenate: false
    });
    for (let i = 0; i <= inputArray.length - 3; i++) {
        const [current, next1, next2] = inputArray.slice(i, i+3);
        stack.push({
            "Item": next1,
            "Hyphenate": isConsecutive(current, next1, next2)
        });
    }
    stack.push({
        "Item": inputArray[inputArray.length - 1],
        "Hyphenate": false
    });
    const nombres = stack.map(x => {
        if (x.Hyphenate) {
            return "\u2013";
        }
        return x.Item;
    });
    return nombres.join(", ").replace(/, (\u2013, )+/g, "\u2013");
}

function parseLine(s, nombreOnLeft = false) {
    const arr = s.split("\t").slice(0, 2);
    if (arr.length < 2) {
        return {
            "Item": String(arr[0]).trim(),
            "Nombre": ""
        };
    }
    if (nombreOnLeft) {
        arr.reverse()
    }
    return {
        "Item": String(arr[0]).trim(),
        "Nombre": String(arr[1]).trim()
    };
}

function asNumber(s) {
    return Number(toHalfWidth(s.replace(/[^[0-9０-９]/g, "")));
}

function uniqueOrdered(arr) {
    const sorted = arr.filter(x => x).sort((a, b) => asNumber(a) - asNumber(b));
    return Array.from(new Set(sorted));
}

function nayose (lines, nombreOnLeft = false) {
    const map = new Map()
    lines.filter(Boolean).filter(line => line.replace(/\s/g, "")).forEach(line => {
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
        const parsed = new Nombre(nombres);
        parsed.order();
        parsed.unique();
        parsed.hyphenate();
        ret.push((item + "　　" + parsed.toString()).trim());
    })
    return ret;
}

function nayoseByOrder(lines, nombreOnLeft = false) {
    const netArr = lines.filter(line => line).filter(line => !line.match(/^\s+$/));
    const stack = [];
    for (let i = 0; i < netArr.length; i++) {
        const l = parseLine(netArr[i], nombreOnLeft);
        if (i == 0) {
            stack.push({
                "Item": l.Item,
                "Nombres": [l.Nombre]
            });
            continue;
        }
        const lastIdx = stack.length - 1;
        if (l.Item == (stack[lastIdx]).Item) {
            (stack[lastIdx]).Nombres.push(l.Nombre);
        }
        else {
            stack.push({
                "Item": l.Item,
                "Nombres": [l.Nombre]
            });
        }
    }

    return stack.map(pair => {
        const uniq = uniqueOrdered(pair.Nombres);
        if (uniq.length < 1) {
            return pair.Item;
        }
        const hyphenated = hyphenateConsecutive(uniq);
        return (pair.Item + "　　" + hyphenated);
    });

}