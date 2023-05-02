import { normalizeReading } from "@/helpers/utils";

const comparer = (a, b) => {
  const aLower = String(a).toLowerCase();
  const bLower = String(b).toLowerCase();
  if (aLower > bLower) return 1;
  if (aLower < bLower) return -1;
  return 0;
};

export class Sorter {
  constructor() {
    this.parsedLines = [];
  }

  addData(item, reading) {
    this.parsedLines.push({
      item: item,
      reading: reading,
      normalized: normalizeReading(reading, true),
    });
  }

  addHeading() {
    "あかさたなはまやらわ".split("").forEach((a) => {
      this.parsedLines.push({
        item: "■" + a + "行",
        reading: "",
        normalized: normalizeReading(a),
      });
    });
  }

  execute() {
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
