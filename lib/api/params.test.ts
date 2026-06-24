import { describe, expect, it } from "vitest";
import { parsePaginationParams, wantsPagination } from "@/lib/api/params";

describe("wantsPagination", () => {
  it("returns false when pagination params are absent", () => {
    expect(wantsPagination(new URLSearchParams())).toBe(false);
  });

  it("returns true when page or limit is present", () => {
    expect(wantsPagination(new URLSearchParams("page=1"))).toBe(true);
    expect(wantsPagination(new URLSearchParams("limit=25"))).toBe(true);
  });
});

describe("parsePaginationParams", () => {
  it("uses defaults when only one param is provided", () => {
    expect(parsePaginationParams(new URLSearchParams("page=2"))).toEqual({
      page: 2,
      limit: 50,
    });
  });

  it("rejects invalid values", () => {
    expect(parsePaginationParams(new URLSearchParams("page=0"))).toEqual({
      error: "Invalid page parameter",
    });
    expect(parsePaginationParams(new URLSearchParams("limit=101"))).toEqual({
      error: "Invalid limit parameter (max 100)",
    });
  });
});
