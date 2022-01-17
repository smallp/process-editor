import { Node, Shape } from "@antv/x6"
const ports = {
  groups: {
    top: {
      position: "top",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    right: {
      position: "right",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    bottom: {
      position: "bottom",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    left: {
      position: "left",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
  },
  items: [
    {
      group: "top",
    },
    {
      group: "right",
    },
    {
      group: "bottom",
    },
    {
      group: "left",
    },
  ],
}

const rect1 = new Shape.Rect({
  width: 50,
  height: 40,
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#5F95FF",
      fill: "#EFF4FF",
    },
    text: { text: "rect1" },
  },
  ports: { ...ports },
})
const shaBegin = new Shape.Rect({
  width: 50,
  height: 40,
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#5F95FF",
      fill: "#EFF4FF",
    },
    text: { text: "开始" },
  },
  ports: {
    ...ports,
    items: [
      {
        group: "bottom",
      },
    ],
  },
})
const shaEnd = new Shape.Rect({
  width: 50,
  height: 40,
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#5F95FF",
      fill: "#EFF4FF",
    },
    text: { text: "结束" },
  },
  ports: {
    ...ports,
    items: [
      {
        group: "top",
      },
    ],
  },
})
const m: Map<string, Node[]> = new Map()
m.set("group1", [rect1, shaBegin, shaEnd])

export function showPorts(ports: NodeListOf<SVGElement>, show: boolean) {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? "visible" : "hidden"
  }
}
export const group = m
