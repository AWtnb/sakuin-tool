class ReferenceChecker {
    static goalLostReference(lines) {
        /**
         * The reference item must be appended to the end of the referenced item in parentheses.
         * Look for reference items where this relationship is not established correctly.
         */
        const entries = lines.filter(x => String(x).trim()).map(line => Entry.parse(line));
        return entries.filter(entry => entry.isReference).map(entry => {
            return {
                "text": entry.name,
                "refEntryName": entry.basename,
                "referTo": entry.referTo
            };
        }).map(line => {
            const grep = entries.filter(entry => {
                return (!entry.isReference && entry.basename == line.referTo && entry.referredFrom.includes(line.refEntryName));
            });
            if (grep.length > 0) {
                return null;
            }
            return {
                "text": line.text,
                "require": `${line.referTo}（${line.refEntryName}）`
            }
        }).filter(Boolean);
    }

    static requiredFromReference(lines) {
        /**
         * In the parentheses of the referenced entry, there is information about the entry that refers to it.
         * Find the referenced entry whose relationship is not properly established.
         */
        const entries = lines.filter(x => String(x).trim()).map(line => Entry.parse(line));
        const refs = entries.filter(entry => entry.isReference);
        return entries.filter(entry => entry.referredFrom.length > 0).map(entry => {
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
            return {
                "text": line.text,
                "require": required.map(s => `${s}　→${line.basename}`).join("<br>")
            };
        }).filter(Boolean);
    }

    static markup(item, className = "require-reference") {
        return `<div class="detail"><span>${item.text}</span><span class="required ${className}">${item.require}</span></div>`
    }

    static findAdjacent(lines) {
        const entries = lines.filter(x => String(x).trim()).map(line => Entry.parse(line));
        return entries.map((entry, idx) => {
            if (!entry.isReference) {
                return null;
            }
            const previous = entries[idx - 1];
            if (previous && !previous.isReference && previous.referredFrom.includes(entry.basename)) {
                return entry;
            }
            const next = entries[idx + 1];
            if (next && !next.isReference && next.referredFrom.includes(entry.basename)) {
                return entry;
            }
            return null;
        }).filter(Boolean);
    }
}