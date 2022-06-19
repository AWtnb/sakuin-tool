class Nayose {

    static parseLine(s, nombreOnLeft = false) {
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

    static nayose (lines, nombreOnLeft = false) {
        const map = new Map()
        lines.filter(x => x.trim()).forEach(line => {
            const l = Nayose.parseLine(line, nombreOnLeft);
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
            const parsed = new Address(nombres);
            ret.push((item + "　　" + parsed.format()).trim());
        });
        return ret;
    }

    static nayoseByOrder(lines, nombreOnLeft = false) {
        const netArr = lines.filter(x => x.trim());
        const stack = [];
        for (let i = 0; i < netArr.length; i++) {
            const l = Nayose.parseLine(netArr[i], nombreOnLeft);
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
            const parsed = new Address(pair.Nombres);
            return (pair.Item + "　　" + parsed.format()).trim();
        });

    }

}