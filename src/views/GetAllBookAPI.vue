<template>
  <div>
    <h1>All Books API</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color:red;">{{ error }}</div>
    <div v-if="apiResponse">
      <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const books = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const getApiData = async () => {
  loading.value = true
  error.value = null

  try {
    // 读取静态 JSON 文件，适配 Cloudflare Pages
    const response = await fetch('/json/books.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    books.value = data

    apiResponse.value = {
      success: true,
      data: {
        booksCount: books.value.length,
        books: books.value // 直接展示原始数组，包含所有字段
      },
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    error.value = `Error loading books data: ${err.message}`
    console.error('Error loading books data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(getApiData)
</script>
