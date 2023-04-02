import { Entry } from "@/helpers/entryHandler.js";
import { AddressHandler } from "@/helpers/addressHandler.js";

export class AddressChecker {
  constructor(s) {
    const entry = new Entry(s);
    this.nombres = new AddressHandler(entry.address).nombres;
    this.problems = [];
  }

  checkSort() {
    if (this.nombres.length < 2) {
      return;
    }
    for (let i = 0; i < this.nombres.length - 1; i++) {
      if (this.nombres[i].intValue >= this.nombres[i + 1].intValue) {
        this.problems.push({
          color: "red",
          text: "順番！",
        });
        break;
      }
    }
  }

  checkHyphen() {
    if (this.nombres.length < 3) {
      return;
    }
    for (let i = 0; i < this.nombres.length - 2; i++) {
      const current = this.nombres[i];
      const next1 = this.nombres[i + 1];
      const next2 = this.nombres[i + 2];
      if (current.intValue + 1 == next1.intValue && current.intValue + 2 == next2.intValue && !next1.hyphenated) {
        this.problems.push({
          color: "blue",
          text: "連続！",
        });
        break;
      }
    }
  }
}
