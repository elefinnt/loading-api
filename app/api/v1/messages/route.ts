import { STATIC_CACHE_HEADERS } from "@/lib/api/cache";
import { parsePaginationParams, wantsPagination } from "@/lib/api/params";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import {
  getAllMessages,
  paginateMessages,
} from "@/lib/messages/service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const items = getAllMessages(category);

  if (wantsPagination(searchParams)) {
    const parsed = parsePaginationParams(searchParams);

    if ("error" in parsed) {
      return jsonError(parsed.error, 400);
    }

    return jsonSuccess(
      paginateMessages(items, parsed.page, parsed.limit),
      200,
      STATIC_CACHE_HEADERS,
    );
  }

  return jsonSuccess(items, 200, STATIC_CACHE_HEADERS);
}
