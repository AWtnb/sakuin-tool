function getMainEntries(lines) {
    return lines.filter(x => String(x).trim()).map(line => {
        const p = parseEntry(line);
        if (p.referTo.length < 1 && !p.isChild) {
            return {
                "name": p.name,
                "basename": p.basename
            };
        }
        return null;
    }).filter(Boolean);
}

function getRegexForChild(s, mode) {
    const escaped = escapeMeta(s);
    if (mode == "tail") {
        return new RegExp(`${escaped}$`);
    }
    if (mode == "head") {
        return new RegExp(`^${escaped}`);
    }
    return new RegExp(`^${escaped}|${escaped}$`);
}

function findPossibleChildItems(lines, mode = "tail") {
    const mainEntries = getMainEntries(lines);
    return mainEntries.map(entry => {
        const reg = getRegexForChild(entry.basename, mode);
        const grep = mainEntries.map(etr => etr.name).filter(line => line.match(reg));
        if (grep.length > 1) {
            const markup = grep.filter(line => (line != entry.name)).map(line => {
                return line.replace(reg, '<span class="match">$&</span>');
            }).map(line => `・${line}`);
            return {
                "Found": entry.name,
                "Markup": markup.join("<br>")
            };
        }
        return null;
    }).filter(Boolean).sort((a, b) => b.Found.length - a.Found.length);
}