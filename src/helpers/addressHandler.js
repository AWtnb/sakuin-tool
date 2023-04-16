class Nombre {
  constructor(s, hyphenated = false) {
    this.text = s.trim();
    this.hyphenated = hyphenated;
    this.intValue = Number(this.text.replace(/[^\d]/g, ""));
  }

  getPrefix() {
    const s = this.text;
    if (s.length && isNaN(s.at(0))) {
      return s.split(/\d+/).at(0);
    }
    return "";
  }

  getSuffix() {
    const s = this.text;
    if (s.length && isNaN(s.at(-1))) {
      return s.split(/\d+/).at(-1);
    }
    return "";
  }

  adjust(delta) {
    return this.getPrefix() + (this.intValue + Number(delta)) + this.getSuffix();
  }
}

export class AddressHandler {
  constructor(s) {
    const sanitized = s
      .replace(/\s/g, "")
      .replace(/\uff0c/g, ",")
      .replace(/[\u002d\u2010\u2011\u2012\u2013\u2014\uFF0D]+/g, "-")
      .replace(/[\uff21-\uff3a\uff41-\uff5a\uff10-\uff19]/g, function (m) {
        return String.fromCharCode(m.charCodeAt(0) - 0xfee0);
      });
    this.nombres = [];

    this.rawElements = sanitized
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    this.rawElements.forEach((elem) => {
      if (elem.indexOf("-") != -1) {
        this.setRangedNombre(elem);
        return;
      }
      this.nombres.push(new Nombre(elem, false));
    });
  }

  setRangedNombre(s) {
    const [start, end, ..._] = s.split("-");
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

  beginsConsecutiveTriplet(startIdx) {
    if (this.nombres.length - 3 < startIdx) {
      return false;
    }
    const focus = this.nombres[startIdx];
    const next1 = this.nombres[startIdx + 1];
    const next2 = this.nombres[startIdx + 2];
    if (focus.intValue + 1 == next1.intValue && focus.intValue + 2 == next2.intValue) {
      if (String(next1.text).match(/^\d+$/)) {
        return true;
      }
    }
    return false;
  }

  order() {
    const ns = this.nombres;
    this.nombres = ns.filter((x) => x.text).sort((a, b) => a.intValue - b.intValue);
  }

  unify() {
    const ns = this.nombres;
    const stack = [];
    this.nombres = ns.filter((nbr) => {
      if (stack.includes(nbr.text)) {
        return false;
      }
      stack.push(nbr.text);
      return true;
    });
  }

  hyphenate() {
    if (this.nombres.length < 3) {
      return;
    }
    const stack = [];
    stack.push({
      item: this.nombres[0],
      isHyphen: false,
    });
    for (let i = 0; i < this.nombres.length - 2; i++) {
      const next = this.nombres[i + 1];
      stack.push({
        item: next,
        isHyphen: this.beginsConsecutiveTriplet(i),
      });
    }
    stack.push({
      item: this.nombres.slice(-1)[0],
      isHyphen: false,
    });
    this.nombres = stack.map((x) => {
      if (x.isHyphen) {
        x.item.text = "\u2013";
      }
      return x.item;
    });
    return this.nombres;
  }

  formatAll() {
    this.order();
    this.unify();
    this.hyphenate();
    return this.nombres
      .map((p) => p.text)
      .join(", ")
      .replace(/, (\u2013, )+/g, "\u2013");
  }
}
