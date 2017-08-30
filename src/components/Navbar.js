import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Link to="/">Home</Link>
        <Link to="/mars_rover">Mars Rover</Link>
      </div>
    )
  }
}

export default Navbar;
