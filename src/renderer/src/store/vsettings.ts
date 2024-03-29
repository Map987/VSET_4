import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useVSettingsStore = defineStore('VSettings', () => {}, {
  persist: {
    storage: localStorage,
    paths: []
  }
})
