class Nombre {
  rawStr: string;
  hyphenated: boolean;
  intValue: number;

  constructor(s: string, hyphenated = false) {
    this.rawStr = s.trim();
    this.hyphenated = hyphenated;
    this.intValue = Number(this.rawStr.replace(/[^\d]/g, ""));
  }

  getPrefix(): string {
    const s = this.rawStr;
    if (s.length && Number.isNaN(Number(s.charAt(0)))) {
      return s.split(/\d+/).at(0) ?? "";
    }
    return "";
  }

  getSuffix(): string {
    const s = this.rawStr;
    if (s.length && Number.isNaN(Number(s.charAt(s.length - 1)))) {
      return s.split(/\d+/).at(-1) ?? "";
    }
    return "";
  }

  adjust(delta: number): void {
    this.intValue += Number(delta);
  }

  getText(): string {
    if (this.hyphenated) {
      return "\u2013";
    }
    if (this.intValue === 0) {
      return this.rawStr;
    }
    return this.getPrefix() + String(this.intValue) + this.getSuffix();
  }

  getId(): string {
    return `text:${this.getText()}-value:${this.intValue}`;
  }
}

class NombresToAddress {
  nombres: Nombre[];

  constructor(nombres: Nombre[]) {
    this.nombres = nombres;
  }

  order(): void {
    const ns = this.nombres;
    this.nombres = ns.filter((x) => x.getText()).sort((a, b) => a.intValue - b.intValue);
  }

  unify(): void {
    const ids = new Set<string>();
    this.nombres = this.nombres.filter((nombre) => {
      const id = nombre.getId();
      if (ids.has(id)) {
        return false;
      }
      ids.add(id);
      return true;
    });
  }

  isConsecutiveTriplet(startIdx: number): boolean {
    if (this.nombres.length - 3 < startIdx) {
      return false;
    }
    const focus = this.nombres[startIdx];
    const next1 = this.nombres[startIdx + 1];
    const next2 = this.nombres[startIdx + 2];
    if (!focus || !next1 || !next2) {
      return false;
    }
    return focus.intValue + 1 == next1.intValue && focus.intValue + 2 == next2.intValue && next1.getPrefix().length < 1 && next1.getSuffix().length < 1;
  }

  hyphenate(): void {
    if (this.nombres.length < 3) {
      return;
    }
    this.nombres[0].hyphenated = false;
    for (let i = 0; i < this.nombres.length - 2; i++) {
      this.nombres[i + 1].hyphenated = this.isConsecutiveTriplet(i);
    }
    const lastNombre = this.nombres.at(-1);
    if (lastNombre) {
      lastNombre.hyphenated = false;
    }
  }

  getText(): string {
    return this.nombres
      .map((nbr) => nbr.getText())
      .join(", ")
      .replace(/, (\u2013, )+/g, "\u2013");
  }
}

export class AddressHandler {
  nombres: Nombre[] = [];

  constructor(s: string) {

    const sanitized = s
      .replace(/\s/g, "")
      .replace(/\uff0c/g, ",")
      .replace(/[\u002d\u2010\u2011\u2012\u2013\u2014\uFF0D]+/g, "-")
      .replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g, (m) => {
        return String.fromCharCode(m.charCodeAt(0) - 0xfee0);
      });
    sanitized
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((elem) => {
        if (elem.indexOf("-") != -1) {
          this.setRangedNombre(elem);
          return;
        }
        this.nombres.push(new Nombre(elem, false));
      });
  }

  setRangedNombre(s: string): void {
    const [start = "", end = ""] = s.split("-");
    if (start.length && end.length) {
      const startNbr = new Nombre(start, false);
      const endNbr = new Nombre(end, false);
      this.nombres.push(startNbr);
      for (let i = startNbr.intValue + 1; i < endNbr.intValue; i++) {
        this.nombres.push(new Nombre(String(i), true));
      }
      this.nombres.push(endNbr);
    }
  }

  formatAll(): string {
    const n2a = new NombresToAddress(this.nombres);
    n2a.order();
    n2a.unify();
    n2a.hyphenate();
    return n2a.getText();
  }

  adjust(start: number, end: number, delta: number): string {
    const newNombres = this.nombres.map((nombre) => {
      if (start <= nombre.intValue && nombre.intValue <= end && start) {
        nombre.adjust(delta);
      }
      return nombre;
    });
    const n2a = new NombresToAddress(newNombres);
    return n2a.getText();
  }

  unsorted(): boolean {
    if (this.nombres.length < 2) {
      return false;
    }
    for (let i = 0; i < this.nombres.length - 1; i++) {
      if (this.nombres[i].intValue >= this.nombres[i + 1].intValue) {
        return true;
      }
    }
    return false;
  }

  unHyphened(): boolean {
    if (this.nombres.length < 3) {
      return false;
    }
    for (let i = 0; i < this.nombres.length - 2; i++) {
      const current = this.nombres[i];
      const next1 = this.nombres[i + 1];
      const next2 = this.nombres[i + 2];
      if (current.intValue + 1 == next1.intValue && current.intValue + 2 == next2.intValue && !next1.hyphenated) {
        return true;
      }
    }
    return false;
  }
}
