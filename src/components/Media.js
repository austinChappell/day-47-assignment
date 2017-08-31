import React, { Component } from 'react';

import MediaResults from './MediaResults';

class Media extends Component {

  constructor() {
    super();

    this.state = {
      search: '',
      searchTerm: '',
      showResultsTitle: false,
      mediaType: 'image',
      mediaSearchType: '',
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
      console.log('RESULTS', results);
      this.setState({
        data: results.collection,
        search: '',
        searchTerm: this.state.search,
        showResultsTitle: true,
        mediaSearchType: this.state.mediaType
      });
    })
  }

  render() {
    return (
      <div className="Media body">
        <div>
          <label>Search Term: </label>
          <input onChange={(e) => this.handleInputChange(e, 'search')} value={this.state.search} />
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
          mediaSearchType={this.state.mediaSearchType}
          searchTerm={this.state.searchTerm}
          showResultsTitle={this.state.showResultsTitle}
          showAudioPlayer={this.state.showAudioPlayer}
          showVideoPlayer={this.state.showVideoPlayer} />
      </div>
    )
  }
}

export default Media;
