class GroupingChecker {

    constructor(lines) {
        this.entries = lines.filter(x => String(x).trim()).map(line => Entry.parse(line));
        this.refs = this.entries.filter(entry => entry.isReference);
        this.nonRefs = this.entries.filter(entry => !entry.isReference);
        this.nonReferred = this.entries.filter(entry => entry.referredFrom.length < 1);
    }

    getUngrouped() {
        return this.refs.map(entry => {
            const refTo = entry.referTo;
            const found = this.nonReferred.filter(entry => entry.basename == refTo);
            if (found.length > 0) {
                return [entry.name].concat(found.map(entry => entry.name));
            }
            return null;
        }).filter(Boolean);
    }

    getConflicting() {
        return this.refs.map(entry => {
            const refFrom = entry.basename;
            const found = this.nonRefs.filter(entry => entry.basename == refFrom);
            if (found.length > 0) {
                return [entry.name].concat(found.map(entry => entry.name));
            }
            return null;
        }).filter(Boolean);
    }

}