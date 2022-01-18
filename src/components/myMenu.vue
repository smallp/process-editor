<script setup lang="ts">
import { MenuInfo } from "ant-design-vue/es/menu/src/interface"
import {
  EventDataNode,
  DataNode,
  AntTreeNodeDropEvent,
} from "ant-design-vue/es/tree"
import { ref, reactive, nextTick } from "vue"
interface dataNode {
  title: string
  key: string
  children?: dataNode[]
}
interface findNodeRes {
  node: dataNode
  parent: dataNode | null
  index: number
}

const emit = defineEmits<{
  (e: "select", key: string): void
}>()
let ori = localStorage.getItem("menu")
let data: dataNode = reactive({
  title: "root",
  key: "0",
  children: ori ? JSON.parse(ori) : [],
})
let expandedKeys = ref(["0"])

function _findNode(root: dataNode, key: string): findNodeRes | null {
  for (const i in root.children) {
    const x = root.children[i]
    if (x.key == key) return { node: x, parent: root, index: parseInt(i) }
    else {
      if (x.children) {
        const res = _findNode(x, key)
        if (res) {
          if (res.parent == null) {
            res.parent = x
            res.index = parseInt(i)
          }
          return res
        }
      }
    }
  }
  return null
}

function findNode(key: string): findNodeRes {
  if (key == "0") return { node: data, parent: null, index: 0 }
  return _findNode(data, key)!
}

//菜单的增删查改
let editConfig = reactive({
  show: false,
  value: "",
  input: null,
  callback: () => {},
})

function delContent(root: DataNode) {
  if ("children" in root) {
    for (const x of root.children) {
      delContent(x)
    }
  } else {
    localStorage.removeItem(root.key.toString())
  }
}
let menuNode = ref<DataNode>(null)
function showMenu(params: { event: MouseEvent; node: EventDataNode }) {
  menuNode.value = params.node.dataRef
}
function menuClick(handle: MenuInfo) {
  const target = menuNode.value
  switch (handle.key) {
    case "addFolder":
      const time1 = new Date().getTime()
      target.children.push({
        title: "new folder",
        key: "0" + time1,
        children: [],
      })
      break
    case "addFile":
      const time2 = new Date().getTime()
      target.children.push({ title: "new file", key: "1" + time2 })
      break
    case "rename":
      editConfig.value = target.title
      editConfig.show = true
      nextTick(() => {
        editConfig.input.input.focus()
      })
      editConfig.callback = () => {
        editConfig.show = false
        target.title = editConfig.value
        localStorage.setItem("menu", JSON.stringify(data.children))
      }
      return
    case "delete":
      const res = findNode(target.key.toString())
      delContent(res.node)
      res.parent.children.splice(res.index, 1)
      menuNode.value = null
      break
    default:
      break
  }
  localStorage.setItem("menu", JSON.stringify(data.children))
}
//菜单的增删查改结束

//拖动处理
function onDrop(info: AntTreeNodeDropEvent) {
  // console.log(info)
  const fromK = info.dragNode.key.toString()
  if (fromK == "root") return
  const toK = info.node.key.toString()
  console.log({
    fromK: info.dragNode.title,
    toK: info.node.title,
    index: info.dropPosition,
    gap: info.dropToGap,
  })
  const fromNode = findNode(fromK)
  fromNode.parent.children.splice(fromNode.index, 1)
  if (!info.dropToGap && toK.startsWith("0")) {
    //移动到文件夹下面
    info.node.dataRef.children.unshift(fromNode.node)
  } else {
    const toNode = findNode(toK)
    toNode.parent.children.splice(toNode.index + 1, 0, fromNode.node)
  }
  localStorage.setItem("menu", JSON.stringify(data.children))
}

function select(
  _selectKeys: Array<string>,
  info: {
    node: EventDataNode
  }
) {
  let data = info.node.dataRef
  if ("children" in data) return
  emit("select", data.key.toString())
}
</script>

<template>
  <a-dropdown :trigger="['contextmenu']">
    <a-tree
      :tree-data="[data]"
      :draggable="true"
      :show-icon="true"
      v-model:expandedKeys="expandedKeys"
      @right-click="showMenu"
      @select="select"
      @drop="onDrop"
    >
      <template #icon="{ dataRef }">
        <file-two-tone v-if="!('children' in dataRef)" />
        <folder-open-two-tone v-else-if="expandedKeys.includes(dataRef.key)" />
        <folder-two-tone v-else />
      </template>
    </a-tree>
    <template #overlay>
      <a-menu @click="menuClick">
        <template v-if="menuNode.key.toString().startsWith('0')">
          <a-menu-item key="addFolder">
            <template #icon><folder-add-two-tone /></template
            >添加文件夹</a-menu-item
          >
          <a-menu-item key="addFile">
            <template #icon><file-add-two-tone /></template>
            添加文件</a-menu-item
          ></template
        >
        <a-menu-item key="rename">
          <template #icon><edit-two-tone /></template>重命名</a-menu-item
        >
        <a-menu-item key="delete" v-if="menuNode.key != '0'" danger>
          <template #icon><delete-two-tone /></template>删除</a-menu-item
        >
      </a-menu></template
    >
  </a-dropdown>
  <a-modal
    v-model:visible="editConfig.show"
    title="重命名"
    @ok="editConfig.callback"
  >
    <a-input
      :ref="
        (el) => {
          editConfig.input = el
        }
      "
      v-model:value="editConfig.value"
      @press-enter="editConfig.callback"
      placeholder="新名字"
    />
  </a-modal>
</template>
