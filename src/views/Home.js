import React from 'react'
import Canvas from '../paint/Canvas.js'

const Home = (props) => (
  <div className='pinkBorder'>
    <Canvas user={props.user} />
  </div>
)

export default Home
