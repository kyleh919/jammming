import React, { Component } from 'react';
import './App.css';

import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);

    /* binds */
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    /* hardcoded values */
    this.state = {
      SearchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      // SearchResults: [{
      //   name: 'My Own Hymn',
      //   artist: 'Above & Beyond',
      //   album: 'Common Ground',
      //   id: '1',
      //   uri: 'spotify:track:AAAA1'
      // },
      // {
      //   name: 'Feel Tall',
      //   artist: 'OnCue',
      //   album: 'Can\'t Wait',
      //   id: '2',
      //   uri: 'spotify:track:AAAA2'
      // },
      // {
      //   name: 'Pray For Me',
      //   artist: 'G-Eazy',
      //   album: 'The Beautiful & Damned',
      //   id: '3',
      //   uri: 'spotify:track:AAAA3'
      // }],
      // playlistName: "My Playlist",
      // playlistTracks: [{
      //   name: 'Trip',
      //   artist: 'San Holo',
      //   album: 'The Trip - EP',
      //   id: '4',
      //   uri: 'spotify:track:AAAA4'
      // },
      // {
      //   name: 'Antidote',
      //   artist: 'Travis Scott',
      //   album: 'Rodeo',
      //   id: '5',
      //   uri: 'spotify:track:AAAA5'
      // }],
      playlistURIs: []
    };
  }

  /* this method will verify if a track is already in the playlist when the user clicks the + sign.
      if the track is not in the playlist the track will be added
  */
  addTrack(track) {
    // console.log(track);

    let updatedPlaylist = this.state.playlistTracks;
    // if track is not present in playlistTracks - if it is, indexOf returns it's index, aka != -1
    if (this.state.playlistTracks.indexOf(track) === -1) {
      updatedPlaylist.push(track);
      this.setState({ playlistTracks: updatedPlaylist });
    }
  
  }

  /* removes a track via it's id if the - sign is clicked
   */
  removeTrack(track) {
    // console.log(track);
    
    let ctr = 0;
    for(let i=0; i < this.state.playlistTracks.length; i++) {
      // console.log("\tplaylist track name = " + this.state.playlistTracks[i].name);
      // console.log("\tplaylist track id = " + this.state.playlistTracks[i].id);
      // console.log("\ttrack to remove id = " + track.id);
    
      if(track.id === this.state.playlistTracks[i].id) {
        // console.log('\t\tctr = ' + ctr);
        
        let updatedPlaylist = this.state.playlistTracks;
        updatedPlaylist.splice(ctr,1);

        this.setState({
          playlistTracks: updatedPlaylist
        });

        // console.log('\t\tplaylist after removal = ' + JSON.stringify(this.state.playlistTracks));
        return;
      } else {
        ctr++;
      }
    }
  }

  // updates the playlist name when the user adds new input to the playlist name
  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
    // console.log("new playlistName = " + this.state.playlistName)
  }

  // saves playlist and sets Spotify URIs
  savePlaylist() {
    // console.log('saving!');

    // let trackURIs = [];
    // this.state.playlistTracks.forEach(function(element) {
    //   trackURIs.push(element.uri);
    // });

    // console.log('\ttrack uris = ' + trackURIs);

    // this.setState({
    //   playlistURIs: trackURIs
    // });
    // alert('Playlist has been saved.');


    let trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    });
    this.setState({
      playlistURIs: trackURIs
    });

    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    });


  }

  // obtains the search term used when the user performs a search
  search(term) {
    console.log('Search term = ' + term);
    Spotify.search(term).then(tracks => {
      // console.log(tracks);
      this.setState({SearchResults: tracks})
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack} />
            {/* <!-- Add a Playlist component --> */}
            <PlayList playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
