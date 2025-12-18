import { mount } from "@vue/test-utils";
import { describe, expect, it, beforeAll } from "vitest";
import { nextTick } from "vue";
import { MotionPlugin } from "motion-v";

import ImageGallery from "../image-gallery.vue";

const images = [
  { img: "https://picsum.photos/1280/720?random=1", alt: "Image 1", figcaption: "Caption 1" },
  { img: "https://picsum.photos/1280/720?random=2", alt: "Image 2", figcaption: "Caption 2" },
  { img: "https://picsum.photos/1280/720?random=3", alt: "Image 3", figcaption: "Caption 3" }
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

const mountGallery = () =>
  mount(ImageGallery, {
    props: {
      imagesUrl: images,
      animation: "fade",
      bgBackdropClose: true
    },
    global: {
      plugins: [MotionPlugin]
    }
  });

describe("ImageGallery", () => {
  it("abre el lightbox y enfoca el botón de cerrar", async () => {
    const wrapper = mountGallery();
    const trigger = wrapper.findAll("img")[0];

    await trigger.trigger("click");
    await nextTick();
    await nextTick();

    const closeButton = document.querySelector<HTMLButtonElement>(".close-button");
    expect(closeButton).not.toBeNull();
    expect(document.activeElement).toBe(closeButton!);

    wrapper.unmount();
  });

  it("navega con las flechas de teclado", async () => {
    const wrapper = mountGallery();
    await wrapper.findAll("img")[0].trigger("click");
    await nextTick();

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    await nextTick();

    let displayed = document.querySelector<HTMLElement>(".image-gallery-prettybox img");
    expect(displayed?.getAttribute("src")).toContain("random=2");

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    await nextTick();

    displayed = document.querySelector<HTMLElement>(".image-gallery-prettybox img");
    expect(displayed?.getAttribute("src")).toContain("random=1");

    wrapper.unmount();
  });

  it("cierra con Escape y devuelve el foco al disparador", async () => {
    const wrapper = mountGallery();
    const trigger = wrapper.findAll("img")[0];

    await trigger.trigger("click");
    await nextTick();

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await nextTick();

    expect(wrapper.find(".image-gallery-prettybox").exists()).toBe(false);
    await nextTick();
    expect(document.activeElement).toBe(trigger.element);

    wrapper.unmount();
  });

  it("mantiene el foco dentro del lightbox", async () => {
    const wrapper = mountGallery();
    await wrapper.findAll("img")[0].trigger("click");
    await nextTick();

    const dialog = document.querySelector<HTMLElement>(".image-gallery-prettybox");
    const rightButton = document.querySelector<HTMLButtonElement>(".right-button");
    const closeButton = document.querySelector<HTMLButtonElement>(".close-button");

    expect(dialog).not.toBeNull();
    expect(closeButton).not.toBeNull();

    dialog!.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", shiftKey: true, bubbles: true }));
    await nextTick();
    expect(document.activeElement).toBe(rightButton);

    dialog!.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
    await nextTick();
    expect(document.activeElement).toBe(closeButton);

    wrapper.unmount();
  });

  it("cierra al hacer clic en el backdrop cuando está permitido", async () => {
    const wrapper = mountGallery();
    await wrapper.findAll("img")[0].trigger("click");
    await nextTick();

    const backdrop = document.querySelector<HTMLElement>(".bg-backdrop");
    backdrop?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await nextTick();

    expect(wrapper.find(".image-gallery-prettybox").exists()).toBe(false);

    wrapper.unmount();
  });
});
