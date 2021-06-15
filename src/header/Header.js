import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const Header = ({ user }) => {
  const [mobile] = useState(window.innerWidth > 1073)
  console.log(window.innerWidth)
  const authenticatedOptions = (
    <React.Fragment>
      <Link className='navlink' to="/change-password">Change Password</Link>
      <Link className='navlink' to="/sign-out">Sign Out</Link>
      <Link className='navlink' to={{ pathname: '/new', state: { user: user, isComment: false } }}>Draw Something </Link>
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

  const desktopNav = (
    <nav>
      { user && <span>{user.username}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>)
  const mobileNav = (
    <nav>
      <p>mobile</p>
    </nav>
  )
  const display = (<header className="main-header navv">
    <div className='logo'>
      <h1 className="title">Splattr</h1>
    </div>
    {mobile ? desktopNav : mobileNav}
  </header>)

  return display
}

export default Header
