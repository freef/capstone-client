import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
import Canvas from './Canvas.js'

class EditDrawing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      drawing: this.props.drawing,
      deleted: false,
      updated: false
    }
  }

  onHandleChange = event => this.setState({ drawing: { ...this.state.drawing, [event.target.name]: event.target.value } })

  handleSubmit = e => {
    event.preventDefault()
    const canvas = document.getElementById('canvasInAPerfectWorld').toDataURL()
    this.setState({ drawing: { ...this.state.drawing, img: canvas } }, () => {
      const config = {
        headers: {
          Authorization: `Token token=${this.state.user.token}`
        }
      }
      axios.patch(`${apiUrl}/movies/${this.state.drawing.id}`, { data: this.state.drawing, contentType: false, processData: false }, config)
        .then(() => this.setState({ edited: true }))
        .catch(() => this.setState({ movie: { ...this.state.movie, title: '', director: '', year: '' }, failed: true }))
    }
    )
  }

onDelete = () => {
  const id = this.props.id
  const token = this.state.user.token
  console.log('id is ' + id)
  console.log('token is ' + token)
  const config = {
    headers: {
      Authorization: `Token token=${token}`
    }
  }
  axios.delete(apiUrl + '/drawings/' + id, config)
    .then((response) => this.setState({ deleted: true }))
    .catch((res) => console.log(res))
}

render () {
  return (
    <div className='pinkBorder'>
      <form onSubmit={this.onSave}>
        <h2><label htmlFor='title'>Title your image<input defaultValue={this.state.drawing.title} name='title' type='text' onChange={this.onHandleChange} required /></label></h2>
        <Canvas />
        <button type='submit'>Submit</button>
      </form>
      {this.state.updated ? <Redirect to={{ pathname: '/drawings/' + this.state.draw.id, state: { user: this.state.user } }} id={this.state.draw.id} /> : null}
      <button onClick={this.onDelete}>Delete</button>
      {this.state.deleted ? <Redirect to={{ pathname: '/', state: { user: this.state.user } }} /> : null}
    </div>)
}
}

export default EditDrawing
