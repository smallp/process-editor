<script lang="ts" setup>
import { Graph, Addon } from "@antv/x6"
import { onMounted } from "vue"
import group from "./tempNodes"

const prop = defineProps<{ pname: string }>()

function init() {
  let w = document.body.clientWidth - 400
  let h = document.body.clientHeight - 64
  const graph = new Graph({
    container: document.getElementById("main"),
    width: w,
    height: h,
    background: {
      color: "#ffffff", // 设置画布背景颜色
    },
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
  })
  const stencil = new Addon.Stencil({
    target: graph,
    stencilGraphWidth: 200,
    stencilGraphHeight: h,
    groups: [...group.keys()].map((i) => {
      return {
        name: i,
        title: i,
      }
    }),
  })
  stencil.options.stencilGraphHeight = 300
  const tools = document.getElementById("tools")
  tools.style.height = h + "px"
  if (tools.children.length > 0) {
    tools.removeChild(tools.children[0])
  }
  tools.appendChild(stencil.container)
  group.forEach((v, k) => {
    stencil.load(v, k)
  })
}

onMounted(init)
</script>
<template>
  <div id="tools"></div>
  <div id="main"></div>
</template>
<style>
#tools {
  position: fixed;
  left: 200px;
  width: 200px;
}
#main {
  position: fixed;
  right: 0;
}
</style>
