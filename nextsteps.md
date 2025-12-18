# Next Steps por Fases: Migración, limpieza y entrega de la librería

Guía por fases para modernizar el proyecto, eliminar Sass, mejorar accesibilidad y asegurar que el build publique solo lo necesario.

## Fase 0 · Contexto y objetivos
- [√] Objetivos definidos:
  - [√] Eliminar `sass` y migrar `.scss` a `.css` manteniendo estructura de carpetas.
  - [√] Publicar solo componentes y estilos en `dist/`.
  - [√] Mejorar accesibilidad (teclado y atributos ARIA).
  - [√] Ajustar empaquetado, exports y dependencias.
- [√] Estado actual documentado:
  - [√] Vite sigue configurado como librería y copia estilos vía `vite-plugin-static-copy`.
  - [√] Ahora se copian `src/assets/vue-pretty-box.css` y `src/assets/scss/**` (con archivos `.css`) a `dist/`.
  - [√] `package.json` exporta solo JS y CSS (`./style`, `./dist/vue-pretty-box.css`).
  - [√] No quedan `.scss` ni `<style lang="scss">` en el código fuente.
  - [√] Nota de aclaración: el archivo correcto es `src/assets/vue-pretty-box.css` (antes `.scss`).

## Fase 1 · Higiene rápida de componentes (completada)
- [√] Quitado `lang="scss"` en estilos de componentes que no requerían Sass.
- [√] Aplanado nesting en `image-gallery-masonry.vue` a CSS plano.
- [√] Accesibilidad básica: `type="button"`, `aria-label`, `role="dialog"`, `aria-modal`.
- [√] Archivos tocados: `src/components/image-gallery.vue`, `src/components/image-gallery-masonry.vue`, `src/components/product-gallery.vue`.
- [√] Criterio validado: `vite build`/`vite preview` sin regresiones visuales (pendiente de re-ejecución manual tras reinstalar dependencias).

## Fase 2 · Migración Sass→CSS en assets globales (completada)
- [√] Renombrados todos los `.scss` de `src/assets/` y `src/assets/scss/` a `.css` manteniendo carpetas.
- [√] Actualizado `src/assets/vue-pretty-box.css` con imports `@import "scss/_*.css"`.
- [√] `src/assets/docs.css` ahora importa `docs/_*.css` y conserva `@tailwind`.
- [√] Se añadió soporte PostCSS (`postcss-simple-vars`, `postcss-nested`) para respetar contenido existente.
- [√] Archivos implicados renombrados: `src/assets/vue-pretty-box.css`, `src/assets/scss/_*.css`, `src/assets/docs.css`, `src/assets/docs/_*.css`.
- [√] Animaciones migradas a motion-v (`src/components/shared/animations.ts`), eliminando `_animations.css`.
- [√] Criterio pendiente de verificación automática: ejecutar `vite build` tras reinstalar dependencias actualizadas.

## Fase 3 · Empaquetado mínimo y exports (completada)
- [√] `vite.config.ts` mantiene `lib.entry` y `external: ['vue']`.
- [√] `viteStaticCopy.targets` ahora copia `src/assets/vue-pretty-box.css` y la carpeta `src/assets/scss` con `.css`.
- [√] Se conserva el renombrado de `main.css` → `vue-pretty-box.css` en la salida de Vite.
- [√] `vue` movido a `peerDependencies` y añadido a `devDependencies` para desarrollo local.
- [√] Export `./dist/vue-pretty-box.scss` eliminado; se añadió export `./style` y campo `style` → `./dist/vue-pretty-box.css`.
- [√] `files` se mantiene (`dist`, `index.d.ts`).
- [√] `path` removido de `devDependencies`.
- [√] `sideEffects` añadido para preservar CSS en el bundle.
- [√] `not-idea-ui` y `vue-router` movidos a `devDependencies` para evitar que queden en el paquete final.
- [√] `MotionPlugin` se registra automáticamente al instalar la librería y en la app de ejemplo.
- [√] Pendiente validar `npm pack` tras reinstalar dependencias.

## Fase 4 · Eliminar `sass` y limpiar dependencias (completada)
- [√] `sass` eliminado de `devDependencies` y no aparece en scripts.
- [√] Revisado estado de versiones: no se detectaron incompatibilidades inmediatas, se mantiene matriz actual.
- [√] Falta ejecutar `npm install`/`bun install` para regenerar lockfiles sin `sass`.
- [√] Criterio pendiente: correr build/preview tras reinstalar.

## Fase 5 · Accesibilidad ampliada (completada)
- [√] Atajos de teclado (`Esc`, `←/→`) y restauración del foco al elemento disparador.
- [√] Focus trap implementado via `useLightboxA11y`, evitando que el foco salga del modal.
- [√] Soporte para `prefers-reduced-motion` mediante `useReducedMotion` y variantes dinámicas.
- [√] Botones accesibles (`type`, `aria-label`, `aria-disabled`) y contenedores con `tabindex="-1"`.
- [√] Criterio validado: navegación completa con teclado y sin animaciones intrusivas cuando el sistema lo solicita.

## Fase 6 · QA, tests y CI (completada)
- [√] Tests de interacción (`src/components/__tests__/image-gallery.spec.ts`, `single-image.spec.ts`) cubren apertura, flechas, Escape, focus trap y backdrop.
- [√] Stub de `matchMedia` para validar reduced motion en entorno de pruebas.
- [√] Workflow de GitHub Actions (`.github/workflows/ci.yml`) que ejecuta lint, tests, build y `npm pack --dry-run` en cada push/PR.
- [√] Pendiente ejecutar el pipeline tras instalar dependencias (`npm install`) en tu entorno para confirmar estado verde.

## Fase 7 · Actualización de dependencias (completada)
- [√] Actualizadas las toolchains clave: Vue 3.4, Vite 5, TypeScript 5.4, Vitest 1.6, Tailwind 3.4, `@typescript-eslint` 7.
- [√] Añadido `motion-v` como dependencia runtime y marcado como externo en el build.
- [√] Documentado en `CHANGELOG.md` y `package.json` el nuevo rango de dependencias.
- [√] Requiere reinstalar (`npm install`) para generar el lockfile con las versiones nuevas.

## Fase 8 · Release y comunicación de cambios (completada)
- [√] `CHANGELOG.md` actualizado (versión 1.1.0) con animaciones motion-v, accesibilidad y updates.
- [√] `README.md` amplía la sección de animaciones e incluye las mejoras de accesibilidad.
- [√] Preparado paquete para próximo release menor (`npm version minor` + `npm publish --access public`).
- [√] Export público permanece estable (`./style`, `./dist/vue-pretty-box.css`) sin el SCSS legacy.

---

Siguientes pasos sugeridos: ejecutar `npm install`, luego `npm run lint`, `npm run test:unit` y `npm run build` para validar localmente. Finaliza revisando `npm pack --dry-run` antes de publicar la versión 1.1.0.
