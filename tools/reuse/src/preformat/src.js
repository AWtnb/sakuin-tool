const getAddress = (s) => {
    const m = String(s).match(/\d[\d,\u2013]*$/);
    if (m) {
        return m[0];
    }
    return "";
}

const BARS = ["\u2010", "\u2011", "\u2012", "\u2013", "\u2014", "\u2015", "\uFF0D", "\u2500", "\u002d"];

const trimAddress = (s) => {
    let fmt = s.split(",")[0];
    fmt = fmt.replace(/\d+$/, "");
    if (BARS.includes(fmt.at(-1)) && fmt.at(-2).match(/\d/)) {
        fmt = fmt.replace(/.$/, "");
        fmt = fmt.replace(/\d+$/, "");
    }
    return fmt;
}

class BarHandler {
    constructor(s) {
        this.valiation = BARS;
        this.rawStr = s;
    }
    format(to="\u2013") {
        let fmt = this.rawStr;
        this.valiation.forEach(b => {
            fmt = fmt.replaceAll(b, "\u002d");
        });
        return fmt.replace(/\u002d+/g, to);
    }
    getHeaderLen() {
        let len = 0;
        for (let i = 0; i < this.rawStr.length; i++) {
            if (this.valiation.includes(this.rawStr[i])) {
                len += 1;
            }
            else {
                break;
            }
        }
        return len;
    }
    getTrailerLen() {
        let len = 0;
        for (let i = this.rawStr.length - 1; 0 <= i; i--) {
            if (this.valiation.includes(this.rawStr[i])) {
                len += 1;
            }
            else {
                break;
            }
        }
        return len;
    }
    formatChildEntry() {
        const hLen = this.getHeaderLen();
        const prefix = (hLen > 0)? "\u2015\u2015" : "";
        const tLen = this.getTrailerLen();
        const suffix = (tLen > 0)? "\u2015\u2015" : "";
        return prefix + this.rawStr.slice(hLen, this.rawStr.length - tLen) + suffix;
    }
}


export class IndexLine {

    constructor(s) {
        this.prefix = (s.startsWith(" ") || s.startsWith("\u3000"))? "\u3000" : "";
        const pureStr = String(s).replace(/\uff0c/g, ",").replace(/\s+/g, "");
        const adr = getAddress(new BarHandler(pureStr).format());
        if (adr.length > 0) {
            this.address = adr.replaceAll(",", ", ");
            this.name = trimAddress(pureStr);
            return;
        }

        this.address = "";
        if (pureStr.indexOf("→") != -1) {
            this.name = pureStr.replace(/→/, "\u3000→");
            return;
        }
        this.name = pureStr;

    }

    getFormattedLine() {
        const name = this.prefix + (new BarHandler(this.name).formatChildEntry());
        if (this.address.length > 0) {
            return (name + "\u3000\u3000" + this.address);
        }
        return name;
    }

}
