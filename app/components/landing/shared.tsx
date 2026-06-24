import { ENDPOINTS } from "@/lib/site/endpoints";
import type { Message } from "@/types/message";

export interface LandingPageProps {
  baseUrl: string;
  apiVersion: string;
  categories: string[];
  initialMessage: Message;
}

export function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-950 p-4 text-sm leading-relaxed text-zinc-100 dark:border-zinc-800">
      <code>{children}</code>
    </pre>
  );
}

export function getTryUrl(baseUrl: string, path: string): string {
  if (path.includes(":id")) {
    return `${baseUrl}/api/v1/messages/1`;
  }

  if (path === "/api/v1/search") {
    return `${baseUrl}/api/v1/search?q=loading`;
  }

  return `${baseUrl}${path}`;
}

export { ENDPOINTS };
