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

const rectProcess = new Shape.Rect({
  width: 50,
  height: 40,
  label: "过程",
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#5F95FF",
      fill: "#EFF4FF",
    },
  },
  ports: { ...ports },
})
const shaBegin = new Shape.Rect({
  width: 50,
  height: 40,
  label: "开始",
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#5F95FF",
      fill: "#EFF4FF",
      rx: 15,
      ry: 15,
    },
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
  label: "结束",
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#5F95FF",
      fill: "#EFF4FF",
      rx: 15,
      ry: 15,
    },
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

const condition = new Shape.Polygon({
  width: 60,
  height: 60,
  label: "条件",
  points: "0,30 30,0 60,30 30,60",
  attrs: {
    body: {
      stroke: "#5F95FF",
      fill: "#EFF4FF",
    },
  },
  ports: {
    ...ports,
  },
})
const note = new Shape.Rect({
  width: 50,
  height: 50,
  label: "备注",
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: "#ffa940",
      fill: "#ffd591",
      rx: 10,
      ry: 10,
    },
  },
})
const m: Map<string, Node[]> = new Map()
m.set("group1", [shaBegin, shaEnd, rectProcess, condition, note])

export const group = m
