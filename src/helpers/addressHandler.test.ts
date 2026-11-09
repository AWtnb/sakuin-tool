import { describe, expect, it } from "vitest";
import { AddressHandler } from "./addressHandler";

describe("AddressHandler", () => {
  it("sorts and compacts consecutive page numbers", () => {
    expect(new AddressHandler("3, 1, 2, 2").formatAll()).toBe("1–3");
  });

  it("normalizes page ranges", () => {
    expect(new AddressHandler("1-3, 5").formatAll()).toBe("1–3, 5");
  });
});
