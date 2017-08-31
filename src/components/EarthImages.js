import React, { Component } from 'react';

import APIKey from './APIKey';

class EarthImages extends Component {

  constructor() {
    super();

    this.state = {
      lat: '',
      lon: '',
      data: {}
    }
  }

  handleInputChange = (e, string) => {
    console.log(e.target.value, string);
    let obj = {};
    obj[string] = e.target.value;
    this.setState(obj);
  }

  getEarthImage = () => {
    const lon = this.state.lon;
    const lat = this.state.lat;
    const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=2014-02-01&cloud_score=True&api_key=${APIKey}`;
    console.log('URL', url);
    fetch(url).then((response) => {
      return response.json();
    }).then((results) => {
      console.log(results);
      this.setState({
        data: results
      })
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="EarthImages body">
        <div>          
          <label>Latitude (-90 to 90):</label>
          <input min="-90" max="90" type="number" onChange={(e) => this.handleInputChange(e, 'lat')} />
          <label>Longitude (-180 to 180):</label>
          <input min="-180" max="180" type="number" onChange={(e) => this.handleInputChange(e, 'lon')} />
          <button onClick={this.getEarthImage}>Get Image</button>
        </div>
        <img className="result-image" src={this.state.data.url} alt={this.state.data.id} />
      </div>
    )
  }
}

export default EarthImages;
