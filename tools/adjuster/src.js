import {Util, Entry, EntryAddress} from "../../assets/common.js";

export class NombreAdjuster {
    constructor(start, end, delta) {
        this.start = start;
        this.end = end;
        this.delta = delta;
    }
    exec(target) {
        if (Number(this.start) <= target.intValue && target.intValue <= Number(this.end)) {
            return (target.display.prefix + (target.intValue + Number(this.delta)) + target.display.suffix);
        }
        return target.display.text;
    }
}

export class EntryLine {
    constructor(line, adjuster) {
        const entry = new Entry(line);
        this.name = entry.name;
        this.originalNombres = EntryAddress.sanitize(entry.address).split(",").map(x => x.trim()).filter(Boolean);
        this.adjustedNombres = this.originalNombres.map(nombre => {
            const parsed = new EntryAddress(nombre).nombres;
            if (parsed.length > 1) {
                // 範囲指定のノンブルだった場合
                return adjuster.exec(parsed[0]) + "\u2013" + adjuster.exec(parsed.at(-1));
            }
            return adjuster.exec(parsed[0]);
        });
    }

    compareAddress() {
        const stack = [];
        let modified = false;
        this.originalNombres.forEach((nombre, idx) => {
            if (Util.stripNAN(nombre) != Util.stripNAN(this.adjustedNombres[idx])) {
                modified = true;
                stack.push({
                    "text": this.adjustedNombres[idx],
                    "before": nombre,
                    "color": "#ff0080"
                });
            }
            else {
                stack.push({
                    "text": nombre,
                    "before": "",
                    "color": "#333"
                });
            }
        });
        return {
            "modified": modified,
            "detail": stack
        };
    }

}