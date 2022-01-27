// 見よ項目があるのに見よ先の項目に括弧書きで付記されていないものを探す関数
function findLostReferenceTo(lines) {
    const entries = lines.filter(x => String(x).trim()).map(line => parseEntry(line));
    return entries.filter(entry => entry.referTo.length > 0).map(entry => {
        return {
            "text": entry.name,
            "referFrom": entry.basename,
            "referTo": entry.referTo
        };
    }).map(line => {
        const grep = entries.filter(entry => {
            return (entry.referTo.length < 1 && entry.name.startsWith(line.referTo) && entry.referredFrom.includes(line.referFrom));
        });
        if (grep.length > 0) {
            return null;
        }
        return {
            "text": line.text,
            "lost": `${line.referTo}（${line.referFrom}）`
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
        const grep = entries.filter(entry => {
            return (entry.referTo == line.basename && line.referredFrom.includes(entry.basename));
        });
        if (grep.length > 0) {
            return null;
        }
        return {
            "text": line.text,
            "lost": line.referredFrom.map(frm => `${frm}　→${line.basename}`).join(" OR ")
        }
    }).filter(Boolean);
}

function markupLostReference(item, color = "red") {
    return `<li style="margin-left:1em"><span style="font-weight:bold">${item.text}</span> …… <span style="color:${color}">${item.lost}</span></li>`
}