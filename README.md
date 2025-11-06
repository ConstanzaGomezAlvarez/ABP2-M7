# Te lo Vendo - Sitio Web

## Componentes y tests
- El componente `Header` ahora es un componente Vue Single-File Component ubicado en `src/components/Header.vue`.
- El antiguo archivo `src/components/Header.js` fue eliminado porque quedó obsoleto.

### Tests
Se utiliza Jest con `@vue/test-utils` y `@vue/vue3-jest` para testear componentes Vue.

Para ejecutar los tests localmente:

```powershell
cd 'C:\Users\mornc\Documents\GitHub\TeLoVendo_FrontEnd_UNAB'
npm install
npm test
```

Estos comandos instalan las dependencias de desarrollo (Jest, Vue Test Utils, transformadores para `.vue`) y ejecutan la suite de pruebas.

### Qué prueban las specs
- `tests/header.spec.js` comprueba que el componente `Header` recibe la prop `title` y que recibe `title` y `color` simultáneamente (y aplica el color al elemento `h1`).

## Notas adicionales
- Si prefieres usar `import`/`export` en lugar de CommonJS, se puede migrar la configuración de Jest a ESM con ajustes extra.
- Recomiendo añadir una acción de CI (GitHub Actions) que ejecute `npm test` en cada push/PR para mantener la calidad.

---
