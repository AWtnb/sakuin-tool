function getMainEntries(lines) {
    return lines.filter(x => String(x).trim()).map(line => {
        const p = parseEntry(line);
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

function markupHead(line, search) {
    if (line.startsWith(search)) {
        return `<span class="match">${search}</span>` + line.slice(search.length);
    }
    return line;
}

function markupTail(line, search) {
    if (line.endsWith(search)) {
        return line.slice(0, 0 - search.length) + `<span class="match">${search}</span>`;
    }
    return line;
}

function findPossibleChildItems(lines, mode = "tail") {
    const params = {
        "head": {"markupHead": true, "markupTail": false},
        "tail": {"markupHead": false, "markupTail": true},
        "all": {"markupHead": true, "markupTail": true}
    }[mode];
    const mainEntries = getMainEntries(lines);
    return mainEntries.map(entry => {
        const search = entry.basename;
        const possibles = mainEntries.filter(entry => entry.basename != search).map(entry => {
            let markup = entry.basename;
            if (params.markupHead) {
                markup = markupHead(markup, search);
            }
            if (params.markupTail) {
                markup = markupTail(markup, search);
            }
            return {
                "Markup": markup + entry.subInfo,
                "Changed": entry.basename != markup
            }
        }).filter(x => x.Changed);
        if (possibles.length > 0) {
            return {
                "Found": search,
                "Markup": possibles.map(p => `・${p.Markup}`).join("<br>")
            }
        }
        return null;
    }).filter(Boolean).sort((a, b) => b.Found.length - a.Found.length);
}