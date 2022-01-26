
function getUngroupedReferencedItems(lines) {
    const referred = lines.filter(Boolean).filter(line => parseEntry(line).referredFrom.length > 0);
    const nonReferred = lines.filter(Boolean).filter(line => !referred.includes(line));
    return referred.map(line => {
        const basename = parseEntry(line).basename;
        const grep = nonReferred.filter(line => parseEntry(line).name == basename);
        if (grep.length > 0) {
            return [line].concat(grep);
        }
        return null;
    }).filter(Boolean);
}

function getConflictReferringItems(lines) {
    const referring = lines.filter(Boolean).filter(line => parseEntry(line).referTo.length > 0);
    const nonReferring = lines.filter(Boolean).filter(line => !referring.includes(line));
    return referring.map(line => {
        const referFrom = line.replace(/\s*→.+$/, "");
        const grep = nonReferring.filter(line => parseEntry(line).basename == referFrom);
        if (grep.length > 0) {
            return [line].concat(grep);
        }
        return null;
    }).filter(Boolean);
}