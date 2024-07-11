<script setup>
import { ref } from 'vue'
import RandomButtonVue from '../components/RandomButton.vue'
import ModalWindow from '../components/ModalWindow.vue'
import useModalStore from '../stores/modal.store'

const modalStore = useModalStore()

const messageExcuse = ref('')

const newMessage = (updateMessage) => {
  return (messageExcuse.value = updateMessage)
}
</script>

<template>
  <div class="h-screen w-screen bg-gray-50 flex flex-col justify-items-center">
    <h1
      class="text-5xl md:text-7xl text-green-500 font-dark font-extrabold mb-4 md:mb-8 text-center mt-20"
    >
      Dev excuses
    </h1>
    <div class="m-auto mt-5 md:mt-30 w-screen flex flex-col">
      <p class="text-xl md:text-3xl font-light leading-normal mb-4 md:mb-8 m-auto h-10">
        {{ messageExcuse }}
      </p>
      <RandomButtonVue
        :disabled="modalStore.isModalOpen"
        :messageExcuse="messageExcuse"
        @randomMessage="newMessage"
      />
      <button
        type="button"
        @click.prevent="modalStore.toggleModal()"
        :disabled="modalStore.isModalOpen"
        class="px-5 mt-5 m-auto w-1/2 max-w-xs flex justify-center items-center inline py-3 text-l md:text-xl leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-green-500 hover:bg-green-500"
      >
        <ModalWindow v-if="modalStore.isModalOpen" />
        <span>Add excuse</span>
      </button>
    </div>
  </div>
</template>
