<script setup lang="ts">
import { onMounted, ref, computed, Ref } from 'vue'
import MyBar from '../components/MyBar.vue'
import { storeToRefs } from 'pinia'
import { useEncodeParamsStore } from '../store/encodeparams.ts'

import {
  NButton,
  NSelect,
  NSwitch,
  NCard,
  NSlider,
  NInput,
  NSpace,
  useNotification
} from 'naive-ui'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const useEncodeParams = useEncodeParamsStore()

const {
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
} = storeToRefs(useEncodeParams)

const notification = useNotification()

function changeEnableCRF(value: string): void {
  enableCRF.value = value === 'true'
  if (enableCRF.value) {
    notification.success({
      title: 'CRF Mode',
      content: t('EncodeParams.changeEnableCRFNotification'),
      duration: 900,
      keepAliveOnHover: true
    })
  } else {
    notification.success({
      title: 'BitRate Mode',
      content: t('EncodeParams.changeEnableCRFNotification_1'),
      duration: 900,
      keepAliveOnHover: true
    })
  }
}

function changeEncodeAudio(value: string): void {
  enableEncodeAudio.value = value === 'true'
  if (enableEncodeAudio.value) {
    notification.success({
      title: t('EncodeParams.changeEncodeAudioNotification'),
      content: t('EncodeParams.changeEncodeAudioNotification_1'),
      duration: 1000,
      keepAliveOnHover: true
    })
  } else {
    notification.success({
      title: t('EncodeParams.changeEncodeAudioNotification_2'),
      content: t('EncodeParams.changeEncodeAudioNotification_3'),
      duration: 5000,
      keepAliveOnHover: true
    })
  }
}

const disableAudioEncoderList = computed(() => {
  return !enableEncodeAudio.value
})

function changeDIYEncodeParams(value: string): void {
  enableDIYEncodeParams.value = value === 'true'
  if (enableDIYEncodeParams.value) {
    notification.info({
      title: t('EncodeParams.changeDIYEncodeParamsNotification'),
      content: t('EncodeParams.changeDIYEncodeParamsNotification_1'),
      duration: 2500,
      keepAliveOnHover: true
    })
  } else {
    notification.success({
      title: t('EncodeParams.changeDIYEncodeParamsNotification_2'),
      duration: 1000,
      keepAliveOnHover: true
    })
  }
}

const disableDIYEncodeParams = computed(() => {
  return !enableDIYEncodeParams.value
})
</script>

<template>
  <div>
    <MyBar />

    <n-card :title="t('EncodeParams.NCardTitle')" hoverable>
      <n-space>
        <n-button type="success" dashed> {{ t('EncodeParams.NButtonVideoEncoder') }} </n-button>
        <n-select v-model:value="videoEncoder" :options="videoEncoderList" style="width: 150px" />
        <n-button type="success" dashed> {{ t('EncodeParams.NButtonFFmpegPreset') }} </n-button>
        <n-select v-model:value="ffmpegPreset" :options="ffmpegPresetList" style="width: 150px" />
      </n-space>

      <br />

      <n-space>
        <n-button type="success" dashed> {{ t('EncodeParams.NButtonVideoContainer') }} </n-button>
        <n-select
          v-model:value="videoContainer"
          :options="videoContainerList"
          style="width: 150px"
        />
        <n-button type="success" dashed> BitRate/CRF </n-button>
        <n-switch
          :value="String(enableCRF)"
          :round="false"
          size="large"
          checked-value="true"
          unchecked-value="false"
          style="height: 35px"
          @update:value="changeEnableCRF"
        >
          <template #checked> CRF </template>
          <template #unchecked> BitRate </template>
        </n-switch>
      </n-space>

      <br />

      <n-space vertical>
        <n-slider v-model:value="bitrateorcrf" :step="1" :min="1" :max="100" style="width: 80%" />
      </n-space>

      <br />

      <n-space>
        <n-button type="success" dashed> {{ t('EncodeParams.NButtonEncodeAudio') }} </n-button>
        <n-switch
          :value="String(enableEncodeAudio)"
          size="large"
          checked-value="true"
          unchecked-value="false"
          style="height: 35px"
          @update:value="changeEncodeAudio"
        >
        </n-switch>
        <n-select
          v-model:value="audioEncoder"
          :disabled="disableAudioEncoderList"
          :options="audioEncoderList"
          style="width: 336px"
        />
      </n-space>
    </n-card>

    <br />

    <n-card hoverable>
      <n-space>
        <n-space vertical>
          <n-button type="success" dashed>
            {{ t('EncodeParams.NButtonDIYEncodeParams') }}
          </n-button>
          <n-switch
            :value="String(enableDIYEncodeParams)"
            size="large"
            checked-value="true"
            unchecked-value="false"
            style="height: 50px; width: 110px"
            @update:value="changeDIYEncodeParams"
          >
          </n-switch>
        </n-space>
        <n-input
          v-model:value="DIYEncodeParams"
          :disabled="disableDIYEncodeParams"
          type="textarea"
          placeholder="-c:v libx265 -pix_fmt yuv420p10le -profile:v main10 --preset veryslow --crf 16.5 --threads 16 --deblock -1:-1 --keyint 600 --min-keyint 1 --bframes 8 --ref 13 --qcomp 0.75 --rc-lookahead 70"
          style="width: 370px"
        />
      </n-space>
    </n-card>
  </div>
</template>

<style scoped></style>
