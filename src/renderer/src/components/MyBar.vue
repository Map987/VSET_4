<script setup lang="ts">
import { ref } from 'vue'
import useClipboard from 'vue-clipboard3'
import { useNotification, NSpace, NButton, NIcon, NDivider } from 'naive-ui'
import { GithubOutlined, QqOutlined } from '@vicons/antd'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const qqGroupNum = '711185279'
const githubLink = 'https://github.com/NangInShell/VSET'

const loadingRef = ref(false)
const { toClipboard } = useClipboard()
const notification = useNotification()

async function GithubClick(): Promise<void> {
  loadingRef.value = true
  setTimeout(() => {
    loadingRef.value = false
    window.open(githubLink, '_blank')
  }, 100)
}

async function QQClick(): Promise<void> {
  try {
    await toClipboard(qqGroupNum)
    console.log('Copied to clipboard')
    notification.success({
      title: t('MyBar.QQClick.message0') + qqGroupNum,
      content: t('MyBar.QQClick.message1'),
      duration: 1500,
      keepAliveOnHover: true
    })
  } catch (e) {
    console.error(e)
    notification.error({
      content: t('MyBar.QQClick.message2'),
      duration: 1500,
      keepAliveOnHover: true
    })
  }
}
</script>

<template>
  <div>
    <div class="MyBar">
      <n-space>
        <n-button round size="medium" :loading="loadingRef" @click="GithubClick">
          <n-icon>
            <github-outlined />
          </n-icon>
        </n-button>
        <n-button round size="medium" @click="QQClick">
          <n-icon>
            <qq-outlined />
          </n-icon>
        </n-button>
      </n-space>
    </div>
    <n-divider />
  </div>
</template>

<style>
.MyBar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
