<template>
  <section id="product-gallery" class="p-6 md:p-10 bg-gray-50">
    <h3 class="mb-2">Product gallery</h3>
    <p class="mb-5">
      Product gallery component you can zoom in on an image to see it near and better view it, also you have a slider in the modal to see other ones.
    </p>
    <div class="mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ProductGallery animation="fade" :imagesUrl="productsGallery" is-rounded bgBackdropClose />
        </div>
        <div>
          <ProductGallery animation="fade" :imagesUrl="productsGallery" is-vertical is-rounded bgBackdropClose />
        </div>
        <div>
          <CodeShow :code="useProductGallery" language="html" />
          <p class="mb-4">
            Accepted props:
            <span class="text-sky-500 font-semibold">
              animation, imagesUrl, isRounded/is-rounded, hasShadow/has-shadow, figcaption, space, isVertical, and bgBackdropClose
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>imagesUrl</td>
            <td>Array</td>
            <td>8 random Picsum photos</td>
            <td>
              URLs for the images to zoom in. Structure below:
              <CodeShow language="javascript" :code="arrayProductGallery" />
            </td>
          </tr>
          <tr>
            <td>animation</td>
            <td>String</td>
            <td>fade</td>
            <td>Animation to open modal with the image.</td>
          </tr>
          <tr>
            <td>isRounded</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Add little rounded corners.</td>
          </tr>
          <tr>
            <td>hasShadow</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Add a little shadow to the images.</td>
          </tr>
          <tr>
            <td>space</td>
            <td>String</td>
            <td>20px</td>
            <td>Gap space for each column, you can use <strong>px, rem, em</strong>, etc.</td>
          </tr>
          <tr>
            <td>bgBackdropClose</td>
            <td>Boolean</td>
            <td>false</td>
            <td>You can close the image modal by clicking the background.</td>
          </tr>
          <tr>
            <td>isVertical</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Use it if you want to put the images carousel vertically.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ProductGallery } from "@/components/index";
import CodeShow from "@/lib/codeShow";

const useProductGallery = `<ProductGallery
  animation="..." imageUrl="..."
  is-rounded has-shadow
/>`;

const arrayProductGallery = `[{ img: "...", alt: "...", figcaption: "..." }]`;

const productsGallery = [
  {
    img: "https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1529788295308-1eace6f67388?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1464802686167-b939a6910659?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=850",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1457364887197-9150188c107b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  }
];
</script>
