<script setup>
const { data: posts } = await useFetch('https://jsonplaceholder.typicode.com/posts?_limit=6')
</script>
<template>
  <div style="max-width:900px;margin:24px auto;font-family:Arial, Helvetica, sans-serif;">
    <h1>Nuxt 3 — Página SSR</h1>
    <p>Ejemplo que usa <code>useFetch</code> para obtener datos en SSR.</p>
    <ul>
      <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
    </ul>
  </div>
</template>
