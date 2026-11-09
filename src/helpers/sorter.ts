import { normalizeReading } from "@/helpers/utils";

export interface SortLine {
  item: string;
  reading: string;
  normalized: string;
}

const comparer = (a: string, b: string): number => {
  const aLower = String(a).toLowerCase();
  const bLower = String(b).toLowerCase();
  if (aLower < bLower) return -1;
  if (bLower < aLower) return 1;
  return 0;
};

export class Sorter {
  parsedLines: SortLine[] = [];

  constructor() {
  }

  addData(item: string, reading: string): void {
    this.parsedLines.push({
      item: item,
      reading: reading,
      normalized: normalizeReading(reading, true),
    });
  }

  addHeading(): void {
    "あかさたなはまやらわ".split("").forEach((a) => {
      this.parsedLines.push({
        item: "■" + a + "行",
        reading: "",
        normalized: normalizeReading(a),
      });
    });
  }

  execute(): SortLine[] {
    return this.parsedLines
      .sort((a, b) => {
        return comparer(a.item, b.item);
      })
      .sort((a, b) => {
        return comparer(a.reading, b.reading);
      })
      .sort((a, b) => {
        return comparer(a.normalized, b.normalized);
      });
  }
}
