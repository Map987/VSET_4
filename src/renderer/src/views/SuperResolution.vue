<script setup lang="ts">
import { onMounted, ref, computed, Ref } from 'vue'
import MyBar from '../components/MyBar.vue'
import { storeToRefs } from 'pinia'
import { useSuperresolutionStore } from '../store/superresolution.ts'
import { useGlobalsettingsStore } from '../store/globalsettings.ts'
import { ArrowLeftOutlined, VideoCameraAddOutlined } from '@vicons/antd'
import {
  NButton,
  NSelect,
  NSwitch,
  NCard,
  NImage,
  NInputNumber,
  NInput,
  NIcon,
  NP,
  NText,
  NUpload,
  NUploadDragger,
  NDrawer,
  NDrawerContent,
  NCode,
  NCheckbox,
  NSpace,
  NRadioGroup,
  NRadioButton,
  NRadio,
  NGradientText,
  useMessage,
  useNotification
} from 'naive-ui'
import ncnnLogo from '../assets/ncnn-logo.png'
import pytorchLogo from '../assets/pytorch-logo.png'
import tensorrtLogo from '../assets/tensorrt-logo.png'
import { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const useSuperresolution = useSuperresolutionStore()
const useGlobalsettings = useGlobalsettingsStore()

const {
  enablesr,
  selectedInferEngine,
  halfprecision,
  cropnums,
  alphavalue,
  SrAlgorithm,
  SrAlgorithmList,
  SrModel,
  SrModelListRealCugan
} = storeToRefs(useSuperresolution)
const { SRgpuid, gpulist, disableTENSORRT, disablePYTORCH } = storeToRefs(useGlobalsettings)

const notification = useNotification()

function showGPUid(): void {
  notification.info({
    title: 'GPU ID: ' + SRgpuid.value,
    content: gpulist.value[SRgpuid.value].label,
    duration: 700,
    keepAliveOnHover: true
  })
}

function enableSR(value: string): void {
  enablesr.value = value === 'true'
  console.log('enable sr', enablesr.value)
  if (enablesr.value) {
    notification.success({
      title: t('SuperResolution.enableSRNotification'),
      duration: 1000,
      keepAliveOnHover: true
    })
  }
}

function changeNCNN(): void {
  selectedInferEngine.value = 'NCNN'
  notification.create({
    title: 'NCNN',
    content: t('SuperResolution.changeNCNNNotification'),
    duration: 3000
  })
}

function changePYTORCH(): void {
  if (disablePYTORCH.value) {
    notification.error({
      title: 'PyTorch',
      content: t('SuperResolution.changePYTORCHNotification'),
      duration: 3000
    })
    return
  }
  selectedInferEngine.value = 'PYTORCH'
  notification.create({
    title: 'PyTorch',
    content: t('SuperResolution.changePYTORCHNotification_1'),
    duration: 3000
  })
}

function changeTENSORRT(): void {
  if (disableTENSORRT.value) {
    notification.error({
      title: 'TensorRT',
      content: t('SuperResolution.changeTENSORRTNotification'),
      duration: 3000
    })
    return
  }
  selectedInferEngine.value = 'TENSORRT'
  notification.create({
    title: 'TensorRT',
    content: t('SuperResolution.changeTENSORRTNotification_1'),
    duration: 3000
  })
}

const disableHalf = computed(() => selectedInferEngine.value === 'NCNN')

function enableHalfPrecision(value: string): void {
  halfprecision.value = value === 'true'
  console.log('half precision enable', halfprecision.value)
  if (halfprecision.value) {
    notification.info({
      title: t('SuperResolution.enableHalfPrecisionNotification'),
      content: t('SuperResolution.enableHalfPrecisionNotification_1'),
      duration: 1000,
      keepAliveOnHover: true
    })
  }
}

function showSrAlgorithm(): void {
  notification.success({
    title: SrAlgorithm.value,
    content: t('SuperResolution.showSrAlgorithmNotification_REALCUGAN'),
    duration: 5000,
    keepAliveOnHover: true
  })
}

function switchSrAlgorithm(): void {
  SrModel.value = ''
  console.log('clear sr-algorithm')
}

const SrModelList = computed((): Array<SelectMixedOption> => {
  if (SrAlgorithm.value === 'Real_CUGAN') {
    return SrModelListRealCugan.value
  }
  return Array<SelectMixedOption>()
})
</script>

<template>
  <div>
    <MyBar />
    <div class="enableSR">
      <n-space item-style="display: flex; align-item: center;">
        <n-switch
          :value="String(enablesr)"
          :round="false"
          size="large"
          checked-value="true"
          unchecked-value="false"
          @update:value="enableSR"
        >
          <template #checked> {{ t('SuperResolution.NSwitchEnableSR') }} </template>
          <template #unchecked> {{ t('SuperResolution.NSwitchEnableSR') }} </template>
        </n-switch>

        &nbsp;&nbsp;&nbsp;

        <n-switch
          :value="String(halfprecision)"
          size="large"
          checked-value="true"
          unchecked-value="false"
          :disabled="disableHalf"
          @update:value="enableHalfPrecision"
        >
          <template #checked> {{ t('SuperResolution.NSwitchEnableHalfPrecision') }} </template>
          <template #unchecked> {{ t('SuperResolution.NSwitchEnableHalfPrecision') }} </template>
        </n-switch>

        &nbsp;&nbsp;&nbsp;&nbsp;

        <n-button type="success" dashed size="small" @click="showGPUid">
          {{ t('SuperResolution.NButtonGPU') }}
        </n-button>
        <n-select
          v-model:value="SRgpuid"
          :options="gpulist"
          style="width: 33%; position: absolute"
          size="small"
        />
      </n-space>
    </div>

    <br />

    <div class="inferEngine">
      <div v-if="selectedInferEngine === 'TENSORRT'">
        <n-image width="220" height="100" :src="tensorrtLogo" />
      </div>
      <div v-else-if="selectedInferEngine === 'PYTORCH'">
        <n-image width="220" height="100" :src="pytorchLogo" />
      </div>
      <div v-else>
        <!-- NCNN -->
        <n-image width="100" height="100" :src="ncnnLogo" />
      </div>
    </div>

    <n-space vertical justify="space-around" size="large" class="inferEngineSwitch">
      <n-card :title="t('SuperResolution.inferEngineSwitch')" hoverable>
        <n-space>
          <n-button round color="#837E7D" @click="changeNCNN"> NCNN </n-button>
          <n-button round color="#E84B2A" @click="changePYTORCH"> Pytorch </n-button>
          <n-button round color="#72B402" @click="changeTENSORRT"> TensorRT </n-button>
        </n-space>
      </n-card>
    </n-space>

    <br />

    <n-card hoverable>
      <n-space item-style="display: flex; align-item: center;">
        <n-button type="success" dashed @click="showSrAlgorithm">
          {{ t('SuperResolution.NButtonSrAlgorithm') }}
        </n-button>
        <n-select
          v-model:value="SrAlgorithm"
          :options="SrAlgorithmList"
          style="width: 73%; position: absolute"
          @update:value="switchSrAlgorithm"
        />
      </n-space>
      <br />
      <n-space item-style="display: flex; align-item: center;">
        <n-button type="success" dashed> {{ t('SuperResolution.NButtonSrModel') }} </n-button>
        <n-select
          v-model:value="SrModel"
          :options="SrModelList"
          style="width: 73%; position: absolute"
        />
      </n-space>
    </n-card>

    <br />

    <n-card hoverable>
      <n-space item-style="display: flex; align-item: center;">
        <n-button type="success" dashed size="tiny" :disabled="true">
          {{ t('SuperResolution.NButtonCropNums') }}
        </n-button>
        <n-input-number
          v-model:value="cropnums"
          :min="1"
          :max="4"
          :precision="0"
          size="tiny"
          :disabled="true"
        />

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <n-button type="success" dashed size="tiny" :disabled="true">
          {{ t('SuperResolution.NButtonAlphaValue') }}
        </n-button>
        <n-input-number
          v-model:value="alphavalue"
          :min="0.7"
          :max="1.3"
          step="0.05"
          size="tiny"
          :disabled="true"
        />
      </n-space>
    </n-card>
  </div>
</template>

<style scoped>
.enableSR {
  max-height: 50px;
}

.inferEngineSwitch {
  position: relative;
}

.inferEngine {
  position: absolute;
  top: 165px;
  left: 400px;
  z-index: 1;
}
</style>
