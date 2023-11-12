import { Entry } from "@/helpers/entry.js";
import { AddressHandler } from "@/helpers/addressHandler.js";

export class AddressAdjuster {
  constructor(start, end, delta) {
    this.start = Number(start);
    this.end = Number(end);
    this.delta = Number(delta);
  }

  apply(lines) {
    return lines.map((line) => {
      const entry = new Entry(line);
      const handler = new AddressHandler(entry.address);
      const adjusted = handler.adjust(this.start, this.end, this.delta);
      const adjustedLine = entry.address.length ? entry.name + entry.separator + adjusted : entry.name;
      return {
        origin: line,
        adjusted: adjustedLine,
        isModified: entry.address != adjusted,
      };
    });
  }
}
