import { Graph } from "@antv/x6"
import { DataUri } from "@antv/x6"
import { nextTick, reactive } from "vue"
import { message } from "ant-design-vue"

//改文字相关
export const editLabel = reactive({
  value: "",
  show: false,
  callback: () => {},
})
export function editOnEnter(e: KeyboardEvent) {
  if (e.shiftKey) return
  editLabel.callback()
}
export function hideEdit() {
  editLabel.show = false
}
//改文字相关结束

export function bindEvents(
  graph: Graph,
  container: HTMLElement,
  prop: Readonly<{ pname: string }>
) {
  //ctrl+cv delete
  graph.bindKey(["ctrl+s", "meta+s"], () => {
    if (prop.pname.length > 3) {
      let data = graph.toJSON()
      localStorage.setItem(prop.pname, JSON.stringify(data))
      message.success("保存成功！")
    } else {
      message.error("无效文件！")
    }
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

  graph.bindKey(["ctrl+e", "meta+e"], () => {
    if (prop.pname.length > 3) {
      graph.toPNG(
        (dataUri: string) => {
          // 下载
          DataUri.downloadDataUri(dataUri, "chart.png")
        },
        {
          padding: {
            horizontal: 30,
            vertical: 10,
          },
        }
      )
    } else {
      message.error("无效文件！")
    }
    return false
  })
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
  //编辑文字
  graph.on("node:dblclick", (params) => {
    editLabel.show = true
    editLabel.value = (params.node as any).label
    const node = document.getElementById("editor")
    node.style.left = params.x + 300 + "px"
    node.style.top = params.y + 30 + "px"
    nextTick(() => {
      ;(node.children[0] as HTMLTextAreaElement).focus()
    })
    editLabel.callback = () => {
      if (editLabel.value.length >= 0) {
        ;(params.node as any).label = editLabel.value
      }
      editLabel.show = false
    }
  })
  graph.on("edge:dblclick", (params) => {
    editLabel.show = true
    const lables = params.edge.getLabels()
    if (lables.length == 0) {
      params.edge.setLabels("")
      editLabel.value = ""
    } else {
      editLabel.value = lables[0].attrs.label.text.toString()
    }
    const node = document.getElementById("editor")
    node.style.left = params.x + 300 + "px"
    node.style.top = params.y + 30 + "px"
    nextTick(() => {
      ;(node.children[0] as HTMLTextAreaElement).focus()
    })
    editLabel.callback = () => {
      if (editLabel.value.length >= 0) {
        params.edge.setLabels(editLabel.value)
      }
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
