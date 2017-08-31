import React, { Component } from 'react';

import MediaResults from './MediaResults';

class Media extends Component {

  constructor() {
    super();

    this.state = {
      search: '',
      mediaType: 'image',
      data: {items: []},
      showAudioPlayer: false,
      showVideoPlayer: false
    }
  }

  handleInputChange = (e, param) => {
    let obj = {};
    obj[param] = e.target.value;
    this.setState(obj);
  }

  search = () => {
    if (this.state.mediaType === 'audio') {
      this.setState({
        showAudioPlayer: true,
        showVideoPlayer: false
      })
    } else if (this.state.mediaType === 'video') {
      this.setState({
        showVideoPlayer: true,
        showAudioPlayer: false
      })
    } else {
      this.setState({
        showAudioPlayer: false,
        showVideoPlayer: false
      })
    }
    let url = `https://images-api.nasa.gov/search?q=${this.state.search}&media_type=${this.state.mediaType}`;
    fetch(url).then((response) => {
      return response.json();
    }).then((results) => {
      console.log(results);
      this.setState({data: results.collection});
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="Media body">
        <div>
          <label>Search Term: </label>
          <input onChange={(e) => this.handleInputChange(e, 'search')} />
          <label>Media Type: </label>
          <select onChange={(e) => this.handleInputChange(e, 'mediaType')}>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
          <button onClick={this.search}>Search</button>
        </div>
        <MediaResults
          dataArray={this.state.data.items}
          mediaType={this.state.mediaType}
          showAudioPlayer={this.state.showAudioPlayer}
          showVideoPlayer={this.state.showVideoPlayer} />
      </div>
    )
  }
}

export default Media;
