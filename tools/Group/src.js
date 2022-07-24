import {EntryAddress} from "../common.js"

export class Grouper {

    constructor(lines, addressOnLeft = false) {
        this.linesParsed = lines.filter(line => line.trim()).map(line => {
            const elems = line.split("\t").slice(0, 2);
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
        });
        this.groupedLines = [];
    }

    group() {
        const map = new Map()
        this.linesParsed.forEach(lp => {
            if (map.has(lp.Item)) {
                const concAddress = map.get(lp.Item) + ", " + lp.Address;
                map.set(lp.Item, concAddress);
            }
            else {
                map.set(lp.Item, lp.Address);
            }
        });
        map.forEach((addess, item) => {
            const parsed = new EntryAddress(addess);
            this.groupedLines.push((item + "\u3000\u3000" + parsed.formatAll()).trimEnd());
        });
    }

    groupByOrder() {
        const stack = [];
        for (let i = 0; i < this.linesParsed.length; i++) {
            const lp = this.linesParsed[i];
            if (i == 0) {
                stack.push({
                    "Item": lp.Item,
                    "Address": lp.Address
                });
                continue;
            }
            const lastIdx = stack.length - 1;
            if (lp.Item == (stack[lastIdx]).Item) {
                const concAddress = (stack[lastIdx]).Address + ", " + lp.Address;
                (stack[lastIdx]).Address = concAddress;
            }
            else {
                stack.push({
                    "Item": lp.Item,
                    "Address": lp.Address
                });
            }
        }
        this.groupedLines = stack.map(pair => {
            const parsed = new EntryAddress(pair.Address);
            return (pair.Item + "\u3000\u3000" + parsed.formatAll()).trimEnd();
        });
    }

    getGroupedLines(byOrder=false) {
        if (byOrder) {
            this.groupByOrder();
        }
        else {
            this.group();
        }
        return this.groupedLines;
    }

}