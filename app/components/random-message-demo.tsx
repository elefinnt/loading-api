"use client";

import { useCallback, useState } from "react";
import type { Message } from "@/types/message";

interface RandomMessageDemoProps {
  initialMessage: Message;
}

export function RandomMessageDemo({ initialMessage }: RandomMessageDemoProps) {
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandom = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/random");
      const json = await response.json();

      if (json.success) {
        setMessage(json.data);
      } else {
        setError(json.error ?? "Something went wrong");
      }
    } catch {
      setError("Could not reach the API");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Live preview
        </p>
        <button
          type="button"
          onClick={() => void fetchRandom()}
          disabled={loading}
          className="rounded-full border border-zinc-300 px-3 py-1 text-sm font-medium transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          {loading ? "Loading…" : "Another one"}
        </button>
      </div>

      <div className="min-h-[4.5rem]">
        {error ? (
          <p className="text-red-600 dark:text-red-400">{error}</p>
        ) : (
          <>
            <p
              className={`text-lg leading-relaxed text-zinc-900 dark:text-zinc-100 ${loading ? "opacity-50" : ""}`}
            >
              {message.message}
            </p>
            <p className="mt-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
              #{message.id} · {message.category}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
