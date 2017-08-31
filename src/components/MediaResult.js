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
      <div className="AudioResults">
        <button onClick={() => this.props.playAudio(this.props.data.href)}>{this.state.btnText}</button>
      </div>
    )
  }
}

class ImageResult extends Component {
  render() {
    return (
      <div className="ImageResult">
        <img style={{width: '300px'}} src={this.props.data.links[0].href} alt="picture" />
      </div>
    )
  }
}

class VideoResult extends Component {
  render() {
    return (
      <div className="VideoResult">
        <button onClick={() => this.props.playVideo(this.props.data.href)}>Play Video</button>
      </div>
    )
  }
}

export { AudioResult, ImageResult, VideoResult };
