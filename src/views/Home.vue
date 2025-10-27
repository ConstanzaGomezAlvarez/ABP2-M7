\
<template>
  <div style="max-width:900px;margin:24px auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h2>Pokeguía</h2>
      <button @click="logout" class="btn">Salir</button>
    </div>

    <div style="margin-top:20px;display:flex;gap:8px;align-items:center;">
      <input
        v-model="query"
        @keyup.enter="buscar"
        placeholder="Nombre del Pokémon (ej. pikachu)"
        class="form-control"
      />
      <button @click="buscar" class="btn" :disabled="loading">Buscar</button>
    </div>

    <div v-if="loading" class="spinner" style="margin-top:16px;"></div>
    <p v-if="error" style="margin-top:12px;color:red">{{ error }}</p>

    <!-- Historial -->
    <div v-if="historial.length" style="margin-top:16px;">
      <h4>Últimas búsquedas</h4>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <button
          v-for="item in historial"
          :key="item"
          @click="buscarDesdeHistorial(item)"
          class="btn btn-outline"
        >
          {{ item }}
        </button>
      </div>
    </div>

    <div v-if="pokemon" style="margin-top:20px;">
      <PokemonCard :pokemon="pokemon" />
      <div style="display:flex;gap:24px;margin-top:16px;">
        <div>
          <h4>Movimientos ({{ moves.length }})</h4>
          <ul><li v-for="m in moves" :key="m">{{ m }}</li></ul>
        </div>
        <div>
          <h4>Habilidades ({{ abilities.length }})</h4>
          <ul><li v-for="a in abilities" :key="a">{{ a }}</li></ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PokemonCard from '../components/PokemonCard.vue'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default {
  name: 'Home',
  components: { PokemonCard },
  data() {
    return {
      query: '',
      pokemon: null,
      loading: false,
      error: '',
      historial: []
    }
  },
  computed: {
    moves() {
      return this.pokemon?.moves?.map(m => m.move.name) || []
    },
    abilities() {
      return this.pokemon?.abilities?.map(a => a.ability.name) || []
    }
  },
  created() {
    this.historial = JSON.parse(localStorage.getItem('historialPokeguia')) || []
    this.query = 'pikachu'
    this.buscar()
  },
  methods: {
    async buscar() {
      const name = (this.query || '').trim().toLowerCase()
      if (!name) {
        this.error = 'Por favor, escribe el nombre de un Pokémon.'
        return
      }
      this.error = ''
      this.loading = true
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`)
        this.pokemon = res.data
        this.agregarAlHistorial(name)
      } catch {
        this.error = 'Pokémon no encontrado o error en la API.'
        this.pokemon = null
      } finally {
        this.loading = false
      }
    },
    agregarAlHistorial(nombre) {
      let historial = JSON.parse(localStorage.getItem('historialPokeguia')) || []
      historial = [nombre, ...historial.filter(n => n !== nombre)].slice(0, 5) // máximo 5
      localStorage.setItem('historialPokeguia', JSON.stringify(historial))
      this.historial = historial
    },
    buscarDesdeHistorial(nombre) {
      this.query = nombre
      this.buscar()
    },
    async logout() {
      await signOut(auth)
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>
.form-control { padding:8px; border:1px solid #ccc; border-radius:4px; }
.btn { padding:8px 12px; border:none; background:#1976d2; color:white; border-radius:4px; cursor:pointer; }
.btn-outline { background:white; color:#1976d2; border:1px solid #1976d2; }
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 1s linear infinite;
  margin: auto;
}
@keyframes spin { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }
</style>
