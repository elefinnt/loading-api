"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { RandomMessageDemo } from "@/app/components/random-message-demo";
import {
  CodeBlock,
  ENDPOINTS,
  getTryUrl,
  type LandingPageProps,
} from "@/app/components/landing/shared";
import { defaultTransition, easeOut, fadeInUp } from "@/lib/motion/variants";

const sectionTransition = (delay: number) => ({
  duration: defaultTransition.duration,
  ease: easeOut,
  delay,
});

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

function AnimatedSection({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={fadeInUp.hidden}
      animate={fadeInUp.visible}
      transition={sectionTransition(delay)}
    >
      {children}
    </motion.div>
  );
}

export function LandingPageAnimated(props: LandingPageProps) {
  const { baseUrl, apiVersion, categories, initialMessage } = props;

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
                A free REST API for witty loading messages. Drop a random line
                into your spinner, splash screen, or CLI and make waiting
                slightly less boring.
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
              <motion.div
                className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800"
                initial="hidden"
                animate="visible"
                variants={listVariants}
              >
                {ENDPOINTS.map((endpoint) => (
                  <motion.div
                    key={endpoint.path}
                    variants={fadeInUp}
                    transition={defaultTransition}
                  >
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
                  </motion.div>
                ))}
              </motion.div>
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
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                animate="visible"
                variants={listVariants}
              >
                {categories.map((category) => (
                  <motion.div key={category} variants={fadeInUp} transition={defaultTransition}>
                    <span className="inline-block rounded-full border border-zinc-200 px-3 py-1 font-mono text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                      {category}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </AnimatedSection>
        </main>

        <AnimatedSection delay={0.38}>
          <footer className="border-t border-zinc-200 px-6 py-8 dark:border-zinc-800">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
              <p>MIT Licence · built with Next.js</p>
              <a
                href={`${baseUrl}/api/health`}
                className="font-mono hover:text-zinc-950 dark:hover:text-zinc-50"
              >
                /api/health
              </a>
            </div>
          </footer>
        </AnimatedSection>
    </div>
  );
}
