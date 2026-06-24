import { NextResponse } from "next/server";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";

const JSON_HEADERS = {
  "Content-Type": "application/json",
} as const;

export function jsonSuccess<T>(
  data: T,
  status = 200,
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json({ success: true, data }, { status, headers: JSON_HEADERS });
}

export function jsonError(
  error: string,
  status = 404,
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { success: false, error },
    { status, headers: JSON_HEADERS },
  );
}
