import type { App } from "vue";
import { SingleImage, ImageGallery, ImageGalleryMasonry, ProductGallery } from "@/components/index";

export default {
  install: (app: App) => {
    app.component("SingleImage", SingleImage);
    app.component("ImageGallery", ImageGallery);
    app.component("ImageGalleryMasonry", ImageGalleryMasonry);
    app.component("ProductGallery", ProductGallery);
  }
};

export { SingleImage, ImageGallery, ImageGalleryMasonry, ProductGallery };
