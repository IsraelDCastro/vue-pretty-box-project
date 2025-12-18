# Vue Prettybox

It is a tool dependency that allows you to open or zoom image just by click it. It helps you to view the image to have a better look of it without making zoom in on your browser.

## Getting started

### Installation

You can install vue-pretty-box using `yarn add vue-pretty-box`, `npm install vue-pretty-box`, or `pnpm install vue-pretty-box`.

### Import components

You can import the components with the following code:

```javascript
import {
  SingleImage,
  ImageGallery,
  ImageGalleryMasonry,
  ProductGallery
} from "vue-pretty-box";
```

### Import CSS

```css
@import "vue-pretty-box/vue-pretty-box.css";

/* or */

import "vue-pretty-box/dist/vue-pretty-box.css";
```

### Animaciones con motion-v

Las transiciones del lightbox ahora se gestionan con [motion-v](https://motion.unovue.com/). El plugin se instala automáticamente al usar `VuePrettyBox.install`, por lo que no necesitas configuración adicional.

### Accesibilidad y controles

- Navegación por teclado: `Esc` para cerrar, `←/→` para desplazarte entre imágenes.
- Focus trap integrado que mantiene el foco dentro del modal y lo devuelve al disparador original al cerrar.
- Respeto de la preferencia `prefers-reduced-motion` para reducir las animaciones cuando el usuario lo solicita.
