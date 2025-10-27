\
<template>
  <div class="login-container" style="max-width:420px;margin:40px auto;">
    <h2>Login / Registro</h2>

    <div style="margin-bottom:16px;">
      <label>Email</label>
      <input v-model="email" type="email" class="form-control" />
    </div>

    <div style="margin-bottom:16px;">
      <label>Contraseña</label>
      <input v-model="password" type="password" class="form-control" />
    </div>

    <div style="display:flex;gap:8px;">
      <button @click="login" class="btn" :disabled="loading">Ingresar</button>
      <button @click="register" class="btn btn-secondary" :disabled="loading">Registrar</button>
    </div>

    <div v-if="loading" class="spinner"></div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, firebaseConfigured } from '../firebase'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false
    }
  },
  methods: {
    validar() {
      // Formato básico de email
      const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
      if (!regex.test(this.email)) return 'El correo electrónico no es válido.'
      if (this.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.'
      return ''
    },
    async login() {
      if (!firebaseConfigured) {
        this.error = 'Firebase no está configurado. Añade las variables VITE_FIREBASE_* en un archivo .env en la raíz del proyecto.'
        return
      }
      this.error = this.validar()
      if (this.error) return
      this.loading = true
      try {
        await signInWithEmailAndPassword(this.email, this.password)
        this.$router.push({ name: 'Home' })
      } catch (err) {
        this.error = 'Credenciales incorrectas o usuario no registrado.'
      } finally {
        this.loading = false
      }
    },
    async register() {
      if (!firebaseConfigured) {
        this.error = 'Firebase no está configurado. Añade las variables VITE_FIREBASE_* en un archivo .env en la raíz del proyecto.'
        return
      }
      this.error = this.validar()
      if (this.error) return
      this.loading = true
      try {
        await createUserWithEmailAndPassword(this.email, this.password)
        this.$router.push({ name: 'Home' })
      } catch (err) {
        if (err.code === 'auth/email-already-in-use')
          this.error = 'Este correo ya está registrado.'
        else this.error = 'Error al registrar usuario.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
.form-control { width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; }
.btn { padding:8px 12px; border:none; background:#1976d2; color:white; border-radius:4px; cursor:pointer; }
.btn-secondary { background:#6c757d; }
.error { color:red; margin-top:12px; }
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: spin 1s linear infinite;
  margin: 12px auto;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
