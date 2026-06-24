import { messages } from "@/lib/messages";
import type { PaginatedResult } from "@/types/pagination";
import type { Message } from "@/types/message";

export function getAllMessages(category?: string | null): Message[] {
  if (!category) {
    return messages;
  }

  const normalisedCategory = category.toLowerCase();
  const knownCategories = new Set(
    messages.map((message) => message.category.toLowerCase()),
  );

  if (!knownCategories.has(normalisedCategory)) {
    return [];
  }

  return messages.filter(
    (message) => message.category.toLowerCase() === normalisedCategory,
  );
}

export function getMessageById(id: number): Message | null {
  return messages.find((message) => message.id === id) ?? null;
}

export function searchMessages(query: string): Message[] {
  const normalisedQuery = query.trim().toLowerCase();

  if (!normalisedQuery) {
    return [];
  }

  return messages.filter(
    (message) =>
      message.message.toLowerCase().includes(normalisedQuery) ||
      message.category.toLowerCase().includes(normalisedQuery),
  );
}

export function paginateMessages(
  items: Message[],
  page: number,
  limit: number,
): PaginatedResult<Message> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * limit;

  return {
    items: items.slice(start, start + limit),
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages,
    },
  };
}

export function getRandomMessage(category?: string | null): Message | null {
  const pool = getAllMessages(category);

  if (pool.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

export function getCategories(): string[] {
  const categories = new Set(messages.map((message) => message.category));
  return [...categories].sort();
}
