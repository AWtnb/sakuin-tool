class Nayose {

    static parseLine(s, addressOnLeft = false) {
        const elems = s.split("\t").slice(0, 2);
        if (elems.length < 2) {
            return {
                "Item": String(elems[0]).trimEnd(),
                "Address": ""
            };
        }
        if (addressOnLeft) {
            elems.reverse()
        }
        return {
            "Item": String(elems[0]).trimEnd(),
            "Address": String(elems[1]).trim()
        };
    }

    static nayose (lines, addressOnLeft = false) {
        const map = new Map()
        lines.filter(x => x.trim()).forEach(line => {
            const l = Nayose.parseLine(line, addressOnLeft);
            if (map.has(l.Item)) {
                const concAddress = map.get(l.Item) + ", " + l.Address;
                map.set(l.Item, concAddress);
            }
            else {
                map.set(l.Item, l.Address);
            }
        });
        const ret = [];
        map.forEach((addess, item) => {
            const parsed = new EntryAddress(addess);
            ret.push((item + "\u3000\u3000" + parsed.formatAll()).trimEnd());
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
                const concAddress = (stack[lastIdx]).Address + ", " + l.Address;
                (stack[lastIdx]).Address = concAddress;
            }
            else {
                stack.push({
                    "Item": l.Item,
                    "Address": l.Address
                });
            }
        }

        return stack.map(pair => {
            const parsed = new EntryAddress(pair.Address);
            return (pair.Item + "\u3000\u3000" + parsed.formatAll()).trimEnd();
        });

    }

}