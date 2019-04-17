import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Drawing = ({ id, user, title, img, likes, username }) => {
  const p = this.props
  return (
    <Fragment>
      <h2><Link to={{ pathname: `/drawings/${id}`, state: { user: user, id: id } }} id={id} >{title}</Link></h2>
      <div className='drawingcontainer'>
        <img className='drawing' id={id} src={img} alt={title} />
      </div>
      <p><small>by:</small> {username[0].username}</p>
      <p>{likes} likes</p>

    </Fragment>)
}

export default Drawing
