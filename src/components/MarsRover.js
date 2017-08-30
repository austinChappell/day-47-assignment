import React, { Component } from 'react';

import api_key from './APIKey';

import RoverData from './RoverData';

class MarsRover extends Component {

  constructor() {
    super();

    this.state = {
      rover: 'Curiosity',
      photoManifest: {
        photos: []
      }
    };
  }

  handleRoverChange = (e) => {
    this.fetchManifest(e.target.value);
  }

  componentDidMount() {
    this.fetchManifest(this.state.rover);
  }

  fetchManifest = (rover) => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${api_key}`).then((response) => {
      return response.json();
    }).then((results) => {
      this.setState({
        rover,
        photoManifest: results.photo_manifest
      })
    })
  }

  render() {
    return (
      <div className="MarsRover">
        <label>Select Mars Rover</label>
        <select onChange={this.handleRoverChange}>
          <option value="Curiosity">Curiosity</option>
          <option value="Opportunity">Opportunity</option>
          <option value="Spirit">Spirt</option>
        </select>
          <RoverData photoManifest={this.state.photoManifest} rover={this.state.rover} />
      </div>
    )
  }
}

export default MarsRover;
