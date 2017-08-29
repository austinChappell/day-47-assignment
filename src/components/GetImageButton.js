import React, { Component } from 'react';

class GetImageButton extends Component {
  render() {
    const btnStyle = {
      backgroundColor: 'green',
      padding: '10px',
      fontSize: '18px',
      border: 'none',
      margin: '20px',
      borderRadius: '5px',
      cursor: 'pointer'
    }
    return (
      <div>
        <button style={btnStyle} onClick={this.props.fetchRoverImage}>Get Images</button>
      </div>
    )
  }
}

export default GetImageButton;
