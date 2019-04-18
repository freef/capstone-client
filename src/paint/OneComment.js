import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
import Drawing from './Drawing.js'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect } from 'react-router-dom'

class OneDrawing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      editable: null,
      drawing: false,
      id: this.props.id,
      edit: false
    }
  }

  handleEdit = () => this.setState({ edit: true })

  componentDidMount () {
    if (this.props.match) {
      this.setState({ user: this.props.location.state ? this.props.location.state.user : null })
      this.setState({ id: this.props.match ? this.props.match.params.id : this.props.id })
      axios.get(apiUrl + '/drawings/' + this.props.match.params.id)
        .then((response) => {
          this.setState({ drawing: response.data.draw }, () => (
            this.setState({ editable: this.state.user ? this.state.drawing.owner === this.state.user._id : null })
          ))
          return response
        })
        .catch(console.log)
    } else {
      this.setState({ drawing: this.props }, () => {
        this.setState({ editable: this.state.user ? this.state.user._id === this.state.drawing.owner : null })
      })
    }
  }

  render () {
    const drawing = this.state.drawing
    return (
      <div className='pinkBorder'>
        {this.state.drawing
          ? <Drawing
            key={drawing.id}
            id={drawing.id}
            title={drawing.title}
            img={drawing.img}
            owner={drawing.owner} // this is an id
            likes={drawing.likes}
            comments={drawing.comments}
            username={drawing.username}
            score={drawing.score}
            user={this.state.user}
            imagekey={drawing.imagekey}
          /> : <Spinner animation='border' />}
        {this.state.editable ? <button className='betn' onClick={this.handleEdit}>Edit</button> : <p>Not Editable</p>}
        {this.state.user ? <button className='betn'>Like</button> : null}
        {this.state.user ? <button className='betn'>Comment</button> : null}
        {this.state.edit ? <Redirect to={{ pathname: '/drawings/' + this.state.drawing.id + '/edit', state: { user: this.state.user, drawing: this.state.drawing } }} id={this.state.drawing.id} /> : null}
      </div>)
  }
}

export default OneDrawing