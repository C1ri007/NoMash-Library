<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Login</h2>
    <form @submit.prevent="login" class="mx-auto" style="max-width:400px;">
      <div class="mb-3">
        <input v-model="username" type="text" class="form-control" placeholder="Username" required />
      </div>
      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Password" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function login() {
  if (username.value === 'admin' && password.value === 'password') {
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/about')
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>