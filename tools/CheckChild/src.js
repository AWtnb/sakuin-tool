import {Util, Entry} from "../common.js";

class ChildEntry {
    constructor(s) {
        this.text = s;
    }
    markupHead(target) {
        if (this.text.startsWith(target)) {
            this.text = `<mark>${target}</mark>` + this.text.slice(target.length);
        }
    }
    markupTail(target) {
        if (this.text.endsWith(target)) {
            this.text = this.text.slice(0, 0 - target.length) + `<mark>${target}</mark>`;
        }
    }
}

export class CheckChild {

    static getMainEntries(lines) {
        return lines.filter(x => String(x).trim()).map(line => {
            const p = new Entry(line);
            if (!p.isReference && !p.isChild) {
                return {
                    "name": p.name,
                    "basename": p.basename,
                    "subInfo": p.name.slice(p.basename.length)
                };
            }
            return null;
        }).filter(Boolean);
    }

    static findPossibles(selector, mode = "tail") {
        const lines = Util.getElemValueLines(selector);
        const mainEntries = CheckChild.getMainEntries(lines);
        return mainEntries.map(entry => {
            const search = entry.basename;
            const possibles = mainEntries.filter(entry => entry.basename != search).map(entry => {
                const markup = new ChildEntry(entry.basename);
                if (mode == "all" || mode == "head") {
                    markup.markupHead(search);
                }
                if (mode == "all" || mode == "tail") {
                    markup.markupTail(search);
                }
                return {
                    "Markup": markup.text + entry.subInfo,
                    "Changed": entry.basename != markup.text
                }
            }).filter(x => x.Changed);
            return {
                "Found": entry.name,
                "Possibles": possibles
            }
        }).filter(x => {
            return x.Possibles.length > 0
        }).sort((a, b) => b.Found.length - a.Found.length).map(x => {
            const detail = x.Possibles.map(p => "・" + p.Markup).join("<br>");
            return `<tr><td>${x.Found}</td><td>${detail}</td></tr>`;
        });
    }

}
