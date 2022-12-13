<template>
  <section id="image-gallery-masonry" class="p-6 md:p-10 bg-gray-50">
    <h3 class="mb-2">Image gallery masonry</h3>
    <p class="mb-5">
      Image gallery component you can zoom in on an image to see it near and better view it, also you have a slider in the modal to see other ones.
    </p>
    <div class="mb-8">
      <div class="flex flex-wrap md:flex-nowrap space-y-6 md:space-y-0 md:space-x-6">
        <div class="w-full basis-full md:basis-8/12 md:w-8/12 flex-1">
          <ImageGalleryMasonry :imagesUrl="imagesGallery" is-rounded />
        </div>
        <div class="w-full basis-full md:basis-4/12 md:w-4/12 flex-1">
          <div>
            <CodeShow :code="useImageGalleryMansory" language="html" />
            <p class="mb-4">
              Accepted props:
              <span class="text-sky-500 font-semibold">
                animation, imagesUrl, isRounded/is-rounded, isCircled/is-circled, hasShadow/has-shadow, figcaption, columns, mdColumns, xsColumns,
                space and bgBackdropClose
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
import { ImageGalleryMasonry } from "@/components/index";
import CodeShow from "@/lib/codeShow";

const useImageGalleryMansory = `<ImageGalleryMasonry
  animation="..." imageUrl="..."
  is-rounded has-shadow
/>`;

const arrayImagesGallery = `[{ img: "...", alt: "...", figcaption: "..." }]`;

const imagesGallery = [
  {
    img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=404&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1613539246066-78db6ec4ff0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1515923019249-6b544314450f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1555931156-73ca648e3c9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1579645899072-e14c6b840afa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1465990138262-b7c355d1ef90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  },
  {
    img: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    alt: "Lorem ipsum",
    figcaption: "Lorem ipsum dolor sit amet"
  }
];
</script>
