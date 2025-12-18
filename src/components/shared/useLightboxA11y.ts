import { nextTick, onBeforeUnmount, ref, type Ref, watch } from "vue";

const focusableSelector = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

export interface UseLightboxA11yOptions {
  isOpen: Ref<boolean>;
  dialogRef: Ref<HTMLElement | null>;
  closeButtonRef: Ref<HTMLButtonElement | null>;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: () => boolean;
  canNext?: () => boolean;
}

export const useLightboxA11y = (options: UseLightboxA11yOptions) => {
  const previouslyFocused = ref<HTMLElement | null>(null);
  let activeDialog: HTMLElement | null = null;

  const getFocusableElements = () => {
    if (!activeDialog) return [] as HTMLElement[];
    const nodes = Array.from(activeDialog.querySelectorAll<HTMLElement>(focusableSelector));
    return nodes.filter((element) => !element.hasAttribute("inert"));
  };

  const handleFocusTrap = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const focusable = getFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const isShiftPressed = event.shiftKey;
    const activeElement = document.activeElement as HTMLElement | null;

    if (!isShiftPressed && activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (isShiftPressed && activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (!options.isOpen.value) return;
    switch (event.key) {
      case "Escape":
        event.preventDefault();
        options.onClose();
        break;
      case "ArrowLeft":
        if (options.onPrev && (options.canPrev ? options.canPrev() : true)) {
          event.preventDefault();
          options.onPrev();
        }
        break;
      case "ArrowRight":
        if (options.onNext && (options.canNext ? options.canNext() : true)) {
          event.preventDefault();
          options.onNext();
        }
        break;
      default:
        break;
    }
  };

  watch(
    options.isOpen,
    (isOpen) => {
      if (isOpen) {
        previouslyFocused.value = document.activeElement as HTMLElement | null;
        window.addEventListener("keydown", handleKeydown);

        nextTick(() => {
          activeDialog = options.dialogRef.value;
          activeDialog?.addEventListener("keydown", handleFocusTrap);
          options.closeButtonRef.value?.focus();
        });
      } else {
        window.removeEventListener("keydown", handleKeydown);
        activeDialog?.removeEventListener("keydown", handleFocusTrap);
        activeDialog = null;

        nextTick(() => {
          previouslyFocused.value?.focus();
        });
      }
    },
    { flush: "post" }
  );

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeydown);
    activeDialog?.removeEventListener("keydown", handleFocusTrap);
  });

  const captureTrigger = (event?: Event) => {
    previouslyFocused.value = (event?.currentTarget as HTMLElement) ?? (document.activeElement as HTMLElement | null);
  };

  return { captureTrigger };
};
