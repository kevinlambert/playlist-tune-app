import Head from "next/head";
import { Component } from "react";
import logger from "../../services/logger";
import "isomorphic-fetch";
import SmartUrl from "../../components/smartUrl";
import styles from "../../components/receiver.module.scss";
import AboutTheArtist from "../../components/aboutTheArtist";
import PersonalNote from "../../components/personalNote";

import getConfig from "next/config";
const {
  publicRuntimeConfig: { smartUrls },
} = getConfig();

const CONST_SPOTIFY = "spotify";
const CONST_APPLE = "apple";
const CONST_BANDCAMP = "bandcamp";

const Explaination = () => (
  <div className={styles.explainationContainer}>
    <p>
      You have total control over what playlist the song is added to
      <br />
      and you can remove it at any time through your music player.
    </p>
  </div>
);

const Prompt = ({ fromName, toName }) => {
  const To = () =>
    toName ? (
      <span>
        Hey <strong>{toName}</strong>
      </span>
    ) : (
      <span>Hey,</span>
    );

  const From = () =>
    fromName ? (
      <span>
        <strong>{fromName}</strong> wants to slip a song into your playlist.
      </span>
    ) : (
      <span>Your friend wants to slip a song into your playlist.</span>
    );

  return (
    <div className={styles.promptContainer}>
      <p>
        <To />
        <br />
        <From />
      </p>
    </div>
  );
};

const SelectPlatform = (platformSelected) => {
  return (
    <div className="container">
      <h1 className={styles.selectHeading}>Select your music platform</h1>
      <div className={styles.smallText}>You may be prompted to login</div>
      <div>
        <button onClick={platformSelected} id={CONST_SPOTIFY}>
          Spotify
        </button>
      </div>
    </div>
  );
};

const SelectPlaylist = (playlistSelected, playlists) => {
  const Options = playlists.map((playlist) => (
    <option value={playlist.id}>{playlist.text}</option>
  ));

  return (
    <div>
      <h1>Select your playlist</h1>
      <select id="playlist" name="playlist" onChange={playlistSelected}>
        {Options}
      </select>
    </div>
  );
};

const authoriseSpotify = (state) => {
  fetch("/api/spotify/authorizeURL", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(({ authorizeURL }) => {
      window.location.replace(authorizeURL);
    })
    .catch((error) => logger.error(error));
};

const Receiver = () => {
  const handlePlatform = (evt) => {
    switch (evt.currentTarget.id) {
      case CONST_SPOTIFY:
        authoriseSpotify();
        break;

      case CONST_APPLE:
        break;
    }
  };

  return <div>{SelectPlatform(handlePlatform)}</div>;
};

class NotOnPlatform extends Component {
  constructor(props) {
    super(props);

    this.state = { show: false };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { spotifyUrl, ...params } = smartUrls;

    return (
      <div className={"container"}>
        <a className={"linkButton"} onClick={this.onClickHandler}>
          Not on Spotify?
        </a>
        {this.state.show ? (
          <div className={"container"}>
            <p>You can listen to the song directly here:</p>
            <SmartUrl {...params} />
            <AboutTheArtist showLink={true} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ query }) {
    const { fromName, toName, msg } = query;

    return { fromName, toName, msg };
  }

  render() {
    return (
      <div className="container">
        <Head>
          <title>PlaylistTune.com - Platforms</title>
        </Head>

        <main>
          <Prompt fromName={this.props.fromName} toName={this.props.toName} />
          <PersonalNote msg={this.props.msg} />
          <Receiver />
          <NotOnPlatform />
        </main>
      </div>
    );
  }
}
