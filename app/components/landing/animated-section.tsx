"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { defaultTransition, easeOut, fadeInUp } from "@/lib/motion/variants";
import { useIsClient } from "@/lib/motion/use-is-client";

const sectionTransition = (delay: number) => ({
  duration: defaultTransition.duration,
  ease: easeOut,
  delay,
});

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const isClient = useIsClient();

  return (
    <motion.div
      className={className}
      initial={fadeInUp.hidden}
      animate={isClient ? fadeInUp.visible : fadeInUp.hidden}
      transition={sectionTransition(isClient ? delay : 0)}
    >
      {children}
    </motion.div>
  );
}

export const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedList({ children, className }: AnimatedListProps) {
  const isClient = useIsClient();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isClient ? "visible" : "hidden"}
      variants={listVariants}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedItem({ children, className }: AnimatedItemProps) {
  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      transition={defaultTransition}
    >
      {children}
    </motion.div>
  );
}
