<script setup lang="ts">
</script>

<template>
  <a-layout style="height: '100%'">
    <a-layout-header>
      <a-popover placement="leftTop"
        ><question-circle-two-tone
          :style="{
            fontSize: '50px',
            margin: '7px',
            float:'right'
          }"
        /><template #content>
          <p>ctrl+c 复制</p>
          <p>ctrl+x 剪切</p>
          <p>ctrl+v 粘贴</p>
          <p>ctrl+z 撤销</p>
          <p>ctrl+shift+z 重做</p>
          <p>双击内容可以编辑内容</p>
        </template></a-popover
      ></a-layout-header
    >
    <a-layout style="height: calc(100vh - 64px)">
      <a-layout-content><ProcessMain /></a-layout-content>
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
