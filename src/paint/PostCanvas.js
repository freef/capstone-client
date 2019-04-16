import React, { Component } from 'react'
import axios from 'axios'
import apiConfig from '../apiConfig.js'
import Canvas from './Canvas.js'

class PostCanvas extends Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      draw: {
        title: null,
        owner: this.props.user ? this.props.user._id : null,
        img: null
      },
      user: this.props.user || null
    }
  }
  onHandleChange = event => this.setState({ draw: { ...this.state.draw, [event.target.name]: event.target.value } })

  onSave = (e) => {
    event.preventDefault()
    const canvas = document.getElementById('canvasInAPerfectWorld').toDataURL()
    console.log(canvas)
    this.setState({ draw: { ...this.state.draw, owner: this.props.user.id, img: canvas }, user: this.props.user }, () => {
      console.log(this.state)
      const config = {
        headers: {
          Authorization: `Token token=${this.state.user.token}`
        }
      }
      axios.post(`${apiConfig}/drawings`, { data: this.state.draw, contentType: false, processData: false }, config)
        .then((responseData) => {
          console.log(responseData)
          this.setState({ imgsrc: responseData.data.draw.img })
          return responseData
        })
        .catch(console.log)
    })
  }

  render () {
    return (
      <div className="pinkBorder">
        <form onSubmit={this.onSave}>
          <h2><label htmlFor='title'>Title your image<input name='title' type='text' onChange={this.onHandleChange} required /></label></h2>
          <Canvas />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default PostCanvas
