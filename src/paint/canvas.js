import React, { Component, Fragment } from 'react'

class Canvas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      paint: true,
      context: null,
      mouseX: 0.0,
      moueY: 0.0,
      clickX: [],
      clickY: [],
      clickDrag: [],
      clickColor: [],
      clickSize: [],
      color: {
        r: 0,
        b: 0,
        g: 0
      },
      brushSize: 30,
      eyedropper: false,
      background: 'rgb(0,0,0,0)'
    }
  }

onEyedropper = (event) => {
  event.preventDefault()
  this.setState({ eyedropper: !this.state.eyedropper })
}

onSetBg = (event) => {
  event.preventDefault()
  const c = this.state.color
  const color = `rgb(${c.r}, ${c.g}, ${c.b})`
  this.setState({ background: color }, () => {
    this.onBg()
  })
}

onBg = () => {
  const canvas = document.getElementById('canvasInAPerfectWorld')
  const ctx = this.state.context
  ctx.fillStyle = this.state.background
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  if (this.props.drawing) {
    this.recreate(this.props.drawing.img)
  }
  setTimeout(this.redraw, 50)
}

onColorChange = (event) => this.setState({ color: { ...this.state.color, [event.target.id]: event.target.value } })

onSizeChange = (event) => this.setState({ brushSize: event.target.value })

getPixelColor = (event) => {
  const context = this.state.context
  const currentTargetRect = event.target.getBoundingClientRect()
  const eventOffsetX = event.clientX - currentTargetRect.left
  const eventOffsetY = event.clientY - currentTargetRect.top
  const pxData = context.getImageData(eventOffsetX, eventOffsetY, 1, 1)
  this.setState({ color: { r: pxData.data[0], g: pxData.data[1], b: pxData.data[2] } }, () => {
    const red = document.getElementById('r')
    const green = document.getElementById('g')
    const blue = document.getElementById('b')
    red.value = this.state.color.r
    green.value = this.state.color.g
    blue.value = this.state.color.b
  })
}

addClick = (x, y, dragging = false) => {
  const curColor = `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b})`
  const curSize = this.state.brushSize
  const clickX = this.state.clickX
  const clickY = this.state.clickY
  const clickDrag = this.state.clickDrag
  clickX.push(x)
  clickY.push(y)
  clickDrag.push(dragging)
  this.state.clickColor.push(curColor)
  this.state.clickSize.push(curSize)
}

onUndo = () => {
  event.preventDefault()
  const context = this.state.context
  const clickX = this.state.clickX
  const clickY = this.state.clickY
  const clickDrag = this.state.clickDrag
  clickX.pop()
  clickY.pop()
  clickDrag.pop()
  this.state.clickColor.pop()
  this.state.clickSize.pop()
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)
  this.onBg()
}

recreate = (url) => {
  const canvas = document.getElementById('canvasInAPerfectWorld').getContext('2d')
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = url
  img.onload = () => canvas.drawImage(img, 0, 0)
}

redraw =() => {
  const clickX = this.state.clickX
  const clickY = this.state.clickY
  const clickDrag = this.state.clickDrag
  const context = this.state.context
  // if (!this.props.drawing) { context.clearRect(0, 0, context.canvas.width, context.canvas.height) }
  const canvas = document.getElementById('canvasInAPerfectWorld')
  const displayWidth = canvas.clientWidth
  const displayHeight = canvas.clientHeight
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth
    canvas.height = displayHeight
    if (this.props.drawing) { this.recreate(this.props.drawing.img) }
  }

  context.lineJoin = 'round'
  context.lineWidth = 5

  for (let i = 0; i < clickX.length; i++) {
    context.beginPath()
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1])
    } else {
      context.moveTo(clickX[i] - 1, clickY[i])
    }
    context.lineTo(clickX[i], clickY[i])
    context.closePath()
    context.strokeStyle = this.state.clickColor[i]
    context.lineWidth = this.state.clickSize[i]
    context.stroke()
  }
}

onStartPaint = (e) => {
  if (this.state.eyedropper) {
    this.getPixelColor(e)
    return
  }
  this.paint = true
  const currentTargetRect = event.target.getBoundingClientRect()
  const eventOffsetX = event.clientX - currentTargetRect.left
  const eventOffsetY = event.clientY - currentTargetRect.top
  this.addClick(eventOffsetX, eventOffsetY)
  this.redraw()
}

onDraw = (e) => {
  const currentTargetRect = event.target.getBoundingClientRect()
  const eventOffsetX = event.clientX - currentTargetRect.left
  const eventOffsetY = event.clientY - currentTargetRect.top
  if (this.paint) {
    this.addClick(eventOffsetX, eventOffsetY, true)
    // this.addClick(e.nativeEvent.x - this.state.context.canvas.offsetLeft, e.nativeEvent.y - this.state.context.canvas.offsetTop, true)
    this.redraw()
  }
}

onStopPaint = (e) => {
  this.paint = false
}

onMouseExit = (e) => {
  this.paint = false
}

componentDidMount () {
  this.setState({ context: document.getElementById('canvasInAPerfectWorld').getContext('2d') }, () => this.props.drawing ? this.recreate(this.props.drawing.img) : null)
}
render () {
  const colorpickerstyle = {
    backgroundColor: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b})`,
    width: `${this.state.brushSize}px`,
    height: `${this.state.brushSize}px`,
    borderRadius: '100%'
  }
  return <Fragment>
    <div className='canvascontainer'>
      <canvas
        className='blackborder'
        id="canvasInAPerfectWorld"
        onMouseDown={this.onStartPaint}
        onMouseMove={this.onDraw.bind(this)}
        onMouseUp={this.onStopPaint}
        onMouseLeave={this.onMouseExit}
        onTouchMove={this.onDraw.bind(this)}
        onTouchStart={this.onStartPaint}
        onTouchEnd={this.onStopPaint}
        onTouchCancel={this.onStopPaint}>
      </canvas>
    </div>
    <div className='tools'>
      <div className='coloroptions'>
        <div className="colorpicker" style={ colorpickerstyle }> </div>
        <div className='colorsliders'>
          <label htmlFor='red'><span className='normalcolor'>Red</span> <input name='red' onChange={this.onColorChange} type="range" min="0" max="255" defaultValue="0" className="slider" id="r" /></label>
          <label htmlFor='green'><span className='normalcolor'>Green</span> <input name='green' onChange={this.onColorChange} type="range" min="0" max="255" defaultValue="0" className="slider" id="g" /></label>
          <label htmlFor='blue'><span className='normalcolor'>Blue</span>< input name='blue' onChange={this.onColorChange} type="range" min="0" max="255" defaultValue="0" className="slider" id="b" /></label>
        </div>
      </div>
      <div className='additionaltools'>
        <label htmlFor='brush-size'>Brush Size< input name='brush-size' onChange={this.onSizeChange} type="range" min="1" max="100" defaultValue="30" className="slider" id="brushsize" /></label>
        <button className="betn toolbetn" onClick={this.onUndo}>Undo</button>
        <button className="betn toolbetn" onClick={this.onSetBg}>Set Background Color</button>
        <button className='betn toolbetn' onClick={this.onEyedropper}> {this.state.eyedropper ? 'Brush' : 'Eyedropper'}</button>
      </div>
    </div>
  </Fragment>
}
}

export default Canvas
