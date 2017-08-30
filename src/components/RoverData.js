import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class RoverData extends Component {
  render() {
    const photoURL = `/mars_rover/photos/rover/${this.props.rover}/sol/`;
    return (
      <div className="RoverData">
        <div className="table-header">
          <div className="sol">Sol</div>
          <div className="num-of-photos"># of photos</div>
          <div className="cameras">Cameras</div>
          <div className="view-button"></div>
        </div>
        {this.props.photoManifest.photos.map((data, index) => {
          return (
            <div key={index} className="table-row">
              <div className="sol">{data.sol}</div>
              <div className="num-of-photos">{data.total_photos}</div>
              <div className="cameras">
                {data.cameras.map((camera, index) => {
                  return <Link key={index} className="camera" to={photoURL + data.sol + '/camera/' + camera}>{camera}</Link>
                })}
              </div>
              <div className="view-button"><Link to={photoURL + data.sol}>View Photos</Link></div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default RoverData;
