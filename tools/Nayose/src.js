class Nayose {

    static parseLine(s, addressOnLeft = false) {
        const elems = s.split("\t").slice(0, 2).map(x => String(x).trim());
        if (elems.length < 2) {
            return {
                "Item": String(elems[0]),
                "Address": ""
            };
        }
        if (addressOnLeft) {
            elems.reverse()
        }
        return {
            "Item": String(elems[0]),
            "Address": String(elems[1])
        };
    }

    static nayose (lines, addressOnLeft = false) {
        const map = new Map()
        lines.filter(x => x.trim()).forEach(line => {
            const l = Nayose.parseLine(line, addressOnLeft);
            if (map.has(l.Item)) {
                const conc = map.get(l.Item) + ", " + l.Address;
                map.set(l.Item, conc);
            }
            else {
                map.set(l.Item, l.Address);
            }
        });
        const ret = [];
        map.forEach((addess, item) => {
            const parsed = new Address(addess);
            ret.push((item + "　　" + parsed.format()).trim());
        });
        return ret;
    }

    static nayoseByOrder(lines, addressOnLeft = false) {
        const netArr = lines.filter(x => x.trim());
        const stack = [];
        for (let i = 0; i < netArr.length; i++) {
            const l = Nayose.parseLine(netArr[i], addressOnLeft);
            if (i == 0) {
                stack.push({
                    "Item": l.Item,
                    "Address": l.Address
                });
                continue;
            }
            const lastIdx = stack.length - 1;
            if (l.Item == (stack[lastIdx]).Item) {
                const conc = (stack[lastIdx]).Address + ", " + l.Address;
                (stack[lastIdx]).Address = conc;
            }
            else {
                stack.push({
                    "Item": l.Item,
                    "Address": l.Address
                });
            }
        }

        return stack.map(pair => {
            const parsed = new Address(pair.Address);
            return (pair.Item + "　　" + parsed.format()).trim();
        });

    }

}