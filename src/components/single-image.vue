<script setup lang="ts">
import { computed, ref } from "vue";
import type { AnimationOpts } from "@/components/shared/types";
import CloseIcon from "@/components/icons/close-icon.vue";
import { Motion } from "motion-v";
import { resolveVariant } from "@/components/shared/animations";
import { useReducedMotion } from "@/components/shared/useReducedMotion";
import { useLightboxA11y } from "@/components/shared/useLightboxA11y";

interface Props {
  imageUrl: string;
  animation?: AnimationOpts;
  alt?: string;
  figcaption?: string;
  isRounded?: boolean;
  isCircled?: boolean;
  hasShadow?: boolean;
  bgBackdropClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  imageUrl: "https://picsum.photos/1280/720?random=1",
  animation: "fade",
  isRounded: false,
  isCircled: false,
  hasShadow: false,
  bgBackdropClose: false
});

const openSingleImageBox = ref(false);

const dialogRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);

const reducedMotion = useReducedMotion();

const closeLightbox = () => {
  openSingleImageBox.value = false;
};

const { captureTrigger } = useLightboxA11y({
  isOpen: openSingleImageBox,
  dialogRef,
  closeButtonRef,
  onClose: closeLightbox
});

const openLightbox = (event?: MouseEvent) => {
  captureTrigger(event);
  openSingleImageBox.value = true;
};

const closeBackdrop = () => {
  if (props.bgBackdropClose) closeLightbox();
};

const animationVariant = computed(() => resolveVariant(props.animation ?? "fade", reducedMotion.value));
const backdropVariant = computed(() => resolveVariant("fade", reducedMotion.value));
</script>

<template>
  <div class="single-image-wrap">
    <figure class="single-image" @click="openLightbox($event)">
      <img
        :src="props.imageUrl"
        :alt="props.alt"
        class="image"
        :class="[{ 'is-rounded': props.isRounded }, { 'is-circled': props.isCircled }, { 'has-shadow': props.hasShadow }]"
        loading="lazy"
      />
    </figure>
    <Motion
      v-if="openSingleImageBox"
      ref="dialogRef"
      class="single-image-prettybox"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      :initial="animationVariant.initial"
      :animate="animationVariant.animate"
      :exit="animationVariant.exit"
    >
      <Motion
        class="bg-backdrop"
        :initial="backdropVariant.initial"
        :animate="backdropVariant.animate"
        :exit="backdropVariant.exit"
        @click="closeBackdrop"
      />
      <button ref="closeButtonRef" class="close-button" type="button" aria-label="Cerrar" @click="closeLightbox">
        <CloseIcon />
      </button>
      <figure class="single-image">
        <img
          :src="props.imageUrl"
          :alt="props.alt"
          class="image"
          :class="[{ 'is-rounded': props.isRounded }, { 'is-circled': props.isCircled }, { 'has-shadow': props.hasShadow }]"
          loading="lazy"
        />
        <figcaption v-if="props.figcaption">
          {{ props.figcaption }}
        </figcaption>
      </figure>
    </Motion>
  </div>
</template>
