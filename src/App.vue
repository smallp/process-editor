<script setup lang="ts">
function selected(name: string) {
  console.log("get " + name)
}
</script>

<template>
  <a-layout style="height: '100%'">
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-sider
        :style="{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }"
      >
        <my-menu @fuck="selected" />
      </a-layout-sider>
      <a-layout-content>Content</a-layout-content>
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
