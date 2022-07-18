export class SortIndex {

    static fromTsv (lines) {
        return lines.filter(line => line.trim()).map(line => {
            const [item, reading, norm,  ...rest] = line.split("\t"); // 配列読み＝正規化＝normalized
            return {
               "Item": item,
               "Reading": reading,
               "Norm": norm
            }
        });
    }

    static comparer (a, b) {
        const aLower = String(a).toLowerCase();
        const bLower = String(b).toLowerCase();
        if (aLower > bLower) return 1;
        if (aLower < bLower) return -1;
        return 0;
    }

    static sortByReading (obj) {
        return obj.sort((a,b) => {
            return SortIndex.comparer(a.Item, b.Item);
        }).sort((a,b) => {
            return SortIndex.comparer(a.Reading, b.Reading);
        }).sort((a,b) => {
            return SortIndex.comparer(a.Norm, b.Norm);
        });
    }

}
