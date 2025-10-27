/*
  firebase.js
  - Exporta una capa mínima de autenticación que puede usar Firebase real
    cuando se proveen variables de entorno, o un `mock` en memoria cuando
    no hay configuración. De esta forma la app puede probarse sin crear un
    proyecto en Firebase.

  API exportada:
    - auth: objeto (puede ser nulo si no aplica)
    - firebaseConfigured: boolean (true si hay backend disponible — real o mock)
    - isMock: boolean (true si se está usando el mock)
    - createUserWithEmailAndPassword(email, password)
    - signInWithEmailAndPassword(email, password)
    - signOut()
    - onAuthStateChanged(callback) -> returns unsubscribe()

*/

import { initializeApp } from 'firebase/app'
import { getAuth as getFirebaseAuth, createUserWithEmailAndPassword as fbCreateUser, signInWithEmailAndPassword as fbSignIn, signOut as fbSignOut, onAuthStateChanged as fbOnAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

let auth = null
let firebaseConfigured = false
let isMock = false
let createUserWithEmailAndPassword
let signInWithEmailAndPassword
let signOut
let onAuthStateChanged

// If there's a real config, initialize Firebase
if (firebaseConfig.apiKey) {
  const app = initializeApp(firebaseConfig)
  auth = getFirebaseAuth(app)
  firebaseConfigured = true
  isMock = false
} else {
  // Create a lightweight in-memory mock auth provider
  isMock = true
  firebaseConfigured = true // mark as available (but mocked)

  const subscribers = new Set()
  let currentUser = null

  auth = {
    // minimal shape, not used directly by wrappers but kept for parity
    currentUser: () => currentUser
  }

  function notify(user) {
    currentUser = user
    for (const cb of Array.from(subscribers)) cb(user)
  }

  async function mockCreateUserWithEmailAndPassword(email, password) {
    // very simple validation
    if (!email || !password) throw { code: 'auth/invalid-input', message: 'Email o contraseña inválidos' }
    // simulate user object
    const user = { uid: 'mock-' + Date.now(), email }
    notify(user)
    return { user }
  }

  async function mockSignInWithEmailAndPassword(email, password) {
    if (!email || !password) throw { code: 'auth/invalid-input', message: 'Email o contraseña inválidos' }
    // For mock, accept any credentials
    const user = { uid: 'mock-' + Date.now(), email }
    notify(user)
    return { user }
  }

  async function mockSignOut() {
    notify(null)
    return
  }

  function mockOnAuthStateChanged(cb) {
    subscribers.add(cb)
    // call immediately with current user (like Firebase does)
    cb(currentUser)
    return () => subscribers.delete(cb)
  }
  // assign mock implementations to the exported symbols
  createUserWithEmailAndPassword = mockCreateUserWithEmailAndPassword
  signInWithEmailAndPassword = mockSignInWithEmailAndPassword
  signOut = mockSignOut
  onAuthStateChanged = mockOnAuthStateChanged
}

// Real Firebase wrappers (only reached when firebase is configured)
// If we reach here it means real Firebase is configured
if (firebaseConfig.apiKey) {
  // real wrappers
  createUserWithEmailAndPassword = async (email, password) => fbCreateUser(auth, email, password)
  signInWithEmailAndPassword = async (email, password) => fbSignIn(auth, email, password)
  signOut = async () => fbSignOut(auth)
  onAuthStateChanged = (cb) => fbOnAuthStateChanged(auth, cb)
}

export { auth, firebaseConfigured, isMock, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged }
