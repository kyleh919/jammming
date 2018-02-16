import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  
  // returns a - or + based on the isRemoval prop
  renderAction(isRemoval) {
    if(isRemoval) {
      return '-';
    } else {
      return '+'
    }
  }
  
  // ties the addTrack method to the + sign
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  // ties the removeTrack method to the - sign
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>
            {/* <!-- track name will go here --> */}
            {this.props.track.name}
          </h3>
          <p>
            {/* <!-- track artist will go here--> | <!-- track album will go here --> */}
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        <a className="Track-action">
          {/* the add or remove action will occur and display based on the isRemoval prop
              which is set in either the Playlist or SearchResult component */}
          <p onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}>
            {this.renderAction(this.props.isRemoval)}
          </p>
        </a>
      </div>
    );
  }
}

export default Track;