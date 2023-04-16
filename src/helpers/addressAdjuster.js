import { Entry } from "@/helpers/entry.js";
import { AddressHandler } from "@/helpers/addressHandler.js";

const compareNombres = (nombresA, nombresB) => {
  const detail = nombresA.map((nbrA, idx) => {
    const nbrB = nombresB[idx];
    const isEnd = idx == nombresA.length - 1;
    if (nbrA != nbrB) {
      return {
        text: nbrB,
        before: nbrA,
        color: "#ff0080",
        isEnd: isEnd,
      };
    }
    return {
      text: nbrA,
      before: "",
      color: "#333",
      isEnd: isEnd,
    };
  });
  return {
    modified: detail.some((x) => x.before.length > 0),
    detail: detail,
  };
};

export class AddressAdjuster {
  constructor(start, end, delta) {
    this.start = Number(start);
    this.end = Number(end);
    this.delta = Number(delta);
  }

  apply(lines) {
    return lines.map((line) => {
      const entry = new Entry(line);
      const address = new AddressHandler(entry.address);
      const orgin = address.formatAll();
      const orgNombres = orgin.split(", ");
      const adjusted = address.adjust(this.start, this.end, this.delta);
      const newNombres = adjusted.split(", ");
      return {
        name: entry.name,
        newNombres: newNombres,
        comparison: compareNombres(orgNombres, newNombres),
      };
    });
  }
}
