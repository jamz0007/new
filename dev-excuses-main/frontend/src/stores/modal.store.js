import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('modal', () => {
  let isModalOpen = ref(false)

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value
  }

  return {
    isModalOpen,
    toggleModal
  }
})
