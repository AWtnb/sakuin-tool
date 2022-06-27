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

    constructor(selector, mode = "tail") {
        this.lines = Util.getElemValueLines(selector);
        this.mode = mode;
        this.mainEntries = this.lines.filter(x => String(x).trim()).map(line => {
            const entry = new Entry(line);
            if (!entry.isReference && !entry.isChild) {
                return {
                    "name": entry.name,
                    "basename": entry.basename,
                    "subInfo": entry.name.slice(entry.basename.length)
                };
            }
            return null;
        }).filter(Boolean);
    }

    findPossibles() {
        return this.mainEntries.map(entry => {
            const search = entry.basename;
            const possibles = this.mainEntries.filter(entry => entry.basename != search).map(entry => {
                const markup = new ChildEntry(entry.basename);
                if (this.mode == "all" || this.mode == "head") {
                    markup.markupHead(search);
                }
                if (this.mode == "all" || this.mode == "tail") {
                    markup.markupTail(search);
                }
                if (entry.basename != markup.text) {
                    return markup.text + entry.subInfo;
                }
                return null;
            }).filter(Boolean);
            return {
                "parent": entry.name,
                "children": possibles
            };
        });
    }

    markup() {
        return this.findPossibles().filter(x => x.children.length > 0).sort((a, b) => b.parent.length - a.parent.length).map(x => {
            const detail = x.children.map(p => `<li>${p}</li>`).join("");
            return `<tr><td>${x.parent}</td><td><ul style="margin:0;padding-left:1em;">${detail}</ul></td></tr>`;
        });
    }

}
