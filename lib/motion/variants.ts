export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
} as const;

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const defaultTransition = {
  duration: 0.5,
  ease: easeOut,
} as const;
