import { describe, expect, it } from "vitest";
import {
  arrayOfLines,
  normalizeReading,
  toHalfWidth,
  toHiragana,
  toKatakana,
} from "./utils";

describe("text utilities", () => {
  it("converts full-width Latin characters and digits", () => {
    expect(toHalfWidth("ＡＢＣ１２３")).toBe("ABC123");
  });

  it("converts between hiragana and katakana", () => {
    expect(toKatakana("ひらがな")).toBe("ヒラガナ");
    expect(toHiragana("カタカナ")).toBe("かたかな");
  });

  it("normalizes readings and optionally removes noise", () => {
    expect(normalizeReading("ガッコー", true)).toBe("カツコ");
    expect(normalizeReading("ガッコー!", false)).toBe("カツコ!");
  });

  it("preserves blank lines while splitting non-empty input", () => {
    expect(arrayOfLines("\na\n")).toEqual(["", "a", ""]);
    expect(arrayOfLines("")).toEqual([]);
  });
});
