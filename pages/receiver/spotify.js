import { Component } from "react";
import "isomorphic-fetch";
import logger from "../../services/logger";
import Link from "next/link";
import getConfig from "next/config";
import styles from "../../styles/home.module.scss";
import AboutTheArtist from "../../components/aboutTheArtist";

const {
  publicRuntimeConfig: { serverAddress, playlistCodes, SPOTIFY_TRACK_URI },
} = getConfig();

const CONST_SPOTIFY = "spotify";
const CONST_APPLE = "apple";

const SelectPlaylist = ({ playlistSelected, playlists = [] }) => {
  const Options = playlists.map((playlist) => (
    <option key={playlist.id} value={playlist.id}>
      {playlist.name}
    </option>
  ));

  return (
    <div>
      <h1>Select your playlist</h1>
      <select
        id="playlist"
        name="playlist"
        onChange={playlistSelected}
        required
      >
        <option key={"prompt"} value={null}>
          -- Select a playlist --
        </option>
        {Options}
      </select>
    </div>
  );
};

const getSpotifyPlaylists = async () => {
  try {
    const response = await fetch(
      encodeURI(`${serverAddress}/api/spotify/getPlaylists`),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    //do something
    logger.error(error);
  }
};

const addTrackToPlaylist = async (playlistId, trackUri) => {
  try {
    const response = await fetch(
      encodeURI(
        `${serverAddress}/api/spotify/addTrackToPlaylist?playlistId=${playlistId}&trackUri=${trackUri}`
      ),
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    //do something
    logger.error(error);
  }
};

const Success = () => (
  <>
    <div className={styles.successMessage}>
      <p>The song has been added.</p>
      <p>Listen to your playlist to find the song.</p>
    </div>
    <p>
      You can also send a song message to someone at{" "}
      <strong>
        <Link href="/">
          <a style={{ color: "black" }}>PlaylistTune.com</a>
        </Link>
      </strong>
    </p>
  </>
);

const Failed = ({ tryAgainHandler }) => (
  <div className={styles.failedMessage}>
    <p>We were unable to add the track to your playlist.</p>
    <p>
      <a className={"linkButton"} onClick={tryAgainHandler}>
        Try a different playlist
      </a>
    </p>
  </div>
);

class spotify extends Component {
  constructor(props) {
    super(props);

    this.handleAcceptance = this.handleAcceptance.bind(this);
    this.handlePlaylist = this.handlePlaylist.bind(this);
    this.selectPlaylistView = this.selectPlaylistView.bind(this);

    this.state = {
      selectedPlaylistId: null,
      playlists: [],
      status: "SELECT_PLAYLIST",
    };
  }

  async componentDidMount() {
    const playlists = await getSpotifyPlaylists();
    this.setState({ playlists });
  }

  async handleAcceptance(e) {
    if (this.state.selectedPlaylistId === null) {
      alert("Please select a valid playlist");
    } else {
      const result = await addTrackToPlaylist(
        this.state.selectedPlaylistId,
        SPOTIFY_TRACK_URI
      );

      switch (result.code) {
        case playlistCodes.TRACK_ADDED_TO_PLAYLIST:
        case playlistCodes.TRACK_ALREADY_EXISTS_IN_PLAYLIST:
          this.setState({ status: "SUCCESS" });
          break;
        case playlistCodes.FAILED_ADD_TRACK_PLAYLIST:
        default:
          this.setState({ status: "FAILED" });
          break;
      }
    }
  }

  selectPlaylistView() {
    this.setState({
      status: "SELECT_PLAYLIST",
    });
  }

  handlePlaylist(e) {
    this.state.selectedPlaylistId = e.currentTarget.value;
  }

  render() {
    if (this.state.status === "SELECT_PLAYLIST") {
      return (
        <div className={styles.container}>
          <AboutTheArtist isOpen={true} noToggle={true} />
          <SelectPlaylist
            playlistSelected={this.handlePlaylist}
            playlists={this.state.playlists}
          ></SelectPlaylist>
          <button onClick={this.handleAcceptance}>Yes, add the song</button>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          {this.state.status === "SUCCESS" ? (
            <Success />
          ) : (
            <Failed tryAgainHandler={this.selectPlaylistView} />
          )}
        </div>
      );
    }
  }
}

export default spotify;
