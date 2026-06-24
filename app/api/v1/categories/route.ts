import { jsonSuccess } from "@/lib/api/response";
import { getCategories } from "@/lib/messages/service";

export async function GET() {
  return jsonSuccess(getCategories());
}
