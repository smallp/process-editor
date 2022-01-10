<script setup lang="ts">
import {
  FolderTwoTone,
  FileTwoTone,
  FolderOpenTwoTone,
} from "@ant-design/icons-vue"
import { EventDataNode } from "ant-design-vue/es/tree"
import { ref } from "vue"

const emit = defineEmits<{
  (e: "fuck", key: string): void
}>()

let data = [
  {
    title: "root",
    key: "root",
    children: [
      {
        title: "test",
        key: 1,
        children: [
          { title: "t1", key: 11, children: [] },
          { title: "t2", key: 12 },
        ],
      },
      { title: "xixi", key: 0 },
    ],
  },
]
let expandedKeys = ref(["root"])

const onContextMenuClick = (treeKey: string, menuKey: string) => {
  console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`)
}

function select(
  _selectKeys: Array<string>,
  info: {
    node: EventDataNode
  }
) {
  let data = info.node.dataRef
  if ("children" in data) return
  emit("fuck", data.key.toString())
}
</script>

<template>
  <a-tree
    :tree-data="data"
    :draggable="true"
    :show-icon="true"
    v-model:expandedKeys="expandedKeys"
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
            <a-menu-item key="1">1st menu item</a-menu-item>
            <a-menu-item key="2">2nd menu item</a-menu-item>
            <a-menu-item key="3">3rd menu item</a-menu-item>
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
