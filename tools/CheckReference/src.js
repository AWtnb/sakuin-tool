function getRegexForReference(from, to, searchReferenced = false) {
    const t = escapeMeta(to);
    if (searchReferenced) {
        const f = escapeMeta(from);
        return new RegExp(`^${t}[（［].*${f}.*[）］]`);
    }
    // 条件によって from が文字列だったり配列だったりするのはどうにかしたい
    const f = from.map(s => escapeMeta(s)).join("|");
    return new RegExp(`(${f})\\s*→\\s*${t}`);
}

// 見よ項目があるのに見よ先の項目に括弧書きで付記されていないものを探す関数
function findLostReferenceTo(lines) {
    const entries = lines.filter(x => String(x).trim()).map(line => parseEntry(line));
    return entries.map(entry => {
        if (entry.referTo.length < 1) {
            return null;
        }
        const arr = entry.name.split(/\s*→\s*/);
        return {
            "Text": entry.name,
            "From": arr[0],
            "To": arr[1]
        };
    }).filter(Boolean).map(line => {
        const reg = getRegexForReference(line.From, line.To, true)
        const grep = entries.map(x => x.name).filter(l => l.match(reg));
        if (grep.length > 0) {
            return null;
        }
        return {
            "Text": line.Text,
            "Lost": `${line.To}（${line.From}）`
        }
    }).filter(x => x);
}

// 括弧書きで付記されているのに見よ項目がないものを探す関数
function findLostReferenceFrom(lines) {
    const entries = lines.filter(x => String(x).trim()).map(line => parseEntry(line));
    return entries.map(entry => {
        if (entry.name.length < 1 || entry.referredFrom.length < 1) {
            return null;
        }
        return {
            "Text": entry.name,
            "Froms": entry.referredFrom,
            "To": entry.basename
        };
    }).filter(Boolean).map(entry => {
        const reg = getRegexForReference(entry.Froms, entry.To, false);
        const grep = entries.map(x => x.name).filter(l => l.match(reg));
        if (grep.length > 0) {
            return null;
        }
        return {
            "Text": entry.Text,
            "Lost": `${entry.Froms}　→${entry.To}`
        }
    }).filter(Boolean);
}

function markupLostReference(item, color = "red") {
    return `<li style="margin-left:1em"><span style="font-weight:bold">${item.Text}</span> …… <span style="color:${color}">${item.Lost}</span></li>`
}