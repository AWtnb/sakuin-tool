function getIndexItems(lines) {
    const nonReferenceItems = lines.filter(line => line.indexOf("→") == -1);
    return nonReferenceItems.filter(Boolean).filter(line => !line.match(/^　/)).map(line => parseEntry(line).name);
}

// function isChild(s, search, mode) {
//     if (String(s).startsWith(search) || String(s).endsWith(search)) {
//         if (mode == "head" && !String(s).startsWith(search)) {
//             return false;
//         }
//         if (mode == "tail" && !String(s).endsWith(search)) {
//             return false;
//         }
//         return true;
//     }
//     return false;
// }

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
    const indexItems = getIndexItems(lines);
    return indexItems.map(item => {
        const baseName = item.replace(/（.*?）|［.*?］/g, "");
        const reg = getRegexForChild(baseName, mode);
        const grep = indexItems.filter(line => line.match(reg));
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
    }).filter(x => x).sort((a, b) => b.Found.length - a.Found.length);
}