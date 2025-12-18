import { mount } from "@vue/test-utils";
import { describe, expect, it, beforeAll } from "vitest";
import { nextTick } from "vue";
import { MotionPlugin } from "motion-v";

import SingleImage from "../single-image.vue";

const images = [
  { img: "https://picsum.photos/1280/720?random=1", figcaption: "Caption 1" }
];

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      onchange: null,
      dispatchEvent: () => false
    })
  });
});

describe("SingleImage", () => {
  it("cierra con Escape y devuelve el foco", async () => {
    const wrapper = mount(SingleImage, {
      props: {
        imageUrl: images[0].img,
        figcaption: images[0].figcaption,
        bgBackdropClose: true
      },
      global: {
        plugins: [MotionPlugin]
      }
    });

    const trigger = wrapper.find("img");
    await trigger.trigger("click");
    await nextTick();

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await nextTick();

    expect(wrapper.find(".single-image-prettybox").exists()).toBe(false);
    await nextTick();
    expect(document.activeElement).toBe(trigger.element);

    wrapper.unmount();
  });

  it("permite cerrar mediante el backdrop", async () => {
    const wrapper = mount(SingleImage, {
      props: {
        imageUrl: images[0].img,
        figcaption: images[0].figcaption,
        bgBackdropClose: true
      },
      global: {
        plugins: [MotionPlugin]
      }
    });

    await wrapper.find("img").trigger("click");
    await nextTick();

    document.querySelector<HTMLElement>(".bg-backdrop")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await nextTick();

    expect(wrapper.find(".single-image-prettybox").exists()).toBe(false);

    wrapper.unmount();
  });
});
