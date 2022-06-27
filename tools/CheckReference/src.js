import {Util, Entry} from "../common.js";

export class ReferenceChecker {

    constructor(selector) {
        const lines = Util.getElemValueLines(selector);
        this.entries = lines.filter(x => String(x).trim()).map(line => new Entry(line));
    }

    goalLostReference() {
        // 見よ項目があるのに参照先に括弧で付記されていないものを探す
        return this.entries.filter(entry => entry.isReference).map(entry => {
            return {
                "text": entry.name,
                "refEntryName": entry.basename,
                "referTo": entry.referTo
            };
        }).map(line => {
            const grep = this.entries.filter(entry => {
                return (!entry.isReference && entry.basename == line.referTo && entry.referredFrom.includes(line.refEntryName));
            });
            if (grep.length > 0) {
                return null;
            }
            const require = `${line.referTo}\uff08${line.refEntryName}\uff09`;
            return `<u>${line.text}</u><ul><li><mark>${require}</mark></li></ul>`;
        }).filter(Boolean);
    }

    requiredFromReference() {
        // 参照元として括弧書きされているのに見よ項目がないものを探す
        const refs = this.entries.filter(entry => entry.isReference);
        return this.entries.filter(entry => entry.referredFrom.length > 0).map(entry => {
            return {
                "text": entry.name,
                "referredFrom": entry.referredFrom,
                "basename": entry.basename
            };
        }).map(line => {
            const required = line.referredFrom.filter(s => {
                const correctRefs = refs.filter(entry => entry.basename == s && entry.referTo == line.basename);
                return (correctRefs.length < 1);
            });
            if (required.length < 1) {
                return null;
            }
            const require = required.map(s => `<li><mark>${s}\u3000→${line.basename}</mark></li>`).join("");
            return `<u>${line.text}</u><ul>${require}</ul>`;
        }).filter(Boolean);
    }

    findAdjacent() {
        // 見よ項目と見よ先項目が隣接しているものを探す
        return this.entries.map((entry, idx) => {
            if (!entry.isReference) {
                return null;
            }
            const previous = this.entries[idx - 1];
            if (previous && !previous.isReference && previous.referredFrom.includes(entry.basename)) {
                return entry;
            }
            const next = this.entries[idx + 1];
            if (next && !next.isReference && next.referredFrom.includes(entry.basename)) {
                return entry;
            }
            return null;
        }).filter(Boolean).map(entry => `<u>${entry.name}</u>`);
    }

    static showResult(arr, heading) {
        return `<h4>${heading}</h4><ul>${arr.map(x => `<li>${x}</li>`).join("")}</ul>`;
    }

}