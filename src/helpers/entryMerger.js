import { Entry } from "@/helpers/entry.js";
import { AddressHandler } from "@/helpers/addressHandler";

const getLonger = (strA, strB) => {
  if (strA.length < strB.length) {
    return strB;
  }
  if (strB.length < strA.length) {
    return strA;
  }
  return "";
};

export class EntryMerger {
  constructor(line) {
    this.entry = new Entry(line);
  }

  with(line) {
    const additionalEntry = new Entry(line);
    const newName = this.entry.name.length == additionalEntry.name.length ? this.entry.name : getLonger(this.entry.name, additionalEntry.name);
    const newAddress = this.entry.address + ", " + additionalEntry.address;
    const sortedAddress = new AddressHandler(newAddress).formatAll();
    return newName + "\u3000\u3000" + sortedAddress;
  }
}
