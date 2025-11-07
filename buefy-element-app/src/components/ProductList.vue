<template>
  <div>
    <div style="display:flex; gap:8px; margin-bottom:8px;">
      <button @click="$emit('create')">Agregar producto</button>
      <button @click="clear()">Borrar todo</button>
    </div>
    <table border="1" cellpadding="6" cellspacing="0" width="100%">
      <thead><tr><th>Nombre</th><th>Descripcion</th><th>Precio</th><th>Acciones</th></tr></thead>
      <tbody>
        <tr v-for="p in items" :key="p.id">
          <td>{{ p.nombre }}</td>
          <td>{{ p.descripcion }}</td>
          <td>{{ p.precio }}</td>
          <td>
            <button @click="$emit('edit', p)">Editar</button>
            <button @click="$emit('delete', p.id)">Eliminar</button>
          </td>
        </tr>
        <tr v-if="items.length===0"><td colspan="4">No hay productos</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({ items: { type: Array, default: () => [] } })
</script>
