<template>
  <div style="display:flex;gap:16px;align-items:center;border:1px solid #e0e0e0;padding:12px;border-radius:8px;">
    <img :src="image" alt="pokemon" style="width:180px;height:180px;object-fit:contain;" />
    <div>
      <h3 style="text-transform:capitalize">{{ pokemon.name }}</h3>
      <p><strong>Tipo(s):</strong> <span v-for="t in tipos" :key="t" style="text-transform:capitalize;margin-right:6px">{{ t }}</span></p>
      <p><strong>Altura:</strong> {{ pokemon.height }} &nbsp; <strong>Peso:</strong> {{ pokemon.weight }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pokemon: { type: Object, required: true },
    // optional image prop can override computed image
    image: { type: String, default: '' }
  },
  computed: {
    // prefer external `image` prop (from parent computed) if provided
    imageSrc() {
      return this.image || this.pokemon?.sprites?.other?.['official-artwork']?.front_default || this.pokemon?.sprites?.front_default || ''
    },
    tipos() {
      return (this.pokemon?.types || []).map(t => t.type.name)
    }
  }
}
</script>
