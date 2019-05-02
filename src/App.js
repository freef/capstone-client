import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Home from './views/Home.js'
import PostCanvas from './paint/PostCanvas.js'
import EditDrawing from './paint/EditDrawing.js'
import OneDrawing from './paint/OneDrawing.js'
import PostComment from './paint/PostComment.js'
// import Post from './paint/Post.js'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  onhide = function (event) {
    const alert = document.getElementsByClassName('pinkmessage')
    Array.from(alert).forEach((item) => item.classList.add('dnone'))
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert onClick={this.onhide} className='pinkmessage' key={index} dismissible variant={alert.type}>
            <Alert.Heading className='pinkmessage'>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/new' render={() => (
            <PostCanvas user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/comment' component={PostComment} />
          <AuthenticatedRoute user={user} path='/drawings/:id/edit' component={EditDrawing} />
          <Route exact path='/drawings/:id' component={OneDrawing} />
          <Route exact path='/' render={() => (<Home user={this.state.user} />)} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
