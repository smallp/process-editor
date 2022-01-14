<script setup lang="ts">
import { EventDataNode } from "ant-design-vue/es/tree"
import { ref, reactive } from "vue"
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

let editConfig = reactive({
  show: false,
  value: "",
  callback: () => {},
})

function delContent(root: dataNode) {
  if (root.children) {
    for (const x of root.children) {
      delContent(x)
    }
  } else {
    localStorage.removeItem(root.key)
  }
}

const onContextMenuClick = (treeKey: string, menuKey: string) => {
  const target = findNode(treeKey)
  switch (menuKey) {
    case "addFolder":
      const time1 = new Date().getTime()
      target.node.children.push({
        title: "new folder",
        key: "0" + time1,
        children: [],
      })
      break
    case "addFile":
      const time2 = new Date().getTime()
      target.node.children.push({ title: "new file", key: "1" + time2 })
      break
    case "rename":
      editConfig.value = ""
      editConfig.show = true
      editConfig.callback = () => {
        editConfig.show = false
        target.node.title = editConfig.value
        localStorage.setItem("menu", JSON.stringify(data.children))
      }
      return
    case "delete":
      delContent(target.node)
      target.parent.children.splice(target.index, 1)
      break
    default:
      break
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
  <a-tree
    :tree-data="[data]"
    :draggable="true"
    :show-icon="true"
    v-model:expandedKeys="expandedKeys"
    @select="select"
  >
    <template #title="info">
      <a-dropdown :trigger="['contextmenu']">
        <span>{{ info.title }}</span>
        <template #overlay>
          <a-menu
            @click="
              ({ key: menuKey }) =>
                onContextMenuClick(info.key, menuKey.toString())
            "
          >
            <template v-if="info.key.startsWith('0')">
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
            <a-menu-item key="delete" v-if="info.key != '0'">
              <template #icon><delete-two-tone /></template>删除</a-menu-item
            >
          </a-menu>
        </template>
      </a-dropdown>
    </template>
    <template #icon="{ dataRef }">
      <file-two-tone v-if="!('children' in dataRef)" />
      <folder-open-two-tone v-else-if="expandedKeys.includes(dataRef.key)" />
      <folder-two-tone v-else />
    </template>
  </a-tree>
  <a-modal
    v-model:visible="editConfig.show"
    title="重命名"
    @ok="editConfig.callback"
  >
    <a-input v-model:value="editConfig.value" placeholder="新名字" />
  </a-modal>
</template>
