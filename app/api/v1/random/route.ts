import { jsonError, jsonSuccess } from "@/lib/api/response";
import { getRandomMessage } from "@/lib/messages/service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const message = getRandomMessage(category);

  if (!message) {
    return jsonError("Message not found");
  }

  return jsonSuccess(message);
}
