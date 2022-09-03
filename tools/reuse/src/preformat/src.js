import {Entry} from "../../../../assets/common.js";

const bars = ["\u2010", "\u2011", "\u2012", "\u2013", "\u2014", "\u2015", "\uFF0D", "\u2500", "\u002d"];
const barsPattern = `[${bars.join("")}]`;

export class IndexLine {

    constructor(s) {
        this.text = String(s);
        this.text = this.text.replace(/\s+→/g, "\u3000→"); // 矢印の前は1倍アキに

        const entry = new Entry(this.text);

        if (entry.isChild) {
            const reg = new RegExp(`^${barsPattern}+|${barsPattern}+$`);
            this.name = "\u3000" + entry.name.trim().replace(reg, "\u2015\u2015");
        }
        else {
            this.name = entry.name;
        }

        const reg = new RegExp(`${barsPattern}+`, "g");
        this.address = entry.address.replace(reg, "\u2013");
    }

    getFormattedLine() {
        if (this.address.length > 0) {
            return (this.name + "\u3000\u3000" + this.address);
        }
        return this.name;
    }

}
