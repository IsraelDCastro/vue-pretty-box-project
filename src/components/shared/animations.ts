import type { AnimationOpts } from "@/components/shared/types";

export interface MotionState extends Record<string, unknown> {
  transition?: Record<string, unknown>;
}

export interface MotionVariant {
  initial: MotionState;
  animate: MotionState;
  exit: MotionState;
}

const baseFade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0 }
} satisfies MotionVariant;

const fadeInDown: MotionVariant = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

const fadeInUp: MotionVariant = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0, y: 60 }
};

const fadeInRight: MotionVariant = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0, x: -60 }
};

const fadeInLeft: MotionVariant = {
  initial: { opacity: 0, x: 60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  },
  exit: { opacity: 0, x: 60 }
};

const bounce: MotionVariant = {
  initial: { scale: [1, 1.2, 0.9, 1.1, 1] },
  animate: {
    scale: [1, 1.2, 0.9, 1.1, 1],
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: {
    scale: [1, 1.2, 0.9, 1.1, 1],
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const slideFade: MotionVariant = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.2 }
  }
};

const slideItem: MotionVariant = {
  initial: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3 }
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 }
  }
};

export const animationVariants: Record<AnimationOpts, MotionVariant> = {
  fade: baseFade,
  fadeDown: fadeInDown,
  fadeUp: fadeInUp,
  fadeRight: fadeInRight,
  fadeLeft: fadeInLeft,
  bounce,
  "slide-fade": slideFade,
  "slider-item": slideItem
};

const cloneState = (state: MotionState): MotionState => ({ ...state, transition: state.transition ? { ...state.transition } : state.transition });

const cloneVariant = (variant: MotionVariant): MotionVariant => ({
  initial: cloneState(variant.initial),
  animate: cloneState(variant.animate),
  exit: cloneState(variant.exit)
});

const withReducedMotion = (variant: MotionVariant, reduced: boolean) => {
  const cloned = cloneVariant(variant);
  if (!reduced) return cloned;

  if (cloned.animate.transition) {
    cloned.animate.transition.duration = 0;
  }

  if (cloned.exit.transition) {
    cloned.exit.transition.duration = 0;
  }

  return cloned;
};

export const resolveVariant = (animation: AnimationOpts, reducedMotion = false): MotionVariant =>
  withReducedMotion(animationVariants[animation], reducedMotion);

export const fadeBackdrop = baseFade;

export { baseFade as fadeIn, fadeInDown, fadeInLeft, fadeInRight, fadeInUp, bounce, slideFade, slideItem };
