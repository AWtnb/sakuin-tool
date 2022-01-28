// 見よ項目があるのに見よ先の項目に括弧書きで付記されていないものを探す関数
function findLostReferenceTo(lines) {
    const entries = lines.filter(x => String(x).trim()).map(line => parseEntry(line));
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
            "lost": `${line.referTo}（${line.refEntryName}）`
        }
    }).filter(Boolean);
}

// 括弧書きで付記されているのに見よ項目がないものを探す関数
function findLostReferenceFrom(lines) {
    const entries = lines.filter(x => String(x).trim()).map(line => parseEntry(line));
    return entries.filter(entry => entry.referredFrom.length > 0).map(entry => {
        return {
            "text": entry.name,
            "referredFrom": entry.referredFrom,
            "basename": entry.basename
        };
    }).map(line => {
        const refs = entries.filter(entry => entry.isReference);
        const grep = line.referredFrom.filter(s => {
            return refs.filter(entry => entry.basename == s && entry.referTo == line.basename).length > 0
        });
        console.log(grep);
        if (grep.length == line.referredFrom.length) {
            return null;
        }
        const lost = line.referredFrom.filter(s => !grep.includes(s));
        return {
            "text": line.text,
            "lost": lost.map(s => `${s}　→${line.basename}`).join("<br>")
            }
    }).filter(Boolean);
}

function markupLostReference(item, color = "red") {
    return `<li style="margin-left:1em"><span style="font-weight:bold">${item.text}</span> …… <span style="color:${color}">${item.lost}</span></li>`
}