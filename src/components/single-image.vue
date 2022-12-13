<script setup lang="ts">
import { CloseIcon } from "./icons";
import { ref } from "vue";
import type { AnimationOpts } from "@/components/shared/types";

const openSingleImageBox = ref<boolean>(false);
const openCloseSingleImageBox = () => (openSingleImageBox.value = !openSingleImageBox.value);
const closeBackdrop = () => (props.bgBackdropClose ? (openSingleImageBox.value = !openSingleImageBox.value) : null);

interface Props {
  imageUrl: string;
  animation: AnimationOpts;
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
</script>

<template>
  <div class="single-image-wrap">
    <figure class="single-image" @click="openCloseSingleImageBox">
      <img
        :src="props.imageUrl"
        :alt="props.alt"
        class="image"
        :class="[{ 'is-rounded': props.isRounded }, { 'is-circled': props.isCircled }, { 'has-shadow': props.hasShadow }]"
        loading="lazy" />
    </figure>
    <Transition :name="props.animation" mode="out-in">
      <div class="single-image-prettybox" v-if="openSingleImageBox">
        <Transition name="backdrop" mode="out-in" appear>
          <div class="bg-backdrop" @click="closeBackdrop"></div>
        </Transition>
        <button class="close-button" @click="openCloseSingleImageBox">
          <CloseIcon />
        </button>
        <figure class="single-image">
          <img
            :src="props.imageUrl"
            :alt="props.alt"
            class="image"
            :class="[{ 'is-rounded': props.isRounded }, { 'is-circled': props.isCircled }, { 'has-shadow': props.hasShadow }]"
            loading="lazy" />
          <figcaption v-if="props.figcaption">
            {{ props.figcaption }}
          </figcaption>
        </figure>
      </div>
    </Transition>
  </div>
</template>
