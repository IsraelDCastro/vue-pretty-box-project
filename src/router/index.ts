import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SingleImageView from "@/views/SingleImageView.vue";
import ImageGalleryView from "@/views/ImageGalleryView.vue";
import ImageGalleryMasonryView from "@/views/ImageGalleryMasonryView.vue";
import ProductGalleryView from "@/views/ProductGalleryView.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView
  },
  {
    path: "/single-image",
    name: "Single Image",
    component: SingleImageView
  },
  {
    path: "/image-gallery",
    name: "Image Gallery",
    component: ImageGalleryView
  },
  {
    path: "/image-gallery-masonry",
    name: "Image Gallery Masonry",
    component: ImageGalleryMasonryView
  },
  {
    path: "/product-gallery",
    name: "Product Gallery",
    component: ProductGalleryView
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
