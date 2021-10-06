function getIndexItems(lines) {
    const nonMiyoItems = lines.filter(line => !line.match(/→/g));
    return nonMiyoItems.filter(line => line).filter(line => !line.match(/^　/g)).map(line => line.replace(/　　\d.*$/g, "")).sort((a, b) => b.length - a.length);
}

function getRegexForChild(s, mode) {
    const escaped = escapeMeta(s);
    if (mode == "tail") {
        return new RegExp(`${escaped}$`, "g");
    }
    if (mode == "head") {
        return new RegExp(`^${escaped}`, "g");
    }
    return new RegExp(`^${escaped}|${escaped}$`, "g");
}

function findPossibleChildItems(lines, mode = "tail") {
    const indexItems = getIndexItems(lines);
    return indexItems.map(item => {
        const baseName = item.replace(/（.*?）|［.*?］/g, "");
        const reg = getRegexForChild(baseName, mode);
        const grep = indexItems.filter(line => reg.test(line));
        if (grep.length > 1) {
            const markup = grep.filter(line => (line != item)).map(line => {
                return line.replace(reg, '<span class="match">$&</span>');
            }).map(line => `・${line}`);
            return {
                "Found": item,
                "Markup": markup.join("<br>")
            };
        }
        return null;
    }).filter(x => x);
}