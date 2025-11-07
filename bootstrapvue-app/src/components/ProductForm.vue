<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label>Nombre</label>
      <input name="nombre" v-model="local.nombre" required minlength="2" />
    </div>
    <div>
      <label>Descripcion</label>
      <input name="descripcion" v-model="local.descripcion" />
    </div>
    <div>
      <label>Precio</label>
      <input name="precio" type="number" v-model.number="local.precio" min="0" />
    </div>
    <div style="margin-top:8px;">
      <button type="submit">Guardar</button>
      <button type="button" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'
const props = defineProps({ model: Object })
const emit = defineEmits(['save','cancel'])
const local = reactive({ id: null, nombre: '', descripcion: '', precio: 0 })

watch(() => props.model, (v) => {
  if (v) Object.assign(local, v)
})

function onSubmit(){
  if(!local.nombre || local.nombre.length < 2) return
  emit('save', { ...local })
  // reset form
  local.id = null; local.nombre = ''; local.descripcion = ''; local.precio = 0
}
</script>
