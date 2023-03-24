import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalsettingsStore = defineStore(
  'Globalsettings',
  () => {
    const langsNum = ref(0)

    const hasNvidiaGPU = ref(false)
    const system = ref('win32') // win32, darwin, linux
    const systemArch = ref('x64') // x64, arm64

    const SRgpuid = ref(0)
    const gpulist = ref([])

    const disablePYTORCH = computed((): boolean => {
      if (system.value === 'win32') {
        return !hasNvidiaGPU.value
      }
      if (system.value === 'darwin') {
        return systemArch.value === 'x64'
      }
      return false
    })

    const disableTENSORRT = computed((): boolean => {
      if (system.value === 'win32') {
        return !hasNvidiaGPU.value
      }
      return system.value === 'darwin'
    })

    return {
      langsNum,
      hasNvidiaGPU,
      system,
      systemArch,
      SRgpuid,
      gpulist,
      disablePYTORCH,
      disableTENSORRT
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['langsNum', 'SRgpuid']
    }
  }
)
