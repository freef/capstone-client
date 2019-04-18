import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
import OneDrawing from './OneDrawing.js'
import Spinner from 'react-bootstrap/Spinner'

class Drawings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      drawings: false
    }
  }

  componentDidMount () {
    axios.get(apiUrl + '/drawings')
      .then((response) => {
        this.setState({ drawings: response.data.draw })
      })
      .catch((res) => {
        console.log(res)
      })
  }

  render () {
    const sorted = (d) => {
      return d.sort((a, b) => a.score - b.score)
    }
    return (
      <Fragment>
        {this.state.drawings ? sorted(this.state.drawings).map(drawing => (
          <OneDrawing
            key={drawing.id}
            id={drawing.id}
            title={drawing.title}
            img={drawing.img}
            owner={drawing.owner} // this is an id
            likes={drawing.likes}
            comments={drawing.comments}
            username={drawing.username}
            score={drawing.score}
            imagekey={drawing.imagekey}
            user={this.props.user}
          />
        )) : <Spinner animation='border' />}
      </Fragment>)
  }
}

export default Drawings
