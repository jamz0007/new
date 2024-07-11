import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('excuses', () => {
  let excuses = ref([])

  const getExcuses = async () => {
    await fetch('https://dev-excuses-back.vercel.app/api/excuse')
      .then((res) => res.json())
      .then((data) => {
        excuses.value = data
      })
  }

  const getRandomExcuse = () => {
    const randomExcuse = excuses.value[Math.floor(Math.random() * excuses.value.length)]
    return randomExcuse
  }

  const addExcuse = async (excuse) => {
    await fetch('https://dev-excuses-back.vercel.app/api/excuse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(excuse)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('excuse added')
        excuses.value.push(data)
      })
  }

  return {
    excuses,
    getExcuses,
    getRandomExcuse,
    addExcuse
  }
})
