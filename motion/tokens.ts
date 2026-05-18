export const motionTokens = {
  duration: {
    micro: 0.16,
    base: 0.34,
    slow: 0.52,
    reveal: 0.62,
  },
  easing: {
    entry: [0.22, 1, 0.36, 1] as const,
    exit: [0.4, 0, 1, 1] as const,
    bounce: [0.34, 1.56, 0.64, 1] as const,
  },
  stagger: {
    micro: 0.04,
    base: 0.06,
    slow: 0.1,
  },
}
