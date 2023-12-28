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
  height: 100,
  ports: { ...ports },
  data:{
    img:'',
    name:'',
    url:'',
  },
  html(cell){
    console.log('xixi')
    const { img,name,url } = cell.getData()
    const div = document.createElement('div')
    div.style.border='1px solid blue'
    div.style.width='100%'
    div.style.height='100%'
    div.innerHTML = `<span>${name}</span><a href="${url}"><img style="margin:auto" src="${img}" /></a>`
    return div
  },
})