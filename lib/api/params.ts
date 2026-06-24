const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

export interface PaginationParams {
  page: number;
  limit: number;
}

export function parsePaginationParams(
  searchParams: URLSearchParams,
): PaginationParams | { error: string } {
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  if (pageParam === null && limitParam === null) {
    return { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT };
  }

  const page = pageParam === null ? DEFAULT_PAGE : Number(pageParam);
  const limit = limitParam === null ? DEFAULT_LIMIT : Number(limitParam);

  if (!Number.isInteger(page) || page < 1) {
    return { error: "Invalid page parameter" };
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
    return { error: "Invalid limit parameter (max 100)" };
  }

  return { page, limit };
}

export function wantsPagination(searchParams: URLSearchParams): boolean {
  return (
    searchParams.has("page") ||
    searchParams.has("limit")
  );
}
