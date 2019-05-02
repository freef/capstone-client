import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link className='navlink' to="/change-password">Change Password</Link>
    <Link className='navlink' to="/sign-out">Sign Out</Link>
    <Link className='navlink' to='/new'>Draw Something </Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link className='navlink' to="/sign-up">Sign Up</Link>
    <Link className='navlink' to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link className='navlink' to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header navv">
    <div className='logo'>
      <h1 className="title">Splattr</h1>
    </div>
    <nav>
      { user && <span>Welcome, {user.username}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
