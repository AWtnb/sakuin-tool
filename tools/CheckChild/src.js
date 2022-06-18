class CheckChild {

    static getMainEntries(lines) {
        return lines.filter(x => String(x).trim()).map(line => {
            const p = Entry.parse(line);
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

    static markupHead(line, search) {
        if (line.startsWith(search)) {
            return `<span class="match">${search}</span>` + line.slice(search.length);
        }
        return line;
    }

    static markupTail(line, search) {
        if (line.endsWith(search)) {
            return line.slice(0, 0 - search.length) + `<span class="match">${search}</span>`;
        }
        return line;
    }

    static findPossibleChildItems(lines, mode = "tail") {
        const params = {
            "head": {"markupHead": true, "markupTail": false},
            "tail": {"markupHead": false, "markupTail": true},
            "all": {"markupHead": true, "markupTail": true}
        }[mode];
        const mainEntries = CheckChild.getMainEntries(lines);
        return mainEntries.map(entry => {
            const search = entry.basename;
            const possibles = mainEntries.filter(entry => entry.basename != search).map(entry => {
                let markup = entry.basename;
                if (params.markupHead) {
                    markup = CheckChild.markupHead(markup, search);
                }
                if (params.markupTail) {
                    markup = CheckChild.markupTail(markup, search);
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

}
