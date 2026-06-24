import { jsonError, jsonSuccess } from "@/lib/api/response";
import { searchMessages } from "@/lib/messages/service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query?.trim()) {
    return jsonError("Missing search query", 400);
  }

  return jsonSuccess(searchMessages(query));
}
