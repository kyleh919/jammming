import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // handles an update made to the playlist title
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }
  
  render() {
    return (
      <div className="Playlist">
        {/* <input defaultValue={'New Playlist'}/> */}
        <input defaultValue={this.props.playlistName} onChange={this.handleNameChange}/>
        {/* <!-- Add a TrackList component --> */}
        <TrackList isRemoval={true} tracks={this.props.playlistTracks} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;