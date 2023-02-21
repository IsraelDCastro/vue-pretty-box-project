<script setup lang="ts">
import { ref } from "vue";
import type { AnimationOpts } from "@/components/shared/types";
import RightIcon from "@/components/icons/right-icon.vue";
import LeftIcon from "@/components/icons/left-icon.vue";
import CloseIcon from "@/components/icons/close-icon.vue";

const openProductGalleryBox = ref<boolean>(false);
const position = ref<number>(0);

const openCloseProductGalleryBox = (indexPosition?: number) => {
  openProductGalleryBox.value = !openProductGalleryBox.value;
  position.value = indexPosition || 0;
};

const closeBackdrop = () => (props.bgBackdropClose ? (openProductGalleryBox.value = !openProductGalleryBox.value) : null);
const prev = () => (position.value -= 1);
const next = () => (position.value += 1);

interface Props {
  imagesUrl: { img: string; alt: string; figcaption: string }[];
  animation?: AnimationOpts;
  isRounded?: boolean;
  isCircled?: boolean;
  hasShadow?: boolean;
  bgBackdropClose?: boolean;
  isVertical?: boolean;
  space?: string;
}

const props = withDefaults(defineProps<Props>(), {
  imagesUrl: () => {
    return [
      { img: "https://picsum.photos/1280/720?random=1", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/1280/720?random=2", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/1280/720?random=3", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/1280/720?random=4", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/1280/720?random=5", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/1280/720?random=6", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/1280/720?random=7", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" },
      { img: "https://picsum.photos/1280/720?random=8", alt: "Lorem ipsum", figcaption: "Lorem ipsum dolor sit amet" }
    ];
  },
  animation: "fade",
  isRounded: false,
  hasShadow: false,
  bgBackdropClose: false,
  space: "10px",
  isVertical: false
});
</script>
<template>
  <div class="product-gallery-wrap" :class="[{ 'is-vertical': props.isVertical }]">
    <figure class="main-product-gallery">
      <img
        :src="props.imagesUrl[0].img"
        :alt="props.imagesUrl[0].alt"
        class="image"
        :class="[{ 'is-rounded': props.isRounded }, { 'is-circled': props.isCircled }, { 'has-shadow': props.hasShadow }]"
        loading="lazy"
        @click="openCloseProductGalleryBox(0)" />
    </figure>
    <div class="carousel-product-image">
      <figure v-for="(image, index) in props.imagesUrl" :key="index" class="product-gallery">
        <img
          :src="image.img"
          :alt="image.alt"
          class="image carousel-item"
          :class="[{ 'is-rounded': props.isRounded }, { 'is-circled': props.isCircled }, { 'has-shadow': props.hasShadow }]"
          loading="lazy"
          @click="openCloseProductGalleryBox(Number(index))" />
      </figure>
    </div>
    <Transition :name="props.animation" mode="out-in">
      <div v-if="openProductGalleryBox" class="product-gallery-prettybox">
        <Transition name="backdrop" mode="out-in" appear>
          <div class="bg-backdrop" @click="closeBackdrop" />
        </Transition>
        <button class="close-button" @click="openCloseProductGalleryBox(0)">
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
.product-gallery-wrap {
  gap: v-bind(space);
}
</style>
