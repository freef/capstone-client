import React, { Component } from 'react'

class Drawing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user ? this.props.user._id : null,
      newComment: false,
      editable: null
    }
  }

  // key={drawing.id}
  // id={drawing.id}
  // title={drawing.id}
  // img={drawing.img}
  // owner={drawing.owner}
  // likes={drawing.likes}
  // comments={drawing.comments}
  // username={drawing.username.username}
  // score={drawing.score}

  componentDidMount () {
    this.props.owner === this.state.user ? this.setState({ editable: true }) : this.setState({ editable: false })
    console.log(this.props)
  }

  render () {
    const p = this.props
    return (
      <div className='pinkBorder'>
        <h2>{p.title}</h2>
        <div className='drawingcontainer'>
          <img className='drawing' id={p.id} src={p.img} alt={p.title} />
        </div>
        <p><small>by:</small> {p.username[0].username}</p>
        <p>{p.likes} likes</p>
        {this.state.editable ? <p>editable</p> : null}
        {this.state.user ? <button>Comment</button> : null }
      </div>)
  }
}

export default Drawing
