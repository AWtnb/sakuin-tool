import {Entry} from "../../../../assets/common.js";

const bars = ["\u2010", "\u2011", "\u2012", "\u2013", "\u2014", "\u2015", "\uFF0D", "\u2500", "\u002d"];
const barsPattern = `[${bars.join("")}]`;

export class IndexLine {

    constructor(s) {
        this.text = String(s);
        this.formatSpace();

        const entry = new Entry(this.text);

        if (entry.isChild) {
            const reg = new RegExp(`^${barsPattern}+|${barsPattern}+$`);
            this.name = "\u3000" + entry.name.trim().replace(reg, "――");
        }
        else {
            this.name = entry.name;
        }

        const reg = new RegExp(`${barsPattern}+`, "g");
        this.address = entry.address.replace(reg, "\u2013");
    }

    formatSpace() {
        const origin = this.text;
        this.text = this.text.replace(/\u3000/g, "\u3000\u3000").replace(/\u3000+/g, "\u3000\u3000"); // 全部2倍アキに
        this.text = this.text.replace(/\u3000\u3000→/g, "\u3000→"); // 矢印の後は1倍アキに
        this.text = this.text.replace(/(?<=.{2,})\u3000\u3000(?!\d)/, "\u3000"); // 項目3文字目以降にあるアキは1倍（例：イドラッ　蘇倶　　12）
        this.text = this.text.replace(/\u3000\u3000(?!\d)/g, ""); // 残っている2倍アキは不要
        if (origin.startsWith("\u3000") || origin.startsWith(" ")) {
            this.text = "\u3000" + this.text.trim();
        }
    }

    getFormattedLine() {
        return (this.name + "\u3000\u3000" + this.address).trimEnd();
    }

}
