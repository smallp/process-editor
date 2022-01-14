import { Node, Shape } from "@antv/x6"
const rect1 = new Shape.Rect({
  width: 50,
  height: 40,
  attrs: {
    text: { text: "rect1" },
  },
})
const rect2 = new Shape.Rect({
  width: 50,
  height: 40,
  attrs: {
    text: { text: "rect2" },
  },
})
const m: Map<string, Node[]> = new Map()
m.set("group1", [rect1, rect2])
export default m
