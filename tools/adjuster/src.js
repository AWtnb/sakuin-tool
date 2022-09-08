import {Entry, AddressHandler} from "../../assets/common.js";

const pruneNaN = (s) =>  {
    if (isNaN(Number(s))) {
        return s.replace(/[^\d]/g, "");
    }
    return s;
}

const compareNombres = (nombresA, nombresB) => {
    const detail = nombresA.map((nbrA, idx) => {
        const nbrB = nombresB[idx];
        if (pruneNaN(nbrA) != pruneNaN(nbrB)) {
            return {
                "text": nbrB,
                "before": nbrA,
                "color": "#ff0080"
            };
        }
        return {
            "text": nbrA,
            "before": "",
            "color": "#333"
        };
    });
    return {
        "modified": detail.some(x => x.before.length > 0),
        "detail": detail
    };
}

export class EntryLines {
    constructor(start, end, delta) {
        this.start = start;
        this.end = end;
        this.delta = delta;
    }

    adjust(entry) {
        if (Number(this.start) <= entry.intValue && entry.intValue <= Number(this.end)) {
            return (entry.display.prefix + (entry.intValue + Number(this.delta)) + entry.display.suffix);
        }
        return entry.display.text;
    }

    load(lines) {
        return lines.map(line => {
            const entry = new Entry(line);
            const orgNombres = new AddressHandler(entry.address).rawElements;
            const newNombres = orgNombres.map(orgNbr => {
                const parsed = new AddressHandler(orgNbr).nombres;
                if (parsed.length > 1) { // 範囲指定のノンブルだった場合
                    return this.adjust(parsed[0]) + "\u2013" + this.adjust(parsed.at(-1));
                }
                return this.adjust(parsed[0]);
            });
            return {
                "name": entry.name,
                "newNombres": newNombres,
                "comparison": compareNombres(orgNombres, newNombres)
            };
        });
    }

}
