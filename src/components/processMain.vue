<script lang="ts" setup>
import { Graph, Shape } from "@antv/x6"
import { Stencil } from '@antv/x6-plugin-stencil'
import { onMounted, toRef, watch } from "vue"
import "./tempNodes"
import { editLabel, editOnEnter, bindEvents } from "./eventHandle"

let graph: Graph, container: HTMLElement
function init() {
  if (graph) graph.dispose()
  let w = document.body.clientWidth - 200
  let h = document.body.clientHeight - 64
  graph = new Graph({
    container,
    width: w,
    height: h,
    background: {
      color: "#ffffff", // 设置画布背景颜色
    },
    mousewheel: {
      enabled: true,
      modifiers: ["ctrl", "meta"],
    },
    connecting: {
      router: {
        name: "manhattan",
        args: {
          padding: 1,
        },
      },
      connector: {
        name: "rounded",
        args: {
          radius: 8,
        },
      },
      anchor: "center",
      connectionPoint: "anchor",
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#A2B1C3",
              strokeWidth: 2,
              targetMarker: {
                name: "block",
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        })
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet
      },
    },
  })
  bindEvents(graph, container)

  const stencil = new Stencil({
    target: graph,
    stencilGraphWidth: 200,
    stencilGraphHeight: h,
    groups: [{
      name: 'g',
    }],
  })
  stencil.options.stencilGraphHeight = 300
  const tools = document.getElementById("tools")!
  tools.style.height = h + "px"
  if (tools.children.length > 0) {
    tools.removeChild(tools.children[0])
  }
  tools.appendChild(stencil.container)
  const mine = graph.createNode({
    shape: 'mine',
    data: {
      img: 'https://patchwiki.biligame.com/images/dsp/thumb/d/da/97gst2egdt2atxfh6tsa7a7o78jzqh3.png/64px-%E6%89%8B%E5%8A%A8%E9%87%87%E9%9B%86.png',
      name: '测试科技',
      url: '',
    }
  })
  stencil.load([mine], 'g')
}

onMounted(() => {
  container = document.getElementById("main")!
  init()
})
function importData(data: string) {
  graph.fromJSON(JSON.parse(data))
  graph.centerContent()
}
function getData() {
  const data = graph.toJSON()
  data.cells.forEach((cell: any) => {
    delete cell.ports
  })
  return JSON.stringify(data)
}
defineExpose({
  importData,
  getData,
})
</script>
<template>
  <div id="tools"></div>
  <div id="container">
    <div id="main"></div>
  </div>
  <a-modal v-model:open="editLabel.show" @ok="editOnEnter">
    <a-form>
      <a-form-item label="科技名称">
        <a-input v-model:value.lazy="editLabel.value.name" />
      </a-form-item>
      <a-form-item label="科技图标链接">
        <a-input v-model:value.lazy="editLabel.value.img" type="url" />
      </a-form-item>
      <a-form-item label="详情链接">
        <a-input v-model:value.lazy="editLabel.value.url" type="url" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<style>
#tools {
  position: fixed;
  left: 0px;
  width: 200px;
}

#container {
  position: fixed;
  right: 0;
}
</style>
