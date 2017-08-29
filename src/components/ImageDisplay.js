import React,  { Component } from 'react';

class ImageDisplay extends Component {
  render() {
    const photo = this.props.photo;
    return (
      <div style={{flexBasis: '40%'}}>
        <p style={{marginBottom: 0}}>Photo taken on {photo.earth_date}</p>
        <img style={{maxWidth: '300px'}} src={photo.img_src} alt={photo.id} />
      </div>
    )
  }
}

export default ImageDisplay;
