# M7-AE5-Proyectos-Vue3 (monorepo de ejemplos Vue 3)

Este repositorio contiene cuatro proyectos de ejemplo con diferentes bibliotecas de UI:

- `bootstrapvue-app` — Vue 3 + BootstrapVue
- `buefy-element-app` — Vue 3 + Bulma / Element Plus (nombres combinados del ejercicio)
- `nuxt-ssr-app` — Nuxt 3 (SSR)
- `vuetify-app` — Vue 3 + Vuetify

Este README explica cómo ejecutar los proyectos, correr tests y una sugerencia de CI (GitHub Actions).

## Requisitos locales

- Node.js LTS (recomiendo Node 18.x para máxima compatibilidad con las dependencias usadas). Tu máquina puede usar otra versión pero podrías ver advertencias de "unsupported engine".
- npm (v9+). En Windows usa PowerShell.

## Ejecutar un proyecto (PowerShell)

Ir a la carpeta del proyecto, instalar dependencias y ejecutar en desarrollo o tests:

```powershell
cd 'C:\Users\mornc\Downloads\M7-AE5-Proyectos-Vue3\M7-AE5-Proyectos-Vue3\vuetify-app'
npm install
npm run dev      # correr Vite en modo desarrollo
npm run build    # build producción
npm run preview  # previsualizar build
npm run test     # ejecutar tests (Vitest)
```

Repite los pasos anteriores cambiando la ruta a `bootstrapvue-app`, `buefy-element-app` o `nuxt-ssr-app`.

## Ejecutar tests en todos los proyectos (PowerShell)

Este script instala y ejecuta tests secuencialmente por proyecto. Ejecuta desde la raíz del repositorio:

```powershell
$projects = @('bootstrapvue-app','buefy-element-app','nuxt-ssr-app','vuetify-app')
foreach ($p in $projects) {
  Write-Host "\n=== $p ==="
  Push-Location $p
  npm install
  npm run test
  Pop-Location
}
```

(Opcional: en Bash)

```bash
for p in bootstrapvue-app buefy-element-app nuxt-ssr-app vuetify-app; do
  echo "== $p =="
  (cd "$p" && npm ci && npm run test)
done
```

## Notas y recomendaciones

- Vitest está configurado en cada proyecto mediante `vitest.config.ts` así que no es necesario pasar `--environment jsdom` manualmente.
- Si Vitest te pregunta por `jsdom` al ejecutar tests, instala `jsdom` como devDependency: `npm install --save-dev jsdom`.
- Si ves advertencias sobre "unsupported engine" revisa la versión de Node y considera usar `nvm` para cambiar a Node 18.
- Ejecuta `npm audit` y `npm audit fix` para revisar vulnerabilidades; algunas correcciones pueden requerir actualizaciones mayores.

## Sugerencia de CI (GitHub Actions)

Añadí un workflow de ejemplo en `.github/workflows/ci.yml` (si lo habilitas) que instala Node 18, ejecuta `npm ci` y `npm run test` para cada subproyecto. El workflow usa `actions/checkout` y `actions/setup-node`.

Si prefieres, puedo ajustar el workflow para instalar dependencias en paralelo (más rápido) o para publicar artefactos de build.

## Próximos pasos sugeridos

- Añadir un script raíz `test-all` o un `package.json` en la raíz que ejecute tests para todos los subproyectos.
- Añadir ESLint/Prettier y un `lint` script en cada proyecto.
- Crear una pipeline de CI más completa que ejecute `build` además de `test`, y cachee node_modules/registries para acelerar runs.

Si quieres que aplique alguna de las mejoras anteriores, dime cuál y la implemento.
