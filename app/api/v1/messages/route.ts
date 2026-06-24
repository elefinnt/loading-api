import { jsonSuccess } from "@/lib/api/response";
import { getAllMessages } from "@/lib/messages/service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  return jsonSuccess(getAllMessages(category));
}
