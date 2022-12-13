<template>
  <section id="image-gallery" class="p-6 md:p-10 bg-gray-50">
    <h3 class="mb-2">Image gallery</h3>
    <p class="mb-5">
      Image gallery component you can zoom in on an image to see it near and better view it, also you have a slider in the modal to see other ones.
    </p>
    <div class="mb-8">
      <div class="flex flex-col flex-wrap mb-4 md:flex-row md:space-x-4">
        <div class="field">
          <label for="" class="label">Desktop columns</label>
          <input type="number" min="1" v-model="columnsDesk" class="input" />
        </div>
        <div class="field">
          <label for="" class="label">Space columns</label>
          <input type="text" v-model="space" class="input" />
        </div>
        <div class="field">
          <label for="" class="label">Square images</label>
          <div class="checkbox">
            <input type="checkbox" v-model="activeSquare" id="checkbox" class="checkbox" name="checkbox" />
            <label for="checkbox" class="label">Active square</label>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap space-y-6 md:flex-nowrap md:space-y-0 md:space-x-6">
        <div class="flex-1 w-full basis-full md:basis-8/12 md:w-8/12">
          <ImageGallery
            animation="fade"
            :imagesUrl="imagesGallery"
            is-rounded
            :columns="columnsDesk"
            :squared="activeSquare"
            :space="space"
            bgBackdropClose />
        </div>
        <div class="flex-1 w-full basis-full md:basis-4/12 md:w-4/12">
          <div>
            <CodeShow :code="useImageGallery" language="html" />
            <p class="mb-4">
              Accepted props:
              <span class="font-semibold text-sky-500">
                animation, imagesUrl, isRounded/is-rounded, isCircled/is-circled, hasShadow/has-shadow, squared, figcaption, columns, mdColumns,
                xsColumns, space and bgBackdropClose
              </span>
            </p>
          </div>
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
              <CodeShow language="javascript" :code="arrayImagesGallery" />
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
            <td>isCircled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Make a circle with the image, it works better with a square image.</td>
          </tr>
          <tr>
            <td>hasShadow</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Add a little shadow to the images.</td>
          </tr>
          <tr>
            <td>squared</td>
            <td>Boolean</td>
            <td>false</td>
            <td>All images are squared.</td>
          </tr>
          <tr>
            <td>columns</td>
            <td>Number</td>
            <td>4</td>
            <td>Quantity of columns on desktop.</td>
          </tr>
          <tr>
            <td>mdColumns</td>
            <td>Number</td>
            <td>3</td>
            <td>Quantity of columns on tablet.</td>
          </tr>
          <tr>
            <td>xsColumns</td>
            <td>Number</td>
            <td>2</td>
            <td>Quantity of columns on mobile.</td>
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
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ImageGallery } from "@/components/index";
import CodeShow from "@/lib/codeShow";
import { ref } from "vue";

const columnsDesk = ref(4);
const space = ref("20px");
const activeSquare = ref(false);

const useImageGallery = `<ImageGallery
  animation="..." imageUrl="..."
  is-rounded has-shadow
/>`;

const arrayImagesGallery = `[{ img: "...", alt: "...", figcaption: "..." }]`;

const imagesGallery = [
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
