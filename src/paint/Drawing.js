import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Drawing = ({ id, user, title, img, likes, username, owner }) => {
  return (
    <Fragment>
      <h2><Link to={{ pathname: `/drawings/${id}`, state: { user: user, id: id } }} id={id} >{title}</Link></h2>
      <div className='drawingcontainer'>
        <img className='drawing' id={ id + owner } src={img} alt={title} />
      </div>
    </Fragment>)
}

export default Drawing
