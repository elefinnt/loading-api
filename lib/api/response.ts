import { NextResponse } from "next/server";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api";
import { CORS_HEADERS } from "@/lib/api/cors";

const JSON_HEADERS = {
  "Content-Type": "application/json",
  ...CORS_HEADERS,
} as const;

type ResponseHeaders = Record<string, string>;

export function jsonSuccess<T>(
  data: T,
  status = 200,
  extraHeaders: ResponseHeaders = {},
): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    { success: true, data },
    { status, headers: { ...JSON_HEADERS, ...extraHeaders } },
  );
}

export function jsonError(
  error: string,
  status = 404,
  extraHeaders: ResponseHeaders = {},
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { success: false, error },
    { status, headers: { ...JSON_HEADERS, ...extraHeaders } },
  );
}
