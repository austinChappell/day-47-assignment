import React, { Component } from 'react';

import GetImageButton from './GetImageButton';
import ImageDisplay from './ImageDisplay';

const API_KEY = "OYT5Pkf9MbKyDFcrLnZbJ7X2CTQZv7qllMFwhKVS";

function findSol(userInput, solArray) {
  while (solArray.indexOf(userInput) === -1) {
    userInput++;
    if (userInput > solArray[solArray.length - 1]) {
      userInput = 1000;
    }
  }
  return userInput;
}

class GetImageForm extends Component {

  constructor() {
    super();

    this.state = {
      roverValue: 'Curiosity',
      cameraValue: 'fhaz',
      solValue: '1000',
      photos: [],
      maxSol: '',
      photoDays: []
    };
  }

  handleRover = (e) => {
    this.getMaxSol(e.target.value);
    this.setState({
      roverValue: e.target.value
    });
  }

  handleCamera = (e) => {
    this.setState({
      cameraValue: e.target.value
    });
  }

  handleSol = (e) => {
    this.setState({
      solValue: e.target.value
    });
  }

  fetchRoverImage = () => {
    let nearestSol = findSol(this.state.solValue, this.state.photoDays);
    console.log('NEAREST SOL IS ', nearestSol);
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${this.state.roverValue}/photos?sol=${nearestSol}&camera=${this.state.cameraValue}&api_key=${API_KEY}`).then((response) => {
      return response.json();
    }).then((results) => {
      console.log(results);
      this.setState({photos: results.photos})
    })
  }

  getMaxSol = (rover) => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${API_KEY}`).then((response) => {
      return response.json();
    }).then((results) => {
      console.log(results.photo_manifest.photos);
      let photoDays = [];
      photoDays = results.photo_manifest.photos.map((photo) => {
        return photo.sol;
      })
      console.log('photoDays', photoDays);
      this.setState({
        maxSol: results.photo_manifest.max_sol,
        photoDays
      });
    })
  }

  componentDidMount() {
    this.getMaxSol(this.state.roverValue);
  }

  render() {
    console.log('STATE', this.state);
    let rover = null;
    let roverCamera = null;
    let roverInfo = null;

    const inputMargin = {marginRight: "10px"}

    if (this.state.photos.length > 0) {
      let roverDetails = this.state.photos[0].rover;
      rover = this.state.roverValue;
      roverCamera = 'Camera: ' + this.state.photos[0].camera.full_name;
      roverInfo = `${rover} launched on ${roverDetails.launch_date} and landed on Mars on ${roverDetails.landing_date}. It has taken ${roverDetails.total_photos} photos since landing.`
    }

    return (
      <div>
        <form style={{backgroundColor: 'lightblue', padding: '20px'}}>
          <label htmlFor="rover">Rover</label>
          <select style={inputMargin} onChange={this.handleRover} id="rover" value={this.state.roverValue}>
            <option value="Curiosity">Curiosity</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Spirit">Spirt</option>
          </select>
          <label htmlFor="camera">Camera Type</label>
          <select style={inputMargin} onChange={this.handleCamera} id="camera" value={this.state.cameraValue}>
            <option value="fhaz">FHAZ (Front Hazard)</option>
            <option value="rhaz">RHAZ (Rear Hazard)</option>
            <option value="navcam">NAVCAM (Navigation Cam)</option>
          </select>
          <label htmlFor="sol">Martian Sol: 1000-{this.state.maxSol}</label>
          <input style={inputMargin} type="number" onChange={this.handleSol} max={this.state.maxSol} min="1000" value={this.state.solValue}/>
        </form>
        <GetImageButton fetchRoverImage={this.fetchRoverImage} />
        <div style={{textAlign: 'center'}}>
          <h2>{rover}</h2>
          <p>{roverInfo}</p>
          <h3>{roverCamera}</h3>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
          {this.state.photos.map((photo, index) => {
            return <ImageDisplay photo={photo} key={index} />
          })}
        </div>
      </div>
    )
  }
}

export default GetImageForm;
