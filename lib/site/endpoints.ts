export const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/random",
    description: "Returns one random loading message.",
  },
  {
    method: "GET",
    path: "/api/v1/messages",
    description:
      "Returns all messages. Optional query: ?category=developer",
  },
  {
    method: "GET",
    path: "/api/v1/categories",
    description: "Returns a sorted list of available categories.",
  },
  {
    method: "GET",
    path: "/api/health",
    description: "Health check for monitoring and uptime checks.",
  },
] as const;

export const CATEGORIES = [
  "animals",
  "developer",
  "fantasy",
  "funny",
  "sci-fi",
] as const;
