import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStartstartStore = defineStore('Startstart', () => {
  const StartCommandLock = ref(false)
  const videoFrameCount = ref(0)
  const encodeFrameCount = ref(0)
  const encodeFinish = ref(false)

  return {
    StartCommandLock,
    videoFrameCount,
    encodeFrameCount,
    encodeFinish
  }
})
