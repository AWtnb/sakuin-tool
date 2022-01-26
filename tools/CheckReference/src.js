function getRegexForReference(from, to, searchReferenced = false) {
    const t = escapeMeta(to);
    if (searchReferenced) {
        const f = escapeMeta(from);
        return new RegExp(`^${t}[（［].*${f}.*[）］]`);
    }
    const f = from.replace(/,\s*/g, "，").split("，").map(s => escapeMeta(s)).join("|");
    return new RegExp(`(${f})\\s*→\\s*${t}`);
}

// 見よ項目があるのに見よ先の項目に括弧書きで付記されていないものを探す関数
function findLostReferenceTo(lines) {
    const items = lines.map(line => parseEntry(line).name).filter(Boolean);
    const refs = items.filter(line => line.indexOf("→") != -1);
    return refs.map(line => {
        const arr = line.split(/\s*→\s*/);
        return {
            "Text": line,
            "From": arr[0],
            "To": arr[1]
        };
    }).map(line => {
        const reg = getRegexForReference(line.From, line.To, true)
        const grep = items.filter(l => l.match(reg));
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
    const items = lines.map(line => line.replace(/　　\d.+$/, "")).filter(line => line);
    const reffered = items.filter(line => line.match(/[［（\(].+?[］）\)]/));
    return reffered.map(line => {
        return {
            "Text": line,
            "From": line.replace(/^.+?[［（\(](.+?)[］）\)].*$/, "$1"),
            "To": line.replace(/[［（\(].+$/, "")
        };
    }).map(line => {
        const reg = getRegexForReference(line.From, line.To, false);
        const grep = items.filter(l => l.match(reg));
        if (grep.length > 0) {
            return null;
        }
        return {
            "Text": line.Text,
            "Lost": `${line.From}　→${line.To}`
        }
    }).filter(x => x);
}

function markupLostReference(item, color = "red") {
    return `<li style="margin-left:1em"><span style="font-weight:bold">${item.Text}</span> …… <span style="color:${color}">${item.Lost}</span></li>`
}