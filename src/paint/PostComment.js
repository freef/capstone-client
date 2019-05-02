import React, { Component } from 'react'
import axios from 'axios'
import apiConfig from '../apiConfig.js'
import Canvas from './Canvas.js'
import { Redirect } from 'react-router-dom'

class PostCanvas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: {
        title: null,
        owner: this.props.location.state ? this.props.location.state.user._id : null,
        img: null,
        id: null,
        drawing: this.props.location.state ? this.props.location.state.drawing.id : null
      },
      created: false,
      user: this.props.location.state.user || null
    }
  }
  onHandleChange = event => this.setState({ comment: { ...this.state.comment, [event.target.name]: event.target.value } })

  onSave = (e) => {
    console.log(this.state.comment.drawing)
    event.preventDefault()
    const canvas = document.getElementById('canvasInAPerfectWorld').toDataURL()
    this.setState({ comment: { ...this.state.comment, owner: this.props.location.state.user.id, img: canvas }, user: this.props.location.state.user }, () => {
      const config = {
        headers: {
          Authorization: `Token token=${this.state.user.token}`
        }
      }
      axios.post(`${apiConfig}/comments`, { data: this.state.comment, contentType: false, processData: false }, config)
        .then((responseData) => this.setState({ comment: { id: responseData.data.comment.id } }))
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
        {this.state.created ? <Redirect to={{ pathname: `/drawings/${this.props.location.state.drawing.id}`, state: { user: this.state.user } }} id={this.state.comment.drawing} /> : null}
      </div>
    )
  }
}

export default PostCanvas
