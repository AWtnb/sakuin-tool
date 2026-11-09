import { Entry } from "@/helpers/entry";
import { AddressHandler } from "@/helpers/addressHandler";

export class AddressAdjuster {
  readonly start: number;
  readonly end: number;
  readonly delta: number;

  constructor(start: number | string, end: number | string, delta: number | string) {
    this.start = Number(start);
    this.end = Number(end);
    this.delta = Number(delta);
  }

  apply(lines: string[]): { origin: string; adjusted: string; isModified: boolean }[] {
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
