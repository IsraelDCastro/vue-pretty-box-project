import type { App } from "vue";
import { ImageGallery, ImageGalleryMasonry, ProductGallery, SingleImage } from "@/components/index";

export default {
  install: (app: App) => {
    app.component("SingleImage", SingleImage);
    app.component("ImageGallery", ImageGallery);
    app.component("ImageGalleryMasonry", ImageGalleryMasonry);
    app.component("ProductGallery", ProductGallery);
  }
};

export { ImageGallery, ImageGalleryMasonry, ProductGallery, SingleImage };
