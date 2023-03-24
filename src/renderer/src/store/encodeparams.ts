import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useEncodeParamsStore = defineStore(
  'EncodeParams',
  () => {
    const enableCRF = ref(true)
    const bitrateorcrf = ref(12)

    const videoEncoder = ref('libx265')
    const videoEncoderList = ref([
      {
        label: 'libx265',
        value: 'libx265',
        disabled: false
      },
      {
        label: 'libx264',
        value: 'libx264',
        disabled: false
      },
      {
        label: 'libvpx-vp9',
        value: 'libvpx-vp9',
        disabled: false
      },
      {
        label: 'nvenc_h264',
        value: 'nvenc_h264',
        disabled: false
      },
      {
        label: 'nvenc_hevc',
        value: 'nvenc_hevc',
        disabled: false
      }
    ])

    const ffmpegPreset = ref('slow')
    const ffmpegPresetList = ref([
      {
        label: 'veryslow',
        value: 'veryslow',
        disabled: false
      },
      {
        label: 'slower',
        value: 'slower',
        disabled: false
      },
      {
        label: 'slow',
        value: 'slow',
        disabled: false
      },
      {
        label: 'medium',
        value: 'medium',
        disabled: false
      },
      {
        label: 'fast',
        value: 'fast',
        disabled: false
      },
      {
        label: 'faster',
        value: 'faster',
        disabled: false
      },
      {
        label: 'veryfast',
        value: 'veryfast',
        disabled: false
      },
      {
        label: 'superfast',
        value: 'superfast',
        disabled: false
      },
      {
        label: 'ultrafast',
        value: 'ultrafast',
        disabled: false
      }
    ])

    const videoContainer = ref('MKV')
    const videoContainerList = ref([
      {
        label: 'MKV',
        value: 'MKV',
        disabled: false
      },
      {
        label: 'MP4',
        value: 'MP4',
        disabled: false
      },
      {
        label: 'WEBM',
        value: 'WEBM',
        disabled: false
      },
      {
        label: 'FLV',
        value: 'FLV',
        disabled: false
      },
      {
        label: 'MOV',
        value: 'MOV',
        disabled: false
      }
    ])

    const enableEncodeAudio = ref(true)
    const audioEncoder = ref('AAC')
    const audioEncoderList = ref([
      {
        label: 'AAC',
        value: 'AAC',
        disabled: false
      },
      {
        label: 'FLAC',
        value: 'FLAC',
        disabled: false
      }
    ])

    const enableDIYEncodeParams = ref(false)
    const DIYEncodeParams = ref('')

    return {
      enableCRF,
      bitrateorcrf,
      videoEncoder,
      videoEncoderList,
      ffmpegPreset,
      ffmpegPresetList,
      videoContainer,
      videoContainerList,
      enableEncodeAudio,
      audioEncoder,
      audioEncoderList,
      enableDIYEncodeParams,
      DIYEncodeParams
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: [
        'enableCRF',
        'bitrateorcrf',
        'videoEncoder',
        'ffmpegPreset',
        'videoContainer',
        'enableEncodeAudio',
        'audioEncoder',
        'enableDIYEncodeParams',
        'DIYEncodeParams'
      ]
    }
  }
)
