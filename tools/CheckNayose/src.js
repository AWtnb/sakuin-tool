
function getUngroupedReferencedItems(lines) {
    const entries = lines.filter(x => String(x).trim()).map(line => parseEntry(line));
    const refs = entries.filter(entry => entry.isReference);
    const nonReferred = entries.filter(entry => entry.referredFrom.length < 1);
    return refs.map(entry => {
        const referTo = entry.referTo;
        const grep = nonReferred.filter(entry => entry.basename == referTo);
        if (grep.length > 0) {
            return [entry.name].concat(grep.map(entry => entry.name));
        }
        return null;
    }).filter(Boolean);
}

function getConflictReferringItems(lines) {
    const entries = lines.filter(x => String(x).trim()).map(line => parseEntry(line));
    const refs = entries.filter(entry => entry.isReference);
    const nonReferring = entries.filter(entry => !entry.isReference);
    return refs.map(entry => {
        const basename = entry.basename;
        const grep = nonReferring.filter(entry => entry.basename == basename);
        if (grep.length > 0) {
            return [entry.name].concat(grep.map(entry => entry.name));
        }
        return null;
    }).filter(Boolean);
}