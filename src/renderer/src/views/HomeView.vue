<script setup lang="ts">
import { ref } from 'vue'
import {
  NButton,
  NThing,
  NIcon,
  NAvatar,
  NRow,
  NCol,
  NCheckbox,
  NCard,
  NSpace,
  NDivider,
  NTimeline,
  NTimelineItem,
  NCollapse,
  NCollapseItem
} from 'naive-ui'
import MyBar from '../components/MyBar.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <MyBar />
    <n-row>
      <n-col :span="12">
        <n-checkbox :checked="true"> 动漫视频超分辨率 </n-checkbox>
      </n-col>
      <n-col :span="12">
        <n-checkbox :checked="true"> 实拍视频超分辨率 </n-checkbox>
      </n-col>
    </n-row>
    <n-row>
      <n-col :span="12">
        <n-checkbox :checked="true"> 自定义参数压制 </n-checkbox>
      </n-col>
      <n-col :span="12">
        <n-checkbox :checked="true"> Free </n-checkbox>
      </n-col>
    </n-row>
    <n-divider />
    <div style="overflow: auto">
      <n-timeline horizontal>
        <n-timeline-item content="" />
        <n-timeline-item type="success" title="开发中" content="还行" time="2023-3-03" />
        <n-timeline-item type="error" content="修复了一些错误" time="2023-3-05" />
        <n-timeline-item type="warning" title="快升级" content="有点bug" time="2023-3-08" />
        <n-timeline-item
          type="info"
          title=""
          content="小更新"
          time="2023-3-09"
          line-type="dashed"
        />
        <n-timeline-item content="敬请期待" />
      </n-timeline>
    </div>
    <n-divider />
    <n-card title="开发者废话">
      <n-collapse :default-expanded-names="['1']">
        <n-collapse-item title="Tohru" name="1">
          <div>还不错吧，嘿嘿</div>
        </n-collapse-item>
        <n-collapse-item title="NangInShell" name="2">
          <div>鸡你太美</div>
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </div>
</template>
