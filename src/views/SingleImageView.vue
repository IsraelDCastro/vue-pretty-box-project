<template>
  <section id="single-image" class="p-6 md:p-10 bg-sky-50">
    <h3 class="mb-2">Single image</h3>
    <p class="mb-5">With this component, you can zoom in on an image to see it near and better view it.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="space-y-4">
        <SingleImage
          animation="slide-fade"
          image-url="https://picsum.photos/1280/720?random"
          figcaption="Figcaption example text."
          is-rounded
          bg-backdrop-close
          alt="Alt example for this image." />
      </div>
      <div>
        <CodeShow :code="useSingleImage" language="html" />
        <p class="mb-4">
          Accepted props:
          <span class="text-primary-700 font-semibold">
            animation, imageUrl, alt, isRounded/is-rounded, isCircled/is-circled, hasShadow/has-shadow, figcaption, and bgBackdropClose
          </span>
        </p>
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
            <td>imageUrl</td>
            <td>String</td>
            <td>https://picsum.photos/1280/720?random</td>
            <td>URL for the image to zoom in.</td>
          </tr>
          <tr>
            <td>animation</td>
            <td>String</td>
            <td>fade</td>
            <td>Animation to open modal with the image.</td>
          </tr>
          <tr>
            <td>alt</td>
            <td>String</td>
            <td>Empty</td>
            <td>Alt text for the image.</td>
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
            <td>Add a little shadow to the image.</td>
          </tr>
          <tr>
            <td>figcaption</td>
            <td>String</td>
            <td>Empty</td>
            <td>Add figcaption text to image, it is visible only when you open the image.</td>
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
import { SingleImage } from "@/components";
import CodeShow from "@/lib/codeShow";
const useSingleImage = `<SingleImage
  animation="..." imageUrl="..." alt="..."
  is-rounded has-shadow figcaption="..." bg-backdrop-close
/>`;
</script>
