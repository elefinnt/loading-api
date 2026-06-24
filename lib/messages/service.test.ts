import { describe, expect, it } from "vitest";
import {
  getAllMessages,
  getCategories,
  getMessageById,
  getRandomMessage,
  paginateMessages,
  searchMessages,
} from "@/lib/messages/service";

describe("getAllMessages", () => {
  it("returns all messages when no category is provided", () => {
    expect(getAllMessages()).toHaveLength(500);
  });

  it("filters by category", () => {
    const developerMessages = getAllMessages("developer");

    expect(developerMessages).toHaveLength(100);
    expect(developerMessages.every((message) => message.category === "developer")).toBe(
      true,
    );
  });

  it("returns an empty array for unknown categories", () => {
    expect(getAllMessages("unknown")).toEqual([]);
  });
});

describe("getMessageById", () => {
  it("returns a message for a valid id", () => {
    const message = getMessageById(1);

    expect(message).not.toBeNull();
    expect(message?.id).toBe(1);
  });

  it("returns null for an unknown id", () => {
    expect(getMessageById(99999)).toBeNull();
  });
});

describe("searchMessages", () => {
  it("finds messages matching the query", () => {
    const results = searchMessages("npm");

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((message) => message.message.toLowerCase().includes("npm")),
    ).toBe(true);
  });

  it("returns an empty array for blank queries", () => {
    expect(searchMessages("   ")).toEqual([]);
  });
});

describe("paginateMessages", () => {
  it("returns the requested page of results", () => {
    const items = getAllMessages("funny");
    const page = paginateMessages(items, 2, 10);

    expect(page.items).toHaveLength(10);
    expect(page.pagination).toEqual({
      page: 2,
      limit: 10,
      total: 100,
      totalPages: 10,
    });
  });

  it("clamps page numbers beyond the last page", () => {
    const items = getAllMessages("funny");
    const page = paginateMessages(items, 999, 10);

    expect(page.pagination.page).toBe(10);
    expect(page.items).toHaveLength(10);
  });
});

describe("getRandomMessage", () => {
  it("returns a message from the requested category", () => {
    const message = getRandomMessage("sci-fi");

    expect(message).not.toBeNull();
    expect(message?.category).toBe("sci-fi");
  });

  it("returns null when the category pool is empty", () => {
    expect(getRandomMessage("unknown")).toBeNull();
  });
});

describe("getCategories", () => {
  it("returns a sorted list of categories", () => {
    expect(getCategories()).toEqual([
      "animals",
      "developer",
      "fantasy",
      "funny",
      "sci-fi",
    ]);
  });
});
