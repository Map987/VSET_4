<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from './router'
import type { GlobalTheme } from 'naive-ui'
import {
  darkTheme,
  NButton,
  NConfigProvider,
  NIcon,
  NMessageProvider,
  NNotificationProvider,
  NStep,
  NSteps,
  StepsProps,
  useOsTheme
} from 'naive-ui'
import { computed, onMounted, onBeforeMount, ref } from 'vue'
import {
  HomeOutlined,
  RocketOutlined,
  SwapOutlined,
  TranslationOutlined,
  SettingOutlined
} from '@vicons/antd'
import { FilmOutline, MoonOutline, PaperPlaneOutline, SunnyOutline } from '@vicons/ionicons5'
import { interpolateColor } from './utils/DarkModeColor'
import { useGlobalsettingsStore } from './store/globalsettings'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const langs = ['en', 'zh', 'ja']

const { langsNum, hasNvidiaGPU, system, systemArch, gpulist } = storeToRefs(
  useGlobalsettingsStore()
)

function switchLanguage(): void {
  langsNum.value = (langsNum.value + 1) % langs.length
  locale.value = langs[langsNum.value]
  localStorage.setItem('LANG', langs[langsNum.value])
}

onMounted(async () => {
  locale.value = langs[langsNum.value]
  localStorage.setItem('LANG', langs[langsNum.value])
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res = await window.electron.ipcRenderer.invoke('getSystemInfo')
  for (const i in res[3]) {
    gpulist.value.push({ label: String(res[3][i]), value: Number(i) })
    console.log(String(res[3][i]), Number(i))
  }
  hasNvidiaGPU.value = res[0]
  console.log(hasNvidiaGPU.value)
  system.value = String(res[1])
  console.log(system.value)
  systemArch.value = String(res[2])
  console.log(systemArch.value)
})

const globalcolor = ref('rgba(255, 250, 250, 0.8)')

function switchCSSstyleLight(): void {
  const layer = 20
  for (let i = 1; i <= layer; i++) {
    setTimeout(() => {
      globalcolor.value = interpolateColor('#000000CC', '#FFFAFACC', i / layer)
    }, layer * i)
  }
}

function switchCSSstyleDark(): void {
  const layer = 20
  for (let i = 1; i <= layer; i++) {
    setTimeout(() => {
      globalcolor.value = interpolateColor('#FFFAFACC', '#000000CC', i / layer)
    }, layer * i)
  }
}

const current = ref<number | null>(0)
const currentStatus = ref<StepsProps['status']>('process')

const osThemeRef = useOsTheme()
const manualTheme = ref<GlobalTheme>(null)
const manualThemeLock = ref(false)

const getTheme = computed(() => {
  if (manualThemeLock.value) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    manualThemeLock.value = false
    return manualTheme.value
  }
  if (osThemeRef.value === 'dark') {
    switchCSSstyleDark()
    return darkTheme
  } else {
    switchCSSstyleLight()
    return null
  }
})

const StartupDarkmodeLock = ref(true)

function switchTheme(): void {
  manualThemeLock.value = true
  if (manualTheme.value === null) {
    // 防止Dark Mode第一次切换失效
    if (StartupDarkmodeLock.value && osThemeRef.value === 'dark') {
      StartupDarkmodeLock.value = false
      switchCSSstyleLight()
      manualTheme.value = null
      return
    }
    switchCSSstyleDark()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    manualTheme.value = darkTheme
  } else {
    switchCSSstyleLight()
    manualTheme.value = null
  }
}
</script>

<template>
  <n-config-provider :theme="getTheme">
    <n-message-provider>
      <n-notification-provider>
        <div class="drag" />
        <div class="MyNav">
          <div class="sidebar">
            <div class="logo">
              <img alt="logo" src="./assets/logo.png" />
            </div>
            <n-steps v-model:current="current" vertical :status="currentStatus">
              <n-step :title="t('AppVue.Nstep1')" @click="router.push('/home-view')">
                <template #icon>
                  <n-icon>
                    <home-outlined />
                  </n-icon>
                </template>
              </n-step>

              <n-step :title="t('AppVue.Nstep2')" @click="router.push('/input-and-output')">
                <template #icon>
                  <n-icon>
                    <swap-outlined />
                  </n-icon>
                </template>
              </n-step>

              <n-step
                :title="t('AppVue.Nstep3')"
                :description="t('AppVue.Nstep3_1')"
                @click="router.push('/super-resolution')"
              >
                <template #icon>
                  <n-icon>
                    <rocket-outlined />
                  </n-icon>
                </template>
              </n-step>

              <n-step
                :title="t('AppVue.Nstep4')"
                :description="t('AppVue.Nstep4_1')"
                @click="router.push('/encode-params')"
              >
                <template #icon>
                  <n-icon>
                    <film-outline />
                  </n-icon>
                </template>
              </n-step>

              <n-step :title="t('AppVue.Nstep5')" @click="router.push('/start')">
                <template #icon>
                  <n-icon>
                    <paper-plane-outline />
                  </n-icon>
                </template>
              </n-step>
            </n-steps>
            <div class="dark-mode">
              <n-button text style="font-size: 32px" @click="switchTheme">
                <div v-if="getTheme === null">
                  <n-icon>
                    <moon-outline />
                  </n-icon>
                </div>
                <div v-else>
                  <n-icon>
                    <sunny-outline />
                  </n-icon>
                </div>
              </n-button>
            </div>
            <div class="lang-switch">
              <n-button text style="font-size: 32px" @click="switchLanguage">
                <div>
                  <n-icon>
                    <translation-outlined />
                  </n-icon>
                </div>
              </n-button>
            </div>
            <div class="vset-settings">
              <n-button text style="font-size: 32px" @click="router.push('/vsettings')">
                <div>
                  <n-icon>
                    <setting-outlined />
                  </n-icon>
                </div>
              </n-button>
            </div>
          </div>

          <div class="main">
            <router-view v-slot="{ Component }">
              <transition name="fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </n-notification-provider>
    </n-message-provider>
    <n-global-style />
  </n-config-provider>
</template>

<style lang="scss">
$global-color: v-bind(globalcolor);

::-webkit-scrollbar {
  display: none;
}

.drag {
  width: 100%;
  height: 30px;
  position: fixed;
  backdrop-filter: blur(10px);
  background-color: $global-color;
  -webkit-app-region: drag;
}

.MyNav {
  backdrop-filter: blur(10px);
  background-color: $global-color;
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.sidebar {
  width: 200px;
  backdrop-filter: blur(10px);
  background-color: $global-color;
  border-right: 1px solid $global-color;
  padding: 20px;
  box-sizing: border-box;
  height: 100vh;
}

.logo {
  width: 180px;
  backdrop-filter: blur(10px);
  background-color: $global-color;
  border-right: 1px solid $global-color;
  padding: 20px;
  box-sizing: border-box;
  height: 9vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  backdrop-filter: blur(10px);
  background-color: $global-color;
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.dark-mode {
  position: fixed;
  bottom: 20px;
  left: 120px;
  text-align: left;
  width: 100%;
  z-index: 10002;
  overflow: visible;
}

.lang-switch {
  position: fixed;
  bottom: 20px;
  left: 72px;
  text-align: left;
  width: 100%;
  z-index: 10001;
  overflow: visible;
}

.vset-settings {
  position: fixed;
  bottom: 20px;
  left: 22px;
  text-align: left;
  width: 100%;
  z-index: 10000;
  overflow: visible;
}

.main {
  backdrop-filter: blur(10px);
  background-color: $global-color;
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
}

.fade-enter-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
