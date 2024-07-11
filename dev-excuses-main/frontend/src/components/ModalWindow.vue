<script setup>
import useModalStore from '../stores/modal.store'
import useExcusesStore from '../stores/excuses.store'
import { ref } from 'vue'

const modalStore = useModalStore()
const excusesStore = useExcusesStore()

const messageError = ref('')

const submit = () => {
  const inputValue = document.getElementById('excuse').value
  const excuses = excusesStore.excuses
  // check if the message already exists
  if (excuses.some((excuse) => excuse.message == inputValue)) {
    messageError.value = 'Message already exists'
  } else {
    modalStore.toggleModal()
    const maxHttpCode = Math.max(...excuses.map((excuse) => excuse.http_code))
    const excuse = {
      http_code: maxHttpCode + 1,
      message: inputValue
    }
    excusesStore.addExcuse(excuse)
  }
}
</script>

<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 flex justify-center align-center">
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-75"></div>

    <div class="modale fixed rounded">
      <div class="px-2 py-2 lg:px-8">
        <h3 class="mb-2 text-xl font-medium text-gray-900">Add an excuse</h3>
        <form class="space-y-6" @submit.prevent="submit">
          <div>
            <label for="excuse" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Excuse</label
            >
            <input
              type="texte"
              name="excuse"
              id="excuse"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="excuse message"
              required
            />
            <p class="h-6 text-red-400 text-sm">{{ messageError }}</p>
          </div>
          <button
            type="submit"
            class="w-full text-white font-medium rounded-lg text-sm px-2 py-2.5 text-center bg-green-600 active:bg-green-500 hover:bg-green-500"
          >
            Create excuse
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modale {
  background: rgb(249 250 251);
  color: #333;
  padding: 20px;
  top: 30%;
}
</style>
