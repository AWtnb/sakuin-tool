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
    const mainEntries = getMainEntries(lines);
    return mainEntries.map(entry => {
        const search = entry.basename;
        const possibles = mainEntries.filter(entry => entry.basename != search).map(entry => {
            let markup = entry.basename;
            if (mode == "head") {
                markup = markupHead(markup, search);
            }
            else if (mode == "tail") {
                markup = markupTail(markup, search);
            }
            else {
                markup = markupHead(markupTail(markup, search), search);
            }
            return {
                "markup": markup + entry.subInfo,
                "changed": entry.basename != markup
            }
        }).filter(x => x.changed);
        if (possibles.length > 0) {
            return {
                "found": search,
                "markup": possibles.map(p => `・${p.markup}`).join("<br>")
            }
        }
        return null;
    }).filter(Boolean).sort((a, b) => b.found.length - a.found.length);
}