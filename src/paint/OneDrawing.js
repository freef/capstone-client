import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
// import Drawing from './Drawing.js'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, Link } from 'react-router-dom'
// import OneComment from './OneComment.js'

class OneDrawing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      editable: null,
      drawing: false,
      id: this.props.id,
      edit: false,
      likes: [],
      liked: false,
      comment: false,
      showComments: false,
      isComment: false
    }
  }

handleEdit = () => this.setState({ edit: true })

handleLike = () => {
  const config = {
    headers: {
      Authorization: `Token token=${this.state.user.token}`
    }
  }
  axios.patch(`${apiUrl}${(this.props.isComment ? '/likescomment/' : '/likes/')}${this.state.id}`, { draw: this.state.drawing, user: this.state.user }, config)
    .then((responseData) => {
      const likes = [...this.state.drawing.likes]
      const l = this.state.drawing.likes
      if (this.state.drawing && l.some((item) => item.toString() === this.state.user._id)) {
        const i = l.indexOf(this.state.user._id.toString())
        likes.splice(i, 1)
        this.setState({ drawing: { ...this.state.drawing, likes: likes } })
      } else {
        likes.push(this.state.user._id)
        this.setState({ drawing: { ...this.state.drawing, likes: likes } })
      }
    })
    .then(() => this.setState({ created: true }))
    .catch(console.log)
}

toggleComments =() => this.setState({ showComments: !this.state.showComments })

handleComment = () => this.setState({ comment: true })

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
        ? <Fragment>
          <h2><Link className="drawlink" to={{ pathname: `/drawings/${drawing.id}`, state: { user: this.state.user, id: drawing.id } }} id={drawing.id} >{drawing.title}</Link></h2>
          <div className='drawingcontainer'>
            <img className='drawing' id={ drawing.id + drawing.owner } src={drawing.img} alt={drawing.title} />
          </div>
        </Fragment> : <Spinner animation='border' />}
      <div className='drawingattributes'>
        <p>{this.state.drawing.likes ? this.state.drawing.likes.length : 0} {this.state.drawing ? (this.state.drawing.likes.length === 1 ? 'like' : 'likes') : 'likes'}</p>
        <p><small>by:</small> {this.state.drawing ? this.state.drawing.username[0].username : 'Anonymous'}</p>
      </div>
      <div className='betn-wrapper'>
        {this.state.user ? <button className='betn'onClick={this.handleLike}>{this.state.drawing.likes ? this.state.drawing.likes.some((item) => item.toString() === this.state.user._id) ? 'Unlike' : 'Like' : 'like' }</button> : null}

        {this.state.user ? (this.state.user._id === this.state.drawing.owner ? <button className='betn' onClick={this.handleEdit} >Edit</button> : null) : null }
        {this.state.edit ? <Redirect to={{ pathname: '/drawings/' + this.state.drawing.id + '/edit', state: { user: this.state.user, drawing: this.state.drawing } }} id={this.state.drawing.id} /> : null}
        {this.state.drawing ? (this.state.drawing.comments.length > 0 ? <button className="betn" onClick={this.toggleComments}> {this.state.showComments ? 'Hide Comments' : 'Show Comments'}</button> : null) : null}
        {this.state.user ? this.props.isComment ? null : <button className ='betn' onClick={this.handleComment} >Comment</button> : null}
      </div>
      {this.state.comment ? <Redirect to={{ pathname: '/new/', state: { user: this.state.user, drawing: this.state.id, isComment: true } }} id={this.state.drawing.id} /> : null}
      {this.state.showComments ? this.state.drawing.comments.map(drawing => (
        <OneDrawing
          key={drawing.id}
          id={drawing.id}
          title={drawing.title}
          img={drawing.img}
          owner={drawing.owner} // this is an id
          likes={drawing.likes}
          comments={false}
          username={drawing.username}
          score={drawing.score}
          imagekey={drawing.imagekey}
          user={this.props.user}
          isComment={true}
          drawing={this.state.id}
        />
      )) : null}
    </div>)
}
}

export default OneDrawing

// {this.state.user ? <button className='betn' >Comment</button> : null}
