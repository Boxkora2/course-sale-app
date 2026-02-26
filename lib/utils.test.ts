import { describe, it, expect } from "vitest";
import {
  formatPrice,
  formatNumber,
  truncate,
  getInitials,
  clamp,
  isExternalUrl,
} from "./utils";

// ── formatPrice ─────────────────────────────────────────────
describe("formatPrice", () => {
  it("returns 'Free' for 0", () => {
    expect(formatPrice(0)).toBe("Free");
  });

  it("formats a whole-dollar price", () => {
    expect(formatPrice(29)).toBe("$29.00");
  });

  it("formats a price with cents", () => {
    expect(formatPrice(49.99)).toBe("$49.99");
  });

  it("supports alternative currencies", () => {
    expect(formatPrice(100, "EUR")).toContain("100");
  });
});

// ── formatNumber ────────────────────────────────────────────
describe("formatNumber", () => {
  it("leaves small numbers as-is", () => {
    expect(formatNumber(42)).toBe("42");
  });

  it("abbreviates thousands with K", () => {
    expect(formatNumber(1500)).toBe("1.5K");
  });

  it("abbreviates millions with M", () => {
    expect(formatNumber(2_500_000)).toBe("2.5M");
  });
});

// ── truncate ────────────────────────────────────────────────
describe("truncate", () => {
  it("leaves short strings untouched", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("returns exactly maxLen chars before the ellipsis", () => {
    const result = truncate("hello world", 5);
    expect(result).toBe("hello…");
  });

  it("handles strings equal to maxLen", () => {
    expect(truncate("exact", 5)).toBe("exact");
  });
});

// ── getInitials ─────────────────────────────────────────────
describe("getInitials", () => {
  it("returns two uppercase initials", () => {
    expect(getInitials("Vo Thanh Phat")).toBe("VT");
  });

  it("returns single initial for one-word name", () => {
    expect(getInitials("Korachoco")).toBe("K");
  });

  it("handles empty string gracefully", () => {
    expect(getInitials("")).toBe("");
  });
});

// ── clamp ───────────────────────────────────────────────────
describe("clamp", () => {
  it("clamps value below min to min", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("clamps value above max to max", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("leaves in-range values unchanged", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
});

// ── isExternalUrl ────────────────────────────────────────────
describe("isExternalUrl", () => {
  it("identifies https as external", () => {
    expect(isExternalUrl("https://example.com")).toBe(true);
  });

  it("identifies protocol-relative URLs as external", () => {
    expect(isExternalUrl("//example.com")).toBe(true);
  });

  it("identifies relative paths as internal", () => {
    expect(isExternalUrl("/courses")).toBe(false);
  });
});
