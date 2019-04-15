import React, { Component } from 'react'
import './App.scss'
import Canvas from './paint/canvas.js'

class App extends Component {
  render () {
    return <React.Fragment>
      <Canvas />
    </React.Fragment>
  }
}

export default App
