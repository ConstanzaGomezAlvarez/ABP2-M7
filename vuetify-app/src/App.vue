<template>
  <div style="max-width:900px; margin:24px auto; font-family:Arial, Helvetica, sans-serif;">
    <h2>Gestor simple de productos — {{ title }}</h2>
    <product-list :items="products" @create="openCreate" @edit="onEdit" @delete="onDelete" />
    <div v-if="editing" style="margin-top:16px; border-top:1px solid #ddd; padding-top:12px;">
      <h3>{{ editing.id ? 'Editar' : 'Crear' }} producto</h3>
      <product-form :model="editing" @save="onSave" @cancel="onCancel" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductForm from './components/ProductForm.vue'
import ProductList from './components/ProductList.vue'

const title = 'vuetify-app'
const products = ref([])
const editing = ref(null)

const STORAGE_KEY = 'm7ae5_products_v1'

function load(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    products.value = raw ? JSON.parse(raw) : []
  }catch(e){ products.value = [] }
}

function saveStorage(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products.value))
}

onMounted(load)

function openCreate(){ editing.value = { id: null, nombre:'', descripcion:'', precio:0 } }
function onEdit(p){ editing.value = { ...p } }
function onDelete(id){
  products.value = products.value.filter(x => x.id !== id)
  saveStorage()
  alert('Producto eliminado')
}

function onSave(payload){
  if(payload.id){
    const idx = products.value.findIndex(x => x.id === payload.id)
    if(idx !== -1) products.value[idx] = payload
  } else {
    payload.id = Date.now()
    products.value.push(payload)
  }
  saveStorage()
  editing.value = null
  alert('Producto guardado')
}

function onCancel(){ editing.value = null }
</script>
