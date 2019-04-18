import React, { Component } from 'react'
import axios from 'axios'
import apiConfig from '../apiConfig.js'
import Canvas from './Canvas.js'
import { Redirect } from 'react-router-dom'

class PostCanvas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      draw: {
        title: null,
        owner: this.props.user ? this.props.user._id : null,
        img: null,
        id: null
      },
      created: false,
      user: this.props.user || null
    }
  }
  onHandleChange = event => this.setState({ draw: { ...this.state.draw, [event.target.name]: event.target.value } })

  onSave = (e) => {
    event.preventDefault()
    const canvas = document.getElementById('canvasInAPerfectWorld').toDataURL()
    this.setState({ draw: { ...this.state.draw, owner: this.props.user.id, img: canvas }, user: this.props.user }, () => {
      const config = {
        headers: {
          Authorization: `Token token=${this.state.user.token}`
        }
      }
      axios.post(`${apiConfig}/drawings`, { data: this.state.draw, contentType: false, processData: false }, config)
        .then((responseData) => this.setState({ draw: { id: responseData.data.draw.id } }))
        .then(() => this.setState({ created: true }))
        .catch(console.log)
    })
  }

  render () {
    return (
      <div className="pinkBorder">
        <form onSubmit={this.onSave}>
          <h2><label htmlFor='title'>Title your image<input name='title' type='text' onChange={this.onHandleChange} required /></label></h2>
          <Canvas />
          <button className='betn' type='submit'>Submit</button>
        </form>
        {this.state.created ? <Redirect to={{ pathname: '/drawings/' + this.state.draw.id, state: { user: this.state.user } }} id={this.state.draw.id} /> : null}
      </div>
    )
  }
}

export default PostCanvas
