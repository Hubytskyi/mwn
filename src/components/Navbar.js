import React from 'react'
import {Link} from "gatsby"

const Navbar = () => {
  return (
      <header id="header">
        <div className="container">
          <div className="row">
            <Link to="/">
              <h3>Movies Worth Nothing</h3>
            </Link>
          </div>
        </div>
      </header>
  )
}

export default Navbar