import { messages } from "@/lib/messages";
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
