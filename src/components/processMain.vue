<script lang="ts" setup>
import { Graph, Addon, Shape } from "@antv/x6"
import { onMounted, toRef, watch } from "vue"
import { group, showPorts } from "./tempNodes"
import { message } from "ant-design-vue"
import "ant-design-vue/es/message/style/css"

const prop = defineProps<{ pname: string }>()
watch(toRef(prop, "pname"), (newv, ori) => {
  console.log(newv, ori)
})
let graph: Graph

function init() {
  const container = document.getElementById("main")
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
  //ctrl+cv delete
  graph.bindKey(["ctrl+s", "meta+s"], () => {
    message.success("保存成功！")
    return false
  })
  graph.bindKey(["meta+c", "ctrl+c"], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })
  graph.bindKey(["meta+x", "ctrl+x"], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.cut(cells)
    }
    return false
  })
  graph.bindKey(["meta+v", "ctrl+v"], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })
  graph.bindKey(["backspace", "delete"], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  })
  // #endregion

  //undo redo
  graph.bindKey(["meta+z", "ctrl+z"], () => {
    if (graph.history.canUndo()) {
      graph.history.undo()
    }
    return false
  })
  graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
    if (graph.history.canRedo()) {
      graph.history.redo()
    }
    return false
  })
  // #endregion

  // 控制连接桩显示/隐藏
  graph.on("node:mouseenter", () => {
    const ports = container.querySelectorAll(
      ".x6-port-body"
    ) as NodeListOf<SVGElement>
    showPorts(ports, true)
  })
  graph.on("node:mouseleave", () => {
    const ports = container.querySelectorAll(
      ".x6-port-body"
    ) as NodeListOf<SVGElement>
    showPorts(ports, false)
  })
  // #endregion

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
  <div id="container"><div id="main"></div></div>
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
</style>
