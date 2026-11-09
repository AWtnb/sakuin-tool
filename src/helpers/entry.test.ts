import { describe, expect, it } from "vitest";
import { Entry } from "./entry";

describe("Entry", () => {
  it("parses a main entry and its address", () => {
    const entry = new Entry("索引　　1, 3");

    expect(entry.name).toBe("索引");
    expect(entry.basename).toBe("索引");
    expect(entry.address).toBe("1, 3");
    expect(entry.isChild).toBe(false);
  });

  it("parses a child entry with indentation", () => {
    const entry = new Entry("　子項目　　2");

    expect(entry.name).toBe("　子項目");
    expect(entry.isChild).toBe(true);
  });

  it("parses a cross-reference", () => {
    const entry = new Entry("索引A　→索引B");

    expect(entry.isReference).toBe(true);
    expect(entry.referTo).toBe("索引B");
  });
});
