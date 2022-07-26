import {Entry} from "../common.js";

export class ReferenceChecker {

    constructor(lines) {
        this.entries = lines.filter(x => String(x).trim()).map(line => new Entry(line));
    }

    goalLostReference() {
        // 見よ項目があるのに参照先に括弧で付記されていないものを探す
        return this.entries.filter(entry => entry.isReference).map(entry => {
            return {
                "text": entry.name,
                "refFrom": entry.basename,
                "refTo": entry.referTo
            };
        }).map(ref => {
            const grep = this.entries.filter(entry => {
                return (!entry.isReference && entry.basename == ref.refTo && entry.referredFrom.includes(ref.refFrom));
            });
            if (grep.length > 0) {
                return null;
            }
            return {
                "problem": ref.text,
                "require": `${ref.refTo}\uff08${ref.refFrom}\uff09`
            };
        }).filter(Boolean);
    }

    requiredFromReference() {
        // 参照元として括弧書きされているのに見よ項目がないものを探す
        const refs = this.entries.filter(entry => entry.isReference);
        return this.entries.filter(entry => entry.referredFrom.length > 0).map(entry => {
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
                "problem": line.text,
                "require": required.map(s => {
                    return { "from": s, "to":line.basename };
                })
            };
        }).filter(Boolean);
    }

    findAdjacent() {
        // 見よ項目と見よ先項目が隣接しているものを探す
        const stack = [];
        this.entries.forEach((entry, idx) => {
            // filter で要素数を減らしてしまうとインデックスで参照できなくなるので注意
            if (entry.isReference) {
                const previous = this.entries[idx - 1];
                if (previous && !previous.isReference && previous.referredFrom.includes(entry.basename)) {
                    stack.push(entry);
                }
                const next = this.entries[idx + 1];
                if (next && !next.isReference && next.referredFrom.includes(entry.basename)) {
                    stack.push(entry);
                }
            }
        });
        return stack.map(entry => entry.name);
    }


}

export class GroupingChecker {

    constructor(lines) {
        this.entries = lines.filter(x => String(x).trim()).map(line => new Entry(line));
        this.refs = this.entries.filter(entry => entry.isReference);
        this.nonRefs = this.entries.filter(entry => !entry.isReference);
        this.referred = this.entries.filter(entry => entry.referredFrom.length > 0);
        this.nonReferred = this.entries.filter(entry => entry.referredFrom.length < 1);
    }

    getUngrouped() {
        return this.refs.map(entry => {
            const refTo = entry.referTo;
            const found = this.nonReferred.filter(entry => entry.basename == refTo);
            if (found.length > 0 && this.referred.filter(entry => entry.basename == refTo).length > 0) {
                return {
                    "name": entry.name,
                    "detail": found.map(entry => entry.rawStr)
                };
            }
            return null;
        }).filter(Boolean);
    }

    getConflicting() {
        return this.refs.map(entry => {
            const refFrom = entry.basename;
            const found = this.nonRefs.filter(entry => entry.basename == refFrom);
            if (found.length > 0) {
                return {
                    "name": entry.name,
                    "detail": found.map(entry => entry.rawStr)
                };
            }
            return null;
        }).filter(Boolean);
    }

}