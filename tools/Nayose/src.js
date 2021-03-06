function hasNaN(array) {
    const reg = new RegExp(/[^\d]/)
    return reg.test(array.join(""))
}

function hyphenateConsecutive (inputArray) {
    if (inputArray.length < 3) {
        return inputArray
    }
    const stack = [];
    stack.push({
        Item: inputArray[0],
        Hyphenate: false
    });
    for (let i = 0; i <= inputArray.length - 3; i++) {
        const [current, next1, next2] = inputArray.slice(i, i+3);
        const isConsecutive = (hasNaN(inputArray.slice(i, i+3)))?
            false :
            (Number(current)+1 == next1 && Number(current)+2 == next2)
        stack.push({
            Item: next1,
            Hyphenate: isConsecutive
        });
    }
    stack.push({
        Item: inputArray[inputArray.length - 1],
        Hyphenate: false
    });
    const nombres = stack.map(x => ((x.Hyphenate)? "-" : x.Item));
    return Array.from(new Set(nombres))
}

function asNumber(s) {
    return Number(toHankaku(s.replace(/[^[0-9０-９]/g, "")))
}

function nayose (lines, nombreOnLeft = false) {
    const map = new Map()
    const lineArray = lines.split(/[\r\n]+/g);
    // 集約
    lineArray.filter(line => line).filter(line => !line.match(/^\s+$/)).forEach(line => {
        const [item, nombre, ...rest] = (nombreOnLeft)? line.split("\t").slice(0, 2).reverse() : line.split("\t");
        if (map.has(item)) {
            map.get(item).push(nombre);
        }
        else {
            map.set(item, [nombre]);
        }
    });

    // 整形
    const ret = [];
    map.forEach((v, k) => {
        const sorted = v.filter(x => x).sort((a, b) => asNumber(a) - asNumber(b));
        const uniq = Array.from(new Set(sorted));
        if (uniq.length < 1) {
            ret.push(k);
        }
        else {
            const hyphenated = hyphenateConsecutive(uniq);
            ret.push(k + "　　" + hyphenated.join(", ").replace(", -, ", "-"));
        }
    })
    return ret;
}

function nayoseFromTop(lines, nombreOnLeft = false) {
    const lineArray = lines.split(/[\r\n]+/g).filter(line => line).filter(line => !line.match(/^\s+$/));
    const stack = [];
    for (let i = 0; i < lineArray.length; i++) {
        const line = lineArray[i];
        const [item, nombre, ...rest] = (nombreOnLeft)? line.split("\t").slice(0, 2).reverse() : line.split("\t");
        if (i == 0) {
            stack.push([item, [nombre]]);
            continue;
        }
        const lastIdx = stack.length - 1;
        if (item == stack[lastIdx][0]) {
            stack[lastIdx][1].push(nombre);
            continue;
        }
        stack.push([item, [nombre]]);
    }

    return stack.map(pair => {
        const [item, nombreArray] = pair;
        const sorted = nombreArray.filter(x => x).sort((a, b) => asNumber(a) - asNumber(b));
        const uniq = Array.from(new Set(sorted));
        if (uniq.length < 1) {
            return item;
        }
        const hyphenated = hyphenateConsecutive(uniq);
        return (item + "　　" + hyphenated.join(", ").replace(", -, ", "-"));
    });

}