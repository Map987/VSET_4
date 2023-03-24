<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MyBar from '../components/MyBar.vue'
import { useInputpathStore } from '../store/inputpath'
import { storeToRefs } from 'pinia'
import { ArrowLeftOutlined, VideoCameraAddOutlined } from '@vicons/antd'
import type { UploadFileInfo } from 'naive-ui'
import {
  NButton,
  NInput,
  NIcon,
  NP,
  NText,
  NUpload,
  NUploadDragger,
  NDrawer,
  NDrawerContent,
  NCode,
  useMessage,
  useNotification
} from 'naive-ui'
import PathFormat from '../utils/pathFormat'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const useInputpath = useInputpathStore()

const {
  addinputpath,
  deleteinputpath,
  getinputpath,
  getinputpathList,
  showinputpathList,
  setoutputpathManual,
  setoutputpath,
  getoutputpath
} = useInputpath

const inputFileList = storeToRefs(useInputpath).inputFileList

const pathFormat = new PathFormat()

const message = useMessage()

const notification = useNotification()

const inputValue = ref('')

const show = ref(false)

onMounted(() => {
  const dragWrapper = document.getElementById('file_drag')
  dragWrapper.addEventListener('drop', (e) => {
    //阻止默认行为
    e.preventDefault()
    //获取文件列表
    const files = e.dataTransfer.files

    if (files && files.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const path = files[0].path // 获取文件路径, 该路径是绝对路径, electron中可以直接使用
      console.log(path)
      pathFormat.setRootPath(path)
      console.log(pathFormat.getRootPath())
      setoutputpath(pathFormat.getRootPath())
    }
  })
  //阻止拖拽结束事件默认行为
  dragWrapper.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
})

function showoutputpathNotification(): void {
  notification.info({
    title: t('InputAndOutput.showoutputpathNotification'),
    content: getoutputpath(),
    duration: 1000,
    keepAliveOnHover: true
  })
}

function setoutputpathM(inputValue: string): void {
  if (pathFormat.checkPath(inputValue)) {
    setoutputpathManual(inputValue)
    notification.success({
      title: t('InputAndOutput.setoutputpathM'),
      content: inputValue,
      duration: 1000,
      keepAliveOnHover: true
    })
    return
  }
  notification.error({
    title: t('InputAndOutput.setoutputpathM_1'),
    content: t('InputAndOutput.setoutputpathM_2'),
    duration: 1000,
    keepAliveOnHover: true
  })
  showoutputpathNotification()
}

const handleUploadChange = (data: { fileList: UploadFileInfo[] }): void => {
  inputFileList.value = data.fileList
}

const handle = (options: { file: UploadFileInfo }): UploadFileInfo => {
  console.log(options.file.fullPath)
  console.log(pathFormat.getNewPath(options.file.fullPath))
  addinputpath(options.file.id, pathFormat.getNewPath(options.file.fullPath))
  message.loading(t('InputAndOutput.uploadfileloadinginfo'), { duration: 500 })
  return options.file
}

const handleRemove = (options: {
  file: UploadFileInfo
  fileList: Array<UploadFileInfo>
}): boolean => {
  console.log(options.file.id)
  notification.success({
    title: t('InputAndOutput.removefileNotification'),
    content: options.file.name,
    duration: 1000,
    keepAliveOnHover: true
  })
  deleteinputpath(options.file.id)
  return true
}
</script>

<template>
  <div>
    <MyBar />
    <n-input
      v-model:value="inputValue"
      type="text"
      :placeholder="getoutputpath()"
      autosize
      style="min-width: 50%"
    />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <n-button strong secondary round type="success" @click="setoutputpathM(inputValue)">
      {{ t('InputAndOutput.NButtonSetoutputpathM') }}
    </n-button>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <n-button strong secondary round type="info" @click="show = !show">
      {{ t('InputAndOutput.NButtonShowInputFileList') }}
      <n-icon>
        <arrow-left-outlined />
      </n-icon>
    </n-button>
    <br />
    <n-drawer v-model:show="show" :width="480">
      <n-drawer-content title="InputPathList" :native-scrollbar="false">
        <n-code :code="showinputpathList()" />
      </n-drawer-content>
    </n-drawer>
    <br />
    <div id="file_drag" class="for_file_drag" @click.prevent>
      <n-upload
        v-model:file-list="inputFileList"
        multiple
        directory-dnd
        @change="handleUploadChange"
        @before-upload="handle"
        @remove="handleRemove"
      >
        <n-upload-dragger class="file-drag-zone">
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <video-camera-add-outlined />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            {{ t('InputAndOutput.NUploadDragger') }}
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            {{ t('InputAndOutput.NUploadDragger_1') }}
          </n-p>
        </n-upload-dragger>
      </n-upload>
    </div>
  </div>
</template>

<style scoped>
.for_file_drag {
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
}
</style>
