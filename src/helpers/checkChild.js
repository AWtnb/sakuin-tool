import { Entry } from "@/helpers/entry";

class ChildEntry {
  constructor(s, mode) {
    this.name = s;
    this.mode = mode;
    this.modified = false;

    this.pre = "";
    this.post = "";
    this.rest = "";
  }
  search(target) {
    if (this.mode == "all" || this.mode == "head") {
      if (this.name.startsWith(target)) {
        this.pre = target;
        this.modified = true;
      }
    }
    this.rest = this.name.substring(this.pre.length);
    if (this.mode == "all" || this.mode == "tail") {
      if (this.name.endsWith(target)) {
        this.post = target;
        this.modified = true;
      }
    }
    this.rest = this.rest.substring(0, this.rest.length - this.post.length);
  }
}

export class CheckChild {
  constructor(lines, mode = "tail") {
    this.mode = mode;
    this.mainEntries = lines
      .filter((x) => String(x).trim())
      .map((x) => new Entry(x))
      .filter((entry) => !entry.isReference && !entry.isChild)
      .map((entry) => {
        return {
          name: entry.name,
          basename: entry.basename,
        };
      });
  }

  findPossibles() {
    return this.mainEntries
      .map((entry) => {
        const target = entry.basename;
        const possibles = this.mainEntries
          .filter((entry) => entry.basename != target)
          .map((entry) => {
            const c = new ChildEntry(entry.basename, this.mode);
            c.search(target);
            if (c.modified) {
              return c;
            }
            return null;
          })
          .filter(Boolean);
        return {
          parent: entry.name,
          children: possibles,
        };
      })
      .filter((x) => {
        return x.children.length > 0;
      })
      .sort((a, b) => {
        return b.parent.length - a.parent.length;
      });
  }
}
