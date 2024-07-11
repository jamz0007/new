<script setup>
import useExcusesStore from '../stores/excuses.store'
import { computed, ref } from 'vue'
import ButtonLoader from './ButtonLoader.vue'

const props = defineProps({
  messageExcuse: String
})

const excusesStore = useExcusesStore()

const emit = defineEmits(['random-message'])

computed({
  get: () => props.messageExcuse,
  set: (value) => emit('random-message', value)
})

const isLoading = ref(false)

const NewRamdomExcuse = () => {
  isLoading.value = true
  let newRandomMessage = excusesStore.getRandomExcuse().message
  if (props.messageExcuse === newRandomMessage) {
    NewRamdomExcuse()
  } else {
    setTimeout(() => {
      emit('random-message', newRandomMessage)
      isLoading.value = false
    }, Math.floor(Math.random() * 5000) + 1000)
  }
}
</script>

<template>
  <button
    type="button"
    :disabled="isLoading"
    @click.prevent="NewRamdomExcuse"
    class="px-5 m-auto w-1/2 max-w-xs flex justify-center items-center inline py-3 text-l md:text-xl leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-green-500 hover:bg-green-500"
  >
    <ButtonLoader v-if="isLoading" />
    <span>Random excuse</span>
  </button>
</template>
