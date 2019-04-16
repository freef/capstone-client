import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig.js'
import Drawing from './Drawing.js'
import Spinner from 'react-bootstrap/Spinner'

class Drawings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user ? this.props.user : null,
      newComment: false,
      editable: null,
      drawings: null
    }
  }

  componentDidMount () {
    axios.get(apiUrl + '/drawings')
      .then((response) => {
        console.log(response)
        this.setState({ drawings: response.data.draw })
      })
      .catch((res) => {
        console.log('=============================')
        console.log(res)
      })
  }

  render () {
    return (
      <Fragment>
        <h2>Drawings</h2>
        {this.state.drawings ? this.state.drawings.map(drawing => (
          <Drawing
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
          />
        )) : <Spinner animation='border' />}
      </Fragment>)
  }
}

export default Drawings
