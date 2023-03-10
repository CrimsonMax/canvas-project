export default class Tool {
  constructor(canvas, socket, id) {
    this.canvas = canvas
    this.id = id
    this.socket = socket
    this.ctx = canvas.getContext('2d')
    this.destroyEvent()
  }

  set fillColor(color) {
    this.ctx.fillStyle = color
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width
  }

  destroyEvent() {
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.onmousemove = null
  }
}