<script setup lang="ts">
// import { CloseIcon, LeftIcon, RightIcon } from "./icons";
import { ref } from "vue";
import type { AnimationOpts } from "@/components/shared/types";

const openImageGalleryBox = ref<boolean>(false);
const position = ref<number>(0);

const openCloseImageGalleryBox = (indexPosition?: number) => {
  openImageGalleryBox.value = !openImageGalleryBox.value;
  position.value = indexPosition || 0;
};

const closeBackdrop = () => (props.bgBackdropClose ? (openImageGalleryBox.value = !openImageGalleryBox.value) : null);
const prev = () => (position.value -= 1);
const next = () => (position.value += 1);

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
        @click="openCloseImageGalleryBox(index)" />
    </figure>
    <Transition :name="props.animation" mode="out-in">
      <div v-if="openImageGalleryBox" class="image-gallery-prettybox">
        <Transition name="backdrop" mode="out-in" appear>
          <div class="bg-backdrop" @click="closeBackdrop" />
        </Transition>
        <button class="close-button" @click="openCloseImageGalleryBox(0)">
          <CloseIcon />
        </button>
        <button class="left-button" :disabled="position === 0" @click="prev">
          <LeftIcon />
        </button>
        <button class="right-button" :disabled="position === props.imagesUrl.length - 1" @click="next">
          <RightIcon />
        </button>
        <template v-for="(image, indexImg) in props.imagesUrl" :key="indexImg">
          <TransitionGroup name="slider-item" mode="out-in">
            <figure v-if="indexImg === position" :key="indexImg" class="image-gallery">
              <img
                :src="image.img"
                :alt="image.alt"
                class="image"
                :class="[{ 'is-rounded': props.isRounded }, { 'is-circled': props.isCircled }, { 'has-shadow': props.hasShadow }]"
                loading="lazy" />
              <figcaption v-if="image.figcaption">
                {{ image.figcaption }}
              </figcaption>
            </figure>
          </TransitionGroup>
        </template>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.image-gallery-masonry-wrap {
  columns: v-bind(columns);
}
.image-gallery-masonry-wrap {
  gap: v-bind(space);
  .image-gallery-masonry {
    &:not(:last-child) {
      margin-bottom: v-bind(space);
    }
  }
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
