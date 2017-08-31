import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <div className="container">
          <NavLink activeClassName="active" exact to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/earth_images">Earth Images</NavLink>
          <NavLink activeClassName="active" to="/mars_rover">Mars Rover</NavLink>
          <NavLink activeClassName="active" to="/media">Media</NavLink>
        </div>
      </div>
    )
  }
}

export default Navbar;
