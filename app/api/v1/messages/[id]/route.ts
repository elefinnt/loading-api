import { STATIC_CACHE_HEADERS } from "@/lib/api/cache";
import { jsonError, jsonSuccess } from "@/lib/api/response";
import { getMessageById } from "@/lib/messages/service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId < 1) {
    return jsonError("Invalid message id", 400);
  }

  const message = getMessageById(numericId);

  if (!message) {
    return jsonError("Message not found");
  }

  return jsonSuccess(message, 200, STATIC_CACHE_HEADERS);
}
