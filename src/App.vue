<script setup lang="ts">
import { ref, reactive } from 'vue'
const main: any = ref(null)
let action = reactive({ act: () => { }, show: false, val: "" })
function importData() {
  action.act = () => {
    action.show = false
    main.value.importData(action.val)
  }
  action.val = ""
  action.show = true
}
function exportData() {
  action.act = () => {
    action.show = false
  }
  action.val = main.value.getData()
  action.show = true
}
</script>

<template>
  <a-layout style="height: '100%'">
    <a-layout-header>
      <span id="title">戴森球计划 bwiki 科技页面生成工具</span>
      <div id="apptools">
        <a-button type="primary" @click="importData">导入</a-button>
        <a-button type="primary" @click="exportData">导出</a-button>
        <a-popover placement="leftTop"><question-circle-two-tone :style="{
          fontSize: '50px',
          margin: '7px',
          float: 'right'
        }" /><template #content>
            <p>ctrl+c 复制</p>
            <p>ctrl+x 剪切</p>
            <p>ctrl+v 粘贴</p>
            <p>ctrl+z 撤销</p>
            <p>ctrl+shift+z 重做</p>
            <p>双击可以编辑内容</p>
          </template></a-popover>
      </div>
    </a-layout-header>
    <a-layout style="height: calc(100vh - 64px)">
      <a-layout-content>
        <ProcessMain ref="main" />
        <a-modal @ok="action.act" v-model:open="action.show">
          <a-textarea v-model:value.lazy="action.val" :autoSize="{ minRows: 6, maxRows: 6 }" />
        </a-modal>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

#title {
  color: #bbb;
  float: left;
  font-size: 30px;
}

#apptools {
  float: right;
}

button {
  margin: 10px;
}
</style>