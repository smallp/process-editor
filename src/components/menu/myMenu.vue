<script setup lang="ts">
import { AntTreeNodeExpandedEvent, EventDataNode } from "ant-design-vue/es/tree"
import { ref } from "vue"

const emit = defineEmits<{
  (e: "select", key: string): void
}>()

let data = [
  {
    title: "root",
    key: "0",
    children: [
      {
        title: "test",
        key: "01",
        children: [
          { title: "t1", key: "02", children: [] },
          { title: "t2", key: "12" },
        ],
      },
      { title: "t13", key: "03", children: [{ title: "hh", key: "11" }] },
      { title: "xixi", key: "1" },
    ],
  },
]
let expandedKeys = ref(["0"])

const onContextMenuClick = (treeKey: string, menuKey: string) => {
  console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`)
}

function handleExpand(keys: string[], info: AntTreeNodeExpandedEvent) {
  const node = info.node
  if (!node.parent) return
  const pKey = node.parent.key.toString()
  if (info.expanded) {
    const index = expandedKeys.value.indexOf(pKey)
    expandedKeys.value = expandedKeys.value.slice(0, index + 1)
    expandedKeys.value.push(node.key.toString())
  }
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
    :tree-data="data"
    :draggable="true"
    :show-icon="true"
    v-model:expandedKeys="expandedKeys"
    @expand="handleExpand"
    @select="select"
  >
    <template #title="{ key: treeKey, title }">
      <a-dropdown :trigger="['contextmenu']">
        <span>{{ title }}</span>
        <template #overlay>
          <a-menu
            @click="
              ({ key: menuKey }) =>
                onContextMenuClick(treeKey, menuKey.toString())
            "
          >
            <template v-if="treeKey.startsWith('0')">
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
            <a-menu-item key="delete" v-if="treeKey != '0'">
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
</template>
