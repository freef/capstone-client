import React, { Fragment } from 'react'
// import Canvas from '../paint/Canvas.js'
import Drawings from '../paint/Drawings.js'

const Home = (props) => (
  <Fragment>
    <Drawings user={props.user} />
  </Fragment>
)

export default Home
