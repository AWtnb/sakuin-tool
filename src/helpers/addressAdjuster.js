import { Entry } from "@/helpers/entry.js";
import { AddressHandler } from "@/helpers/addressHandler.js";

const pruneNaN = (s) => {
  if (isNaN(Number(s))) {
    return s.replace(/[^\d]/g, "");
  }
  return s;
};

const compareNombres = (nombresA, nombresB) => {
  const detail = nombresA.map((nbrA, idx) => {
    const nbrB = nombresB[idx];
    const isEnd = idx == nombresA.length - 1;
    if (pruneNaN(nbrA) != pruneNaN(nbrB)) {
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

  adjustNombre(nombre) {
    if (this.start <= nombre.intValue && nombre.intValue <= this.end) {
      return nombre.adjust(this.delta);
    }
    return nombre.text;
  }

  apply(lines) {
    return lines.map((line) => {
      const entry = new Entry(line);
      const orgNombres = new AddressHandler(entry.address).rawElements;
      const newNombres = orgNombres.map((orgNbr) => {
        const parsed = new AddressHandler(orgNbr).nombres;
        if (parsed.length > 1) {
          return this.adjustNombre(parsed[0]) + "\u2013" + this.adjustNombre(parsed.at(-1));
        }
        return this.adjustNombre(parsed[0]);
      });
      return {
        name: entry.name,
        newNombres: newNombres,
        comparison: compareNombres(orgNombres, newNombres),
      };
    });
  }
}
