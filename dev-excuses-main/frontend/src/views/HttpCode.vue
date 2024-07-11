<script setup>
import { useRoute } from 'vue-router'
import useExcusesStore from '../stores/excuses.store'
const excusesStore = useExcusesStore()
const route = useRoute()
const httpCode = route.params.http_code

const excuses = excusesStore.excuses

let message = ''

for (let i = 0; i < excuses.length; i++) {
  if (excuses[i].http_code == httpCode) {
    message = excuses[i].message
  }
}
</script>

<template>
  <div class="h-screen w-screen bg-gray-50 flex flex-col items-center px-5 text-gray-700">
    <div class="w-full lg:w-1/2 m-auto">
      <div class="text-7xl text-green-500 font-dark font-extrabold mb-8 text-center">
        {{ message }}
      </div>
      <p class="text-2xl md:text-3xl font-light leading-normal mb-8 text-center">
        {{ httpCode }}
      </p>
    </div>
  </div>
</template>
