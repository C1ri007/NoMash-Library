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

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const getApiData = async () => {
  loading.value = true
  error.value = null
  try {
    // 假设 API 返回 authors 列表，每个 author 有 name 和 famousWorks（数组）
    const response = await fetch('/api/authors')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    authors.value = data
    const authorsCount = authors.value.length
    const totalBooks = authors.value.reduce((total, author) => total + (author.famousWorks?.length || 0), 0)
    apiResponse.value = {
      success: true,
      data: {
        authorsCount,
        totalBooks,
        authors: authors.value.map(author => ({
          name: author.name,
          bookCount: author.famousWorks?.length || 0
        }))
      },
      timestamp: new Date().toISOString()
    }
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error('Error loading authors data:', err)
  } finally {
    loading.value = false
  }
}

onMounted(getApiData)
</script>
