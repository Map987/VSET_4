import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useSuperresolutionStore = defineStore(
  'Superresolution',
  () => {
    const enablesr = ref(false)
    const selectedInferEngine = ref('NCNN')
    const halfprecision = ref(false)

    const cropnums = ref(1)
    const alphavalue = ref(0.95)

    const SrAlgorithm = ref('Real_CUGAN')
    const SrAlgorithmList = ref([
      {
        label: 'Real_CUGAN',
        value: 'Real_CUGAN',
        disabled: false
      },
      {
        label: 'Real_ESRGAN',
        value: 'Real_ESRGAN',
        disabled: false
      },
      {
        label: 'BasicVSR++',
        value: 'BasicVSR++',
        disabled: false
      },
      {
        label: 'BasicVSR',
        value: 'BasicVSR',
        disabled: false
      },
      {
        label: 'AnimeSR',
        value: 'AnimeSR',
        disabled: false
      }
    ])

    const SrModel = ref('')

    // self.cb_model_mlrt_cg.setItemText(0, _translate("mainWindow", "pro-conservative-up2x"))
    // self.cb_model_mlrt_cg.setItemText(1, _translate("mainWindow", "pro-conservative-up3x"))
    // self.cb_model_mlrt_cg.setItemText(2, _translate("mainWindow", "pro-denoise3x-up2x"))
    // self.cb_model_mlrt_cg.setItemText(3, _translate("mainWindow", "pro-denoise3x-up3x"))
    // self.cb_model_mlrt_cg.setItemText(4, _translate("mainWindow", "pro-no-denoise3x-up2x"))
    // self.cb_model_mlrt_cg.setItemText(5, _translate("mainWindow", "pro-no-denoise3x-up3x"))
    // self.cb_model_mlrt_cg.setItemText(6, _translate("mainWindow", "up2x-latest-conservative"))
    // self.cb_model_mlrt_cg.setItemText(7, _translate("mainWindow", "up2x-latest-denoise1x"))
    // self.cb_model_mlrt_cg.setItemText(8, _translate("mainWindow", "up2x-latest-denoise2x"))
    // self.cb_model_mlrt_cg.setItemText(9, _translate("mainWindow", "up2x-latest-denoise3x"))
    // self.cb_model_mlrt_cg.setItemText(10, _translate("mainWindow", "up2x-latest-no-denoise"))
    // self.cb_model_mlrt_cg.setItemText(11, _translate("mainWindow", "up3x-latest-conservative"))
    // self.cb_model_mlrt_cg.setItemText(12, _translate("mainWindow", "up3x-latest-denoise3x"))
    // self.cb_model_mlrt_cg.setItemText(13, _translate("mainWindow", "up3x-latest-no-denoise"))
    // self.cb_model_mlrt_cg.setItemText(14, _translate("mainWindow", "up4x-latest-conservative"))
    // self.cb_model_mlrt_cg.setItemText(15, _translate("mainWindow", "up4x-latest-denoise3x"))
    // self.cb_model_mlrt_cg.setItemText(16, _translate("mainWindow", "up4x-latest-no-denoise"))

    const SrModelListRealCugan = ref([
      {
        label: 'pro-conservative-up2x',
        value: 'pro-conservative-up2x',
        disabled: false
      },
      {
        label: 'pro-conservative-up3x',
        value: 'pro-conservative-up3x',
        disabled: false
      },
      {
        label: 'pro-denoise3x-up2x',
        value: 'pro-denoise3x-up2x',
        disabled: false
      },
      {
        label: 'pro-denoise3x-up3x',
        value: 'pro-denoise3x-up3x',
        disabled: false
      },
      {
        label: 'pro-no-denoise3x-up2x',
        value: 'pro-no-denoise3x-up2x',
        disabled: false
      },
      {
        label: 'pro-no-denoise3x-up3x',
        value: 'pro-no-denoise3x-up3x',
        disabled: false
      },
      {
        label: 'up2x-latest-conservative',
        value: 'up2x-latest-conservative',
        disabled: false
      },
      {
        label: 'up2x-latest-denoise1x',
        value: 'up2x-latest-denoise1x',
        disabled: false
      },
      {
        label: 'up2x-latest-denoise2x',
        value: 'up2x-latest-denoise2x',
        disabled: false
      },
      {
        label: 'up2x-latest-denoise3x',
        value: 'up2x-latest-denoise3x',
        disabled: false
      },
      {
        label: 'up2x-latest-no-denoise',
        value: 'up2x-latest-no-denoise',
        disabled: false
      },
      {
        label: 'up3x-latest-conservative',
        value: 'up3x-latest-conservative',
        disabled: false
      },
      {
        label: 'up3x-latest-denoise3x',
        value: 'up3x-latest-denoise3x',
        disabled: false
      },
      {
        label: 'up3x-latest-no-denoise',
        value: 'up3x-latest-no-denoise',
        disabled: false
      },
      {
        label: 'up4x-latest-conservative',
        value: 'up4x-latest-conservative',
        disabled: false
      },
      {
        label: 'up4x-latest-denoise3x',
        value: 'up4x-latest-denoise3x',
        disabled: false
      },
      {
        label: 'up4x-latest-no-denoise',
        value: 'up4x-latest-no-denoise',
        disabled: false
      }
    ])

    return {
      enablesr,
      selectedInferEngine,
      halfprecision,
      cropnums,
      alphavalue,
      SrAlgorithm,
      SrAlgorithmList,
      SrModel,
      SrModelListRealCugan
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: [
        'enablesr',
        'selectedInferEngine',
        'halfprecision',
        'cropnums',
        'alphavalue',
        'SrAlgorithm',
        'SrModel'
      ]
    }
  }
)
