import { STATIC_CACHE_HEADERS } from "@/lib/api/cache";
import { jsonSuccess } from "@/lib/api/response";
import { getCategories } from "@/lib/messages/service";

export async function GET() {
  return jsonSuccess(getCategories(), 200, STATIC_CACHE_HEADERS);
}
