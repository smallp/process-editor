import { Node, Shape } from "@antv/x6"
const ports = {
  groups: {
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
      group: "right",
    },
    {
      group: "left",
    },
  ],
}

Shape.HTML.register({
  shape: 'mine',
  width: 200,
  height: 120,
  ports: { ...ports },
  data: {
    img: '',
    name: '',
    url: '',
  },
  effect: ['data'],
  html(cell) {
    const { img, name, url } = cell.getData()
    const div = document.createElement('div')
    div.className = 'techTreeCell'
    div.innerHTML = `<div class="techTreeHeading">${name}</div><img class="techTreeIcon" src="${img}" />`
    return div
  },
})