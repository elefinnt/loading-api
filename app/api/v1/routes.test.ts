import { describe, expect, it } from "vitest";
import { GET as getMessageById } from "@/app/api/v1/messages/[id]/route";
import { GET as searchMessages } from "@/app/api/v1/search/route";

describe("GET /api/v1/messages/[id]", () => {
  it("returns a message for a valid id", async () => {
    const response = await getMessageById(new Request("http://localhost/api/v1/messages/1"), {
      params: Promise.resolve({ id: "1" }),
    });
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.id).toBe(1);
  });

  it("returns 404 for an unknown id", async () => {
    const response = await getMessageById(
      new Request("http://localhost/api/v1/messages/99999"),
      { params: Promise.resolve({ id: "99999" }) },
    );
    const json = await response.json();

    expect(response.status).toBe(404);
    expect(json.success).toBe(false);
  });

  it("returns 400 for an invalid id", async () => {
    const response = await getMessageById(
      new Request("http://localhost/api/v1/messages/abc"),
      { params: Promise.resolve({ id: "abc" }) },
    );
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid message id");
  });
});

describe("GET /api/v1/search", () => {
  it("returns matching messages", async () => {
    const response = await searchMessages(
      new Request("http://localhost/api/v1/search?q=npm"),
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.length).toBeGreaterThan(0);
  });

  it("returns 400 when q is missing", async () => {
    const response = await searchMessages(new Request("http://localhost/api/v1/search"));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Missing search query");
  });
});
