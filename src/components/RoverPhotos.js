import React, { Component } from 'react';

import api_key from './APIKey';

import ImageDisplay from './ImageDisplay';

class RoverPhotos extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const rover = this.props.match.params.rover;
    const sol = this.props.match.params.sol;
    let url;
    this.props.match.params.camera ? url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${this.props.match.params.camera}&api_key=${api_key}` : url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${api_key}`;
    fetch(url).then((response) => {
      return response.json();
    }).then((results) => {
      this.setState({
        data: results.photos
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Rover Photos {this.props.match.params.sol}</h1>
        <div className="images-render">          
          {this.state.data.map((photo, index) => {
            return <ImageDisplay key={index} photo={photo} />
          })}
        </div>
      </div>
    )
  }
}

export default RoverPhotos;
