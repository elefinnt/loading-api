# Loading API

A public REST API that serves witty loading messages. Built with Next.js App Router and TypeScript, structured for growth into a full-featured public API.

## Folder structure

```
app/
  api/
    health/
      route.ts          # Health check (unversioned)
    v1/
      random/
        route.ts        # GET /api/v1/random
      messages/
        route.ts        # GET /api/v1/messages
        [id]/
          route.ts      # GET /api/v1/messages/:id
      search/
        route.ts        # GET /api/v1/search
      categories/
        route.ts        # GET /api/v1/categories
lib/
  api/
    config.ts           # API version and shared config
    response.ts         # Consistent JSON response helpers
  messages/
    index.ts            # Assembles the full message catalogue
    service.ts          # Message business logic
    data/               # 100 messages per category (500 total)
      developer.ts
      funny.ts
      fantasy.ts
      animals.ts
      sci-fi.ts
scripts/
  generate-messages.mjs       # Regenerate category message data
  generate-messages/
    validate.mjs              # Checks for duplicates and overused words
    content/                  # Source of truth for message text
      developer.mjs
      funny.mjs
      fantasy.mjs
      animals.mjs
      sci-fi.mjs
types/
  api.ts                # API response types
  message.ts            # Message interface
```

Business logic lives in `lib/`, route handlers stay thin, and versioned routes sit under `app/api/v1/` so future endpoints (`/api/v2/*`) can be added without reorganising the project.

## Local development

**Prerequisites:** Node.js 20+, pnpm

```bash
pnpm install
pnpm dev
```

The API is available at [http://localhost:3000](http://localhost:3000).

**Production build:**

```bash
pnpm build
pnpm start
```

**Tests:**

```bash
pnpm test
```

**Validate message content:**

```bash
pnpm validate-messages
```

**Regenerate message data:**

```bash
pnpm generate-messages
```

## API documentation

All versioned endpoints return JSON with `Content-Type: application/json`.

CORS is enabled for browser clients. Static catalogue routes include cache headers. API routes are rate limited to 100 requests per minute per IP.

### Response format

**Success**

```json
{
  "success": true,
  "data": "..."
}
```

**Failure**

```json
{
  "success": false,
  "error": "Message not found"
}
```

---

### GET /api/health

Health check for monitoring, load balancers, and uptime checks.

**Response**

```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-06-25T08:30:00.000Z"
}
```

---

### GET /api/v1/random

Returns a single random loading message.

**Query parameters**

| Parameter  | Type   | Description                                    |
| ---------- | ------ | ---------------------------------------------- |
| `category` | string | Optional category filter (e.g. `developer`)    |

**Example response**

```json
{
  "success": true,
  "data": {
    "id": 17,
    "message": "Running npm install on the universe...",
    "category": "developer"
  }
}
```

**Error response** (no messages available)

```json
{
  "success": false,
  "error": "Message not found"
}
```

---

### GET /api/v1/messages

Returns loading messages.

**Query parameters**

| Parameter  | Type   | Description                                      |
| ---------- | ------ | ------------------------------------------------ |
| `category` | string | Filter by category (e.g. `developer`, `funny`)   |
| `page`     | number | Page number when paginating (starts at 1)        |
| `limit`    | number | Page size when paginating (max 100)              |

If the category does not exist, `data` is an empty array.

When `page` or `limit` is provided, the response is paginated:

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "message": "Teaching pigeons quantum physics...",
        "category": "funny"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 500,
      "totalPages": 10
    }
  }
}
```

Without pagination parameters, `data` is a flat array of messages.

---

### GET /api/v1/messages/:id

Returns a single message by id.

**Example response**

```json
{
  "success": true,
  "data": {
    "id": 17,
    "message": "Running npm install on the universe...",
    "category": "developer"
  }
}
```

---

### GET /api/v1/search

Search messages by text or category.

**Query parameters**

| Parameter | Type   | Description              |
| --------- | ------ | ------------------------ |
| `q`       | string | Required search term     |

**Example response**

```json
{
  "success": true,
  "data": [
    {
      "id": 17,
      "message": "Running npm install on the universe...",
      "category": "developer"
    }
  ]
}
```

---

### GET /api/v1/categories

Returns a sorted list of unique message categories.

**Example response**

```json
{
  "success": true,
  "data": [
    "animals",
    "developer",
    "fantasy",
    "funny",
    "sci-fi"
  ]
}
```

---

## Categories

Messages are grouped into five categories, with **100 messages in each** (500 total):

- `developer` (100)
- `funny` (100)
- `fantasy` (100)
- `animals` (100)
- `sci-fi` (100)

To regenerate the message catalogue (runs validation for duplicates and overused words):

```bash
pnpm generate-messages
```

Edit message text in `scripts/generate-messages/content/` before regenerating.

---

## Examples

### fetch()

```javascript
// Health check
const health = await fetch("http://localhost:3000/api/health").then((r) =>
  r.json(),
);

// Random message
const random = await fetch("http://localhost:3000/api/v1/random").then((r) =>
  r.json(),
);

// Random developer message
const devRandom = await fetch(
  "http://localhost:3000/api/v1/random?category=developer",
).then((r) => r.json());

// All messages
const all = await fetch("http://localhost:3000/api/v1/messages").then((r) =>
  r.json(),
);

// Paginated messages
const page = await fetch(
  "http://localhost:3000/api/v1/messages?page=1&limit=50",
).then((r) => r.json());

// Message by id
const message = await fetch("http://localhost:3000/api/v1/messages/17").then(
  (r) => r.json(),
);

// Search
const results = await fetch(
  "http://localhost:3000/api/v1/search?q=npm",
).then((r) => r.json());

// Messages by category
const dev = await fetch(
  "http://localhost:3000/api/v1/messages?category=developer",
).then((r) => r.json());

// Categories
const categories = await fetch(
  "http://localhost:3000/api/v1/categories",
).then((r) => r.json());
```

### curl

```bash
# Health check
curl http://localhost:3000/api/health

# Random message
curl http://localhost:3000/api/v1/random

# Random message by category
curl "http://localhost:3000/api/v1/random?category=developer"

# All messages
curl http://localhost:3000/api/v1/messages

# Paginated messages
curl "http://localhost:3000/api/v1/messages?page=1&limit=50"

# Message by id
curl http://localhost:3000/api/v1/messages/17

# Search
curl "http://localhost:3000/api/v1/search?q=npm"

# Filter by category
curl "http://localhost:3000/api/v1/messages?category=funny"

# List categories
curl http://localhost:3000/api/v1/categories
```

## Licence

MIT
