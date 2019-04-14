import React, { Component } from 'react'
import './App.scss'

class App extends Component {
  constructor () {
    super()
    this.state = {
      paint: true,
      context: null,
      mouseX: 0.0,
      moueY: 0.0,
      clickX: [],
      clickY: [],
      clickDrag: []
    }
  }

  addClick = (x, y, dragging = false) => {
    const clickX = this.state.clickX
    const clickY = this.state.clickY
    const clickDrag = this.state.clickDrag
    clickX.push(x)
    clickY.push(y)
    clickDrag.push(dragging)
  }

  redraw =() => {
    const clickX = this.state.clickX
    const clickY = this.state.clickY
    const clickDrag = this.state.clickDrag
    const context = this.state.context
    context.clearRect(0, 0, context.canvas.width, context.canvas.height) // Clears the canvas
    context.strokeStyle = '#df4b26'
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
      // console.log(e.screenX - e.nativeEvent.offsetX)
      console.log(e.screenX)
      console.log(e.nativeEvent.offsetX)
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

 componentDidMount () {
   this.setState({ context: document.getElementById('canvasInAPerfectWorld').getContext('2d') })
 }
 render () {
   return <React.Fragment>
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
   </React.Fragment>
 }
}

export default App
