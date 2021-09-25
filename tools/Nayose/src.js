
function isConsecutive (a, b, c) {
    if(/[^\d]/.test(a) || /[^\d]/.test(b) || /[^\d]/.test(c)) {
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
            Item: next1,
            Hyphenate: isConsecutive(current, next1, next2)
        });
    }
    stack.push({
        Item: inputArray[inputArray.length - 1],
        Hyphenate: false
    });
    const nombres = stack.map(x => ((x.Hyphenate)? "-" : x.Item));
    return nombres.reduce((acc, cur) => {
        if (acc.endsWith(cur)) {
            return acc;
        }
        if (cur == "-" || acc.endsWith("-")) {
            return acc + cur;
        }
        return acc + ", " + cur;
    });
}

function parseLine(s, nombreOnLeft = false) {
    const arr = s.split("\t").slice(0, 2);
    if (arr.length < 2) {
        return {
            "Item": arr[0],
            "Nombre": ""
        };
    }
    if (nombreOnLeft) {
        arr.reverse()
    }
    return {
        "Item": arr[0],
        "Nombre": arr[1]
    };
}

function asNumber(s) {
    return Number(toHankaku(s.replace(/[^[0-9０-９]/g, "")))
}

function uniqueOrdered(arr) {
    const sorted = arr.filter(x => x).sort((a, b) => asNumber(a) - asNumber(b));
    return Array.from(new Set(sorted));
}

function nayose (lines, nombreOnLeft = false) {
    const map = new Map()
    lines.filter(line => line).filter(line => !line.match(/^\s+$/)).forEach(line => {
        const l = parseLine(line, nombreOnLeft);
        if (!map.has(l.Item)) {
            map.set(l.Item, [l.Nombre]);
        }
        else {
            map.get(l.Item).push(l.Nombre);
        }
    });
    const ret = [];
    map.forEach((nombres, item) => {
        const uniq = uniqueOrdered(nombres);
        if (uniq.length < 1) {
            ret.push(item);
        }
        else {
            const hyphenated = hyphenateConsecutive(uniq);
            ret.push(item + "　　" + hyphenated);
        }
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