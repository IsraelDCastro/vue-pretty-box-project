import { onBeforeUnmount, onMounted, ref } from "vue";

export const useReducedMotion = () => {
  const prefersReducedMotion = ref(false);

  const setupMatchMedia = () => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");

    prefersReducedMotion.value = mediaQueryList.matches;

    const listener = (event: MediaQueryListEvent) => {
      prefersReducedMotion.value = event.matches;
    };

    if (typeof mediaQueryList.addEventListener === "function") {
      mediaQueryList.addEventListener("change", listener);
      onBeforeUnmount(() => {
        mediaQueryList.removeEventListener?.("change", listener);
      });
    } else if (typeof mediaQueryList.addListener === "function") {
      mediaQueryList.addListener(listener);
      onBeforeUnmount(() => {
        mediaQueryList.removeListener?.(listener);
      });
    }
  };

  onMounted(setupMatchMedia);

  return prefersReducedMotion;
};
