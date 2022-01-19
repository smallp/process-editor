<script setup lang="ts">
import { ref } from "vue"

let selectedKey = ref("")
function selected(name: string) {
  selectedKey.value = name
}
</script>

<template>
  <a-layout style="height: '100%'">
    <a-layout-header>
      <a-popover placement="leftTop"
        ><question-circle-two-tone
          :style="{
            fontSize: '50px',
            position: 'fixed',
            margin: '7px',
            right: 0,
          }"
        /><template #content>
          <p>ctrl+e 导出为图片</p>
          <p>ctrl+s 保存</p>
          <p>ctrl+c 复制</p>
          <p>ctrl+x 剪切</p>
          <p>ctrl+v 粘贴</p>
          <p>ctrl+z 撤销</p>
          <p>ctrl+shift+z 重做</p>
          <p>双击内容或连接线可以编辑内容</p>
        </template></a-popover
      ></a-layout-header
    >
    <a-layout style="height: calc(100vh - 64px)">
      <a-layout-sider
        :style="{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }"
      >
        <my-menu @select="selected" />
      </a-layout-sider>
      <a-layout-content><ProcessMain :pname="selectedKey" /></a-layout-content>
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
</style>
