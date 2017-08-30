import React,  { Component } from 'react';

class ImageDisplay extends Component {
  render() {
    const photo = this.props.photo;
    return (
      <div className="ImageDisplay">
        <p>Photo taken on {photo.earth_date}</p>
        <img src={photo.img_src} alt={photo.id} />
      </div>
    )
  }
}

export default ImageDisplay;
