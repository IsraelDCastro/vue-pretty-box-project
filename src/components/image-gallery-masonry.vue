<script setup lang="ts">
import RightIcon from "@/components/icons/right-icon.vue";
import LeftIcon from "@/components/icons/left-icon.vue";
import CloseIcon from "@/components/icons/close-icon.vue";

import { Motion } from "motion-v";
import { computed, ref } from "vue";
import type { AnimationOpts } from "@/components/shared/types";
import { resolveVariant } from "@/components/shared/animations";
import { useReducedMotion } from "@/components/shared/useReducedMotion";
import { useLightboxA11y } from "@/components/shared/useLightboxA11y";

interface Props {
  imagesUrl: { img: string; alt: string; figcaption: string }[];
  animation?: AnimationOpts;
  isRounded?: boolean;
  isCircled?: boolean;
  hasShadow?: boolean;
  bgBackdropClose?: boolean;
  columns?: number;
  mdColumns?: number;
  xsColumns?: number;
  space?: string;
}

const props = withDefaults(defineProps<Props>(), {
  imagesUrl: () => {
    return [
      { img: "https://picsum.photos/1280/720?random=1", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/720/1280?random=2", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/720/720?random=3", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/1280/720?random=4", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/720/720?random=5", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/720/1280?random=6", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/1280/720?random=7", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/720/1280?random=8", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" }
    ];
  },
  animation: "fade",
  isRounded: false,
  isCircled: false,
  hasShadow: false,
  bgBackdropClose: false,
  columns: 4,
  mdColumns: 3,
  xsColumns: 2,
  space: "20px"
});

const openImageGalleryBox = ref(false);
const position = ref(0);

const dialogRef = ref<HTMLElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);

const reducedMotion = useReducedMotion();

const clampPosition = (index: number) => {
  if (!props.imagesUrl.length) return 0;
  const min = 0;
  const max = props.imagesUrl.length - 1;
  return Math.min(Math.max(index, min), max);
};

const closeLightbox = () => {
  openImageGalleryBox.value = false;
};

const prev = () => {
  if (position.value > 0) position.value -= 1;
};

const next = () => {
  if (position.value < props.imagesUrl.length - 1) position.value += 1;
};

const { captureTrigger } = useLightboxA11y({
  isOpen: openImageGalleryBox,
  dialogRef,
  closeButtonRef,
  onClose: closeLightbox,
  onPrev: prev,
  onNext: next,
  canPrev: () => position.value > 0,
  canNext: () => position.value < props.imagesUrl.length - 1
});

const openLightbox = (indexPosition: number, event?: MouseEvent) => {
  if (!props.imagesUrl.length) return;
  captureTrigger(event);
  position.value = clampPosition(indexPosition);
  openImageGalleryBox.value = true;
};

const closeBackdrop = () => {
  if (props.bgBackdropClose) closeLightbox();
};

const currentImage = computed(() => props.imagesUrl[position.value]);

const animationVariant = computed(() => resolveVariant(props.animation ?? "fade", reducedMotion.value));
const sliderVariant = computed(() => resolveVariant("slider-item", reducedMotion.value));
const backdropVariant = computed(() => resolveVariant("fade", reducedMotion.value));
</script>

<template>
  <div class="image-gallery-masonry-wrap">
    <figure v-for="(image, index) in props.imagesUrl" :key="index" class="image-gallery-masonry">
      <img
        :src="image.img"
        :alt="image.alt"
        class="image"
        :class="[{ 'is-rounded': props.isRounded }, { 'is-circled': props.isCircled }, { 'has-shadow': props.hasShadow }]"
        loading="lazy"
        @click="openLightbox(index, $event)"
      />
    </figure>
    <Motion
      v-if="openImageGalleryBox"
      ref="dialogRef"
      class="image-gallery-prettybox"
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
      <button class="left-button" type="button" :disabled="position === 0" :aria-disabled="position === 0" aria-label="Anterior" @click="prev">
        <LeftIcon />
      </button>
      <button class="right-button" type="button" :disabled="position === props.imagesUrl.length - 1" :aria-disabled="position === props.imagesUrl.length - 1" aria-label="Siguiente" @click="next">
        <RightIcon />
      </button>
      <Motion
        v-if="currentImage"
        :key="position"
        tag="figure"
        class="image-gallery"
        :initial="sliderVariant.initial"
        :animate="sliderVariant.animate"
        :exit="sliderVariant.exit"
      >
        <img
          :src="currentImage?.img"
          :alt="currentImage?.alt"
          class="image"
          :class="[{ 'is-rounded': props.isRounded }, { 'is-circled': props.isCircled }, { 'has-shadow': props.hasShadow }]"
          loading="lazy"
        />
        <figcaption v-if="currentImage?.figcaption">
          {{ currentImage?.figcaption }}
        </figcaption>
      </Motion>
    </Motion>
  </div>
</template>

<style scoped>
.image-gallery-masonry-wrap {
  columns: v-bind(columns);
}
.image-gallery-masonry-wrap {
  gap: v-bind(space);
}
.image-gallery-masonry-wrap .image-gallery-masonry:not(:last-child) {
  margin-bottom: v-bind(space);
}
@media only screen and (max-width: 989px) {
  .image-gallery-masonry-wrap {
    columns: v-bind(mdColumns);
  }
}

@media only screen and (max-width: 575px) {
  .image-gallery-masonry-wrap {
    columns: v-bind(xsColumns);
  }
}
</style>
