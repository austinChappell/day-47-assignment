import React, { Component } from 'react';

class AudioResult extends Component {

  constructor() {
    super();

    this.state = {
      btnText: 'Play Audio'
    }
  }

  render() {
    return (
      <div className="AudioResult">
        <h2>{this.props.data.data[0].title}</h2>
        <p>{this.props.data.data[0].description.slice(0, 200)}...</p>
        <button onClick={() => this.props.playAudio(this.props.data.href)}>{this.state.btnText}</button>
      </div>
    )
  }
}

class ImageResult extends Component {
  render() {
    return (
      <div className="ImageResult">
        <h2>{this.props.data.data[0].title}</h2>
        <img style={{width: '300px', maxHeight: '300px'}} src={this.props.data.links[0].href} alt="picture" />
        <hr />
        <p>{this.props.data.data[0].description}</p>
      </div>
    )
  }
}

class VideoResult extends Component {
  render() {
    return (
      <div className="VideoResult">
        <h2>{this.props.data.data[0].title}</h2>
        <p>{this.props.data.data[0].description}</p>
        <button onClick={() => this.props.playVideo(this.props.data.href)}>Play Video</button>
      </div>
    )
  }
}

export { AudioResult, ImageResult, VideoResult };
