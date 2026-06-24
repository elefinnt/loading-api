export const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/random",
    description:
      "Returns one random loading message. Optional query: ?category=developer",
  },
  {
    method: "GET",
    path: "/api/v1/messages",
    description:
      "Returns all messages. Optional: ?category=developer, ?page=1&limit=50",
  },
  {
    method: "GET",
    path: "/api/v1/messages/:id",
    description: "Returns a single message by id.",
  },
  {
    method: "GET",
    path: "/api/v1/search",
    description: "Search messages. Required query: ?q=npm",
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
