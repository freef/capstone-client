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
      brushSize: 30
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
  // console.log(e)
  // console.log(e.type)
  // console.log(e.target)
  this.paint = true
  // console.log(this.paint)
  this.addClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  this.redraw()
}

onDraw = (e) => {
  // console.log(e.nativeEvent)
  if (this.paint) {
    this.addClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY, true)
    this.redraw()
  }
}

onStopPaint = (e) => {
  // console.log(e.type)
  this.paint = false
}

onMouseExit = (e) => {
  this.paint = false
}

componentDidMount () {
  this.setState({ context: document.getElementById('canvasInAPerfectWorld').getContext('2d') })
}
render () {
  const colorpickerstyle = {
    backgroundColor: `rgba(${this.state.color.r},${this.state.color.g},${this.state.color.b})`,
    width: `${this.state.brushSize}px`,
    height: `${this.state.brushSize}px`,
    borderRadius: '100%'
  }
  return <Fragment>
    <canvas
      className='blackborder'
      id="canvasInAPerfectWorld"
      width="700"
      height="650"
      onMouseDown={this.onStartPaint}
      onMouseMove={this.onDraw.bind(this)}
      onMouseUp={this.onStopPaint}
      onMouseLeave={this.onMouseExit}
      onTouchMove={this.onDraw.bind(this)}
      onTouchStart={this.onStartPaint}
      onTouchEnd={this.onStopPaint}
      onTouchCancel={this.onStopPaint}>
    </canvas>
    <div className='tools'>
      <div className='coloroptions'>
        <div className="colorpicker" style={ colorpickerstyle }> </div>
        <div className='colorsliders'>
          <label htmlFor='red'><span className='normalcolor'>Red</span> <input name='red' onChange={this.onColorChange} type="range" min="0" max="255" defaultValue="0" className="slider" id="r" /></label>
          <label htmlFor='green'><span className='normalcolor'>Green</span> <input name='green' onChange={this.onColorChange} type="range" min="0" max="255" defaultValue="0" className="slider" id="g" /></label>
          <label htmlFor='blue'><span className='normalcolor'>Blue</span>< input name='blue' onChange={this.onColorChange} type="range" min="0" max="255" defaultValue="0" className="slider" id="b" /></label>
        </div>
      </div>
      <label htmlFor='brush-size'>Brush Size< input name='brush-size' onChange={this.onSizeChange} type="range" min="1" max="100" defaultValue="30" className="slider" id="brushsize" /></label>
    </div>
  </Fragment>
}
}

export default Canvas
