<script setup lang="ts">
let selectedKey = ""
function selected(name: string) {
  console.log("get " + name)
  selectedKey = name
}
</script>

<template>
  <a-layout style="height: '100%'">
    <a-layout-header>Header</a-layout-header>
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
