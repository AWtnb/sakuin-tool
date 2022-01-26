
function getUngroupedReferencedItems(lines) {
    const referred = lines.filter(Boolean).filter(line => line.match(/（.+?）/));
    const nonReferred = lines.filter(Boolean).filter(line => !referred.includes(line));
    return referred.map(line => {
        const basename = parseEntry(line).name.replace(/（.+?）/, "");
        const grep = nonReferred.filter(line => parseEntry(line).name == basename);
        if (grep.length > 0) {
            return [line].concat(grep);
        }
        return null;
    }).filter(Boolean);
}

function getConflictReferringItems(lines) {
    const referring = lines.filter(Boolean).filter(line => line.match(/\s+→/));
    const nonReferring = lines.filter(Boolean).filter(line => !referring.includes(line));
    return referring.map(line => {
        const basename = line.replace(/\s*→.+$/, "");
        const grep = nonReferring.filter(line => parseEntry(line).name.replace(/（.+?）/, "") == basename);
        if (grep.length > 0) {
            return [line].concat(grep);
        }
        return null;
    }).filter(Boolean);
}