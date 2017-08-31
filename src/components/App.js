import React, { Component } from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import EarthImages from './EarthImages';
import Home from './Home';
import MarsRover from './MarsRover';
import Media from './Media';
import Navbar from './Navbar';
import RoverPhotos from './RoverPhotos';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/mars_rover/photos/rover/:rover/sol/:sol/camera/:camera" component={RoverPhotos} />
              <Route path="/mars_rover/photos/rover/:rover/sol/:sol" component={RoverPhotos} />
              <Route path="/mars_rover" component={MarsRover} />
              <Route path="/earth_images" component={EarthImages} />
              <Route path="/media" component={Media} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

// https://api.nasa.gov/planetary/apod?api_key=OYT5Pkf9MbKyDFcrLnZbJ7X2CTQZv7qllMFwhKVS

export default App;
