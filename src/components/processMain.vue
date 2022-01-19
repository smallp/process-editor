<script lang="ts" setup>
import { Graph, Addon, Shape } from "@antv/x6"
import { onMounted, toRef, watch } from "vue"
import { group } from "./tempNodes"
import { editLabel, editOnEnter, bindEvents, hideEdit } from "./eventHandle"
import "ant-design-vue/es/message/style/css"
import "ant-design-vue/es/modal/style/css"
import { Modal } from "ant-design-vue"

const prop = defineProps<{ pname: string }>()
watch(toRef(prop, "pname"), (newv, ori) => {
  if (newv == "" || newv == "del") {
    graph.clearCells()
  } else if (ori.length > 3 && graph.history.canUndo()) {
    Modal.confirm({
      title: "需要保存修改吗?",
      onOk() {
        let data = graph.toJSON()
        localStorage.setItem(ori, JSON.stringify(data))
        init()
      },
      onCancel() {
        init()
      },
    })
  } else {
    init()
  }
})
let graph: Graph, container: HTMLElement
function init() {
  if (graph) graph.dispose()
  let w = document.body.clientWidth - 400
  let h = document.body.clientHeight - 64
  graph = new Graph({
    container,
    width: w,
    height: h,
    background: {
      color: "#ffffff", // 设置画布背景颜色
    },
    grid: {
      size: 10, // 网格大小 10px
      visible: true, // 渲染网格背景
    },
    scroller: {
      enabled: true,
      pannable: true,
      pageVisible: false,
      pageBreak: false,
    },
    mousewheel: {
      enabled: true,
      modifiers: ["ctrl", "meta"],
    },
    snapline: true,
    clipboard: true,
    resizing: true,
    history: true,
    keyboard: {
      enabled: true,
      global: true,
    },
    selecting: {
      enabled: true,
      showEdgeSelectionBox: true,
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
  bindEvents(graph, container, prop)

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
  let data = ""
  if (prop.pname.length > 3) {
    data = localStorage.getItem(prop.pname)
    if (data) {
      graph.fromJSON(JSON.parse(data))
      graph.centerContent()
    }
  }
}

onMounted(() => {
  container = document.getElementById("main")
  init()
})
</script>
<template>
  <div id="tools"></div>
  <div id="container"><div id="main"></div></div>
  <div id="editor" v-show="editLabel.show">
    <a-textarea
      v-model:value="editLabel.value"
      @pressEnter="editOnEnter"
      @keydown.esc="hideEdit"
      @blur="hideEdit"
    />
  </div>
</template>
<style>
#tools {
  position: fixed;
  left: 200px;
  width: 200px;
}
#container {
  position: fixed;
  right: 0;
}
#editor {
  position: fixed;
}
</style>
