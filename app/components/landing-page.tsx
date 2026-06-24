"use client";

import { RandomMessageDemo } from "@/app/components/random-message-demo";
import {
  AnimatedItem,
  AnimatedList,
  AnimatedSection,
} from "@/app/components/landing/animated-section";
import {
  CodeBlock,
  ENDPOINTS,
  getTryUrl,
  type LandingPageProps,
} from "@/app/components/landing/shared";

export function LandingPage({
  baseUrl,
  apiVersion,
  categories,
  initialMessage,
}: LandingPageProps) {
  return (
    <div className="flex flex-1 flex-col">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-16 sm:px-8 sm:py-24">
        <AnimatedSection>
          <header className="space-y-4">
            <p className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
              v{apiVersion} · 500 messages · no auth required
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
              Loading API
            </h1>
            <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              A free REST API for witty loading messages. Drop a random line into
              your spinner, splash screen, or CLI and make waiting slightly less
              boring.
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <RandomMessageDemo initialMessage={initialMessage} />
        </AnimatedSection>

        <AnimatedSection delay={0.14}>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              Quick start
            </h2>
            <CodeBlock>{`curl ${baseUrl}/api/v1/random`}</CodeBlock>
            <CodeBlock>{`const { data } = await fetch("${baseUrl}/api/v1/random")
  .then((response) => response.json());

console.log(data.message);`}</CodeBlock>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              Endpoints
            </h2>
            <AnimatedList className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
              {ENDPOINTS.map((endpoint) => (
                <AnimatedItem key={endpoint.path}>
                  <div className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <p className="font-mono text-sm text-zinc-950 dark:text-zinc-50">
                        <span className="mr-3 text-emerald-600 dark:text-emerald-400">
                          {endpoint.method}
                        </span>
                        {endpoint.path}
                      </p>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {endpoint.description}
                      </p>
                    </div>
                    <a
                      href={getTryUrl(baseUrl, endpoint.path)}
                      className="shrink-0 text-sm font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
                    >
                      Try it
                    </a>
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedList>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.26}>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              Response format
            </h2>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              All versioned endpoints return JSON with a consistent envelope.
            </p>
            <CodeBlock>{`{
  "success": true,
  "data": {
    "id": 17,
    "message": "Running npm install on the universe...",
    "category": "developer"
  }
}`}</CodeBlock>
          </section>
        </AnimatedSection>

        <AnimatedSection delay={0.32}>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              Categories
            </h2>
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              100 messages in each category. Filter with{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-900">
                ?category=
              </code>{" "}
              on{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-900">
                /api/v1/messages
              </code>
              .
            </p>
            <AnimatedList className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <AnimatedItem key={category}>
                  <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 font-mono text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                    {category}
                  </span>
                </AnimatedItem>
              ))}
            </AnimatedList>
          </section>
        </AnimatedSection>
      </main>

      <footer className="border-t border-zinc-200 px-6 py-8 dark:border-zinc-800">
        <AnimatedSection delay={0.38}>
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
            <p>MIT Licence · built with Next.js</p>
            <a
              href={`${baseUrl}/api/health`}
              className="font-mono hover:text-zinc-950 dark:hover:text-zinc-50"
            >
              /api/health
            </a>
          </div>
        </AnimatedSection>
      </footer>
    </div>
  );
}

export type { LandingPageProps };
