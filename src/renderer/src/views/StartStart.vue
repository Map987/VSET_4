<script setup lang="ts">
import { onMounted, ref, computed, Ref, watchEffect, nextTick, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import {
  LogInst,
  NButton,
  NSelect,
  NSwitch,
  NCard,
  NDivider,
  NSlider,
  NInput,
  NSpace,
  NLog,
  NProgress,
  NDrawer,
  NDrawerContent,
  useNotification
} from 'naive-ui'
import { useStartstartStore } from '../store/startstart.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const useStartstart = useStartstartStore()

const { StartCommandLock, videoFrameCount, encodeFrameCount, encodeFinish } =
  storeToRefs(useStartstart)

const notification = useNotification()

const logInst = ref<LogInst | null>(null)

const commandlog = ref('')

function getFrameCount(str: string): number {
  // console.log(str)
  if (videoFrameCount.value - encodeFrameCount.value < 5) {
    encodeFinish.value = true
  }
  const frameRegex = /frame=(\s*)(\d+)/
  const frameMatch = str.match(frameRegex)
  if (frameMatch) {
    return parseInt(frameMatch[2])
  }
  return 0
}

const progress = computed(() => {
  if (encodeFinish.value) {
    return 100
  }
  return Number(((encodeFrameCount.value / videoFrameCount.value) * 100).toFixed(2))
})

onMounted(() => {
  watchEffect(() => {
    if (commandlog.value) {
      nextTick(() => {
        logInst.value?.scrollTo({ position: 'bottom', slient: true })
      })
    }
  })
})

function showEXITcode(code: string): void {
  if (code.toString() === '0') {
    notification.success({
      title: t('StartStart.showEXITcodeNotification'),
      duration: 5000,
      keepAliveOnHover: true
    })
  } else {
    notification.warning({
      title: t('StartStart.showEXITcodeNotification_1'),
      duration: 5000,
      keepAliveOnHover: true
    })
  }
}

watchEffect(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.electron.ipcRenderer.on('command-stdout', (event, data) => {
    commandlog.value += data
    encodeFrameCount.value = getFrameCount(data)
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.electron.ipcRenderer.on('command-stderr', (event, data) => {
    commandlog.value += data
    encodeFrameCount.value = getFrameCount(data)
  })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.electron.ipcRenderer.on('command-close-code', (event, data) => {
    commandlog.value += data
    showEXITcode(data)
    StartCommandLock.value = false
  })
})

async function showSTART(): Promise<void> {
  if (StartCommandLock.value) {
    notification.info({
      title: t('StartStart.showSTARTNotification'),
      content: t('StartStart.showSTARTNotification_1'),
      duration: 5000,
      keepAliveOnHover: true
    })
    return
  }

  StartCommandLock.value = true

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  videoFrameCount.value = await window.electron.ipcRenderer.invoke(
    'get-video-frame-count',
    '/Users/tohru/Downloads/testvideos/input.mp4'
  )

  console.log(videoFrameCount.value)

  const command =
    'ffmpeg -i /Users/tohru/Downloads/testvideos/input.mp4   -c:v libx265  -crf 20 -c:a copy /Users/tohru/Downloads/testvideos/output.mp4'

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.electron.ipcRenderer.send('execute-command', command)

  notification.success({
    title: t('StartStart.showSTARTNotification_2'),
    content: t('StartStart.showSTARTNotification_3'),
    duration: 5000,
    keepAliveOnHover: true
  })
}

async function showDEBUG(): Promise<void> {
  notification.warning({
    title: 'Debug',
    content: t('StartStart.showDEBUGNotification'),
    duration: 5000,
    keepAliveOnHover: true
  })
}

async function showEND(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.electron.ipcRenderer.send('kill-command')

  notification.success({
    title: t('StartStart.showENDNotification'),
    content: t('StartStart.showENDNotification_1'),
    duration: 5000,
    keepAliveOnHover: true
  })
}
</script>

<template>
  <div>
    <n-divider />
    <n-space justify="space-between">
      <n-button type="success" round @click="showSTART">
        {{ t('StartStart.NButtonStart') }}
      </n-button>

      <n-button type="warning" round @click="showDEBUG"> Debug </n-button>

      <n-button type="error" round @click="showEND"> {{ t('StartStart.NButtonEnd') }} </n-button>
    </n-space>
    <n-divider />
    <n-progress
      type="line"
      :percentage="progress"
      color="green"
      :indicator-placement="'inside'"
      processing
    />
    <br />
    <n-space vertical>
      <n-card title="Log" hoverable>
        <n-log ref="logInst" :log="commandlog" trim />
      </n-card>
    </n-space>
    <n-divider />
  </div>
</template>

<style scoped></style>
