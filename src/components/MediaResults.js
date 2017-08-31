import React, { Component } from 'react';

import { AudioResult, ImageResult, VideoResult } from './MediaResult';

class MediaResults extends Component {

  constructor() {
    super();

    this.state = {
      audioSource: '',
      audioSourceId: '',
      audioIsPlaying: false,
      showAudioPlayer: false,
      playButtonText: 'Play Audio',
      pauseButtonText: 'Pause Audio',
      videoSource: '',
      showVideoPlayer: false
    }
  }

  playVideo = (src) => {
    console.log('play the video at', src);
    fetch(src).then((response) => {
      return response.json();
    }).then((results) => {
      console.log('VIDEO RESULTS ', results);
      this.setState({
        videoSource: results[0]
      })
    })
  }

  playAudio = (src) => {
    if (this.state.audioIsPlaying && this.state.audioSourceId == src) {
      this.pauseAudio();
    } else {
      fetch(src).then((response) => {
        return response.json();
      }).then((results) => {
        console.log('AUDIO RESULTS', results);
        this.setState({
          audioSource: results[0],
          audioSourceId: src,
          audioIsPlaying: true
        })
      })
    }
  }

  pauseAudio = () => {
    this.setState({
      audioSource: '',
      audioSourceId: '',
      audioIsPlaying: false
    })
  }

  render() {
    let results;

    if (this.props.mediaSearchType === 'image') {
      results = this.props.dataArray.map((data, index) => {
        return <ImageResult key={index} data={data} />
      });
    } else if (this.props.mediaSearchType === 'audio') {
      results = this.props.dataArray.map((data, index) => {
        return <AudioResult
            key={index}
            data={data}
            src={this.state.audioSource}
            playText={this.state.playButtonText}
            pauseText={this.state.pauseButtonText}
            playAudio={this.playAudio} />
      })
    } else {
      results = this.props.dataArray.map((data, index) => {
        return <VideoResult
            key={index}
            data={data}
            src={this.state.videoSource}
            playVideo={this.playVideo} />
      })
    }

    return (
      <div className="MediaResults">
        <h1 className={this.props.showResultsTitle ? 'results-title' : 'hidden'}>
          {this.props.mediaSearchType} results for "{this.props.searchTerm}"
        </h1>
        <button
          className={this.props.showAudioPlayer ? '' : 'hidden'}
          onClick={this.pauseAudio}>Pause Audio</button>
        <video
          src={this.state.videoSource}
          controls
          className={this.props.showVideoPlayer ? '' : 'hidden'}
          width="400"
          height="300"></video>
        <audio
          className={this.props.showAudioPlayer ? '' : 'hidden'}
          src={this.state.audioSource}
          controls
          autoPlay></audio>
        <div className="flex-results">
          {results}
        </div>
      </div>
    )
  }
}

export default MediaResults;
