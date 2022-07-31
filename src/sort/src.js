const comparer = (a, b) => {
    const aLower = String(a).toLowerCase();
    const bLower = String(b).toLowerCase();
    if (aLower > bLower) return 1;
    if (aLower < bLower) return -1;
    return 0;
}

export class Sorter {

    constructor() {
        this.parsedLines = [];
    }

    fromTsvLines(lines) {
        this.parsedLines = lines.filter(line => line.trim()).map(line => {
            const [item, reading, normalized, ...rest] = line.split("\t"); // 配列読み＝正規化＝normalized
            return {
               "item": item,
               "reading": reading,
               "normalized": normalized
            };
        });
    }

    addData(item, reading, normalized) {
        this.parsedLines.push({
            "item": item,
            "reading": reading,
            "normalized": normalized
         });
    }

    execute() {
        return this.parsedLines.sort((a,b) => {
            return comparer(a.item, b.item);
        }).sort((a,b) => {
            return comparer(a.reading, b.reading);
        }).sort((a,b) => {
            return comparer(a.normalized, b.normalized);
        });
    }

}
