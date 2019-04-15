import React, { Component, Fragment } from 'react'

class Canvas extends Component {
  constructor () {
    super()
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
      brushSize: 3
    }
  }

onColorChange = (event) => this.setState({ color: { ...this.state.color, [event.target.id]: event.target.value } })

onSizeChange = (event) => this.setState({ brushSize: event.target.value })

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

redraw =() => {
  console.log(this.state.color)
  const clickX = this.state.clickX
  const clickY = this.state.clickY
  const clickDrag = this.state.clickDrag
  const context = this.state.context
  context.clearRect(0, 0, context.canvas.width, context.canvas.height) // Clears the canvas
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
  this.paint = true
  this.addClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  this.redraw()
}

onDraw = (e) => {
  if (this.paint) {
    this.addClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY, true)
    this.redraw()
  }
}

onStopPaint = (e) => {
  this.paint = false
}

onMouseExit = (e) => {
  this.paint = false
}

onSave = (e) => {
  const canvas = document.getElementById('canvasInAPerfectWorld').toDataURL()
  console.log(canvas)
  window.open(canvas)
}

componentDidMount () {
  this.setState({ context: document.getElementById('canvasInAPerfectWorld').getContext('2d') })
}
render () {
  return <Fragment>
    <p>boop</p>
    <canvas
      className='blackborder'
      id="canvasInAPerfectWorld"
      width="700"
      height="700"
      onMouseDown={this.onStartPaint}
      onMouseMove={this.onDraw.bind(this)}
      onMouseUp={this.onStopPaint}
      onMouseLeave={this.onMouseExit}>
    </canvas>
    <div className='tools'>
      <div className='coloroptions'>
        <div className="colorpicker" style={{ 'backgroundColor': `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b})` }}> </div>
        <div className='colorsliders'>
          <label htmlFor='red'>Red <input name='red' onChange={this.onColorChange} type="range" min="0" max="255" defaultValue="0" className="slider" id="r" /></label>
          <label htmlFor='green'>Green <input name='green' onChange={this.onColorChange} type="range" min="0" max="255" defaultValue="0" className="slider" id="g" /></label>
          <label htmlFor='blue'>Blue< input name='blue' onChange={this.onColorChange} type="range" min="0" max="255" defaultValue="0" className="slider" id="b" /></label>
        </div>
      </div>
      <label htmlFor='brush-size'>Brush Size< input name='brush-size' onChange={this.onSizeChange} type="range" min="1" max="100" defaultValue="2" className="slider" id="brushsize" /></label>
      <button onClick={this.onSave}>Save</button>
    </div>
  </Fragment>
}
}

export default Canvas
