import { Graph } from "@antv/x6"
import { nextTick, reactive } from "vue"
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Selection } from '@antv/x6-plugin-selection'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { History } from '@antv/x6-plugin-history'
import { Scroller } from '@antv/x6-plugin-scroller'
import { Snapline } from '@antv/x6-plugin-snapline'

//改文字相关
export const editLabel = reactive({
  value: {
    img:'',
    name:'',
    url:'',
  },
  show: false,
  callback: () => {},
})
export function editOnEnter() {
  editLabel.callback()
}
//改文字相关结束

export function bindEvents(
  graph: Graph,
  container: HTMLElement
) {
  graph.use(
    new Scroller({
      enabled: true,
      pannable:true,
    }),
  )
  graph.use(
    new Snapline({
      enabled: true,
      sharp: true,
    }),
  )
  graph.use(
    new Clipboard({
      enabled: true,
    }),
  )
  graph.use(
    new Selection({
      enabled: true,
      showNodeSelectionBox: true,
    }),
  )
  graph.use(
    new Keyboard({
      enabled: true,
      global: true,
    }),
  )
  graph.use(
    new History({
      enabled: true,
    }),
  )
  //ctrl+cv delete
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
    if (graph.canUndo()) {
      graph.undo()
    }
    return false
  })
  graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
    if (graph.canRedo()) {
      graph.redo()
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
  //编辑文字
  graph.on("node:dblclick", (params) => {
    editLabel.show = true
    editLabel.value = params.node.data
    editLabel.callback = () => {
      params.node.data=editLabel.value
      editLabel.show = false
    }
  })
  // #endregion
}
function showPorts(ports: NodeListOf<SVGElement>, show: boolean) {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? "visible" : "hidden"
  }
}
