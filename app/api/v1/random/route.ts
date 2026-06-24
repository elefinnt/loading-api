import { jsonError, jsonSuccess } from "@/lib/api/response";
import { getRandomMessage } from "@/lib/messages/service";

export async function GET() {
  const message = getRandomMessage();

  if (!message) {
    return jsonError("Message not found");
  }

  return jsonSuccess(message);
}
