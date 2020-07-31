import Head from "next/head";
import { Component } from "react";
import logger from "../../services/logger";
import "isomorphic-fetch";
import SmartUrl from "../../components/smartUrl";
import styles from "../../components/receiver.module.scss";
import AboutTheArtist from "../../components/aboutTheArtist";
import PersonalNote from "../../components/personalNote";
import { CONST_PERSONAL_MESSAGE__NONE } from "../../services/constants";
import ImageMeta from "../../components/meta/receiverImage";

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

const To = ({ toName }) =>
  toName ? (
    <span>
      Hey <strong>{toName}</strong>,
    </span>
  ) : (
    <span>Hey,</span>
  );

const From = ({ fromName, msg }) => {
  const partial =
    parseInt(msg) !== CONST_PERSONAL_MESSAGE__NONE
      ? "sent you this message and"
      : "";

  return fromName ? (
    <span>
      <strong>{fromName}</strong> {partial}
      <br />
      wants to slip a song into your playlist.
    </span>
  ) : (
    <span>
      Your friend {partial}
      <br />
      wants to slip a song into your playlist.
    </span>
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
        <ImageMeta />

        <main>
          <div className={styles.promptContainer}>
            <To toName={this.props.toName} />
          </div>
          <div style={{ margin: "20px 0 30px 0" }}>
            <PersonalNote msg={this.props.msg} />
          </div>
          <div className={styles.promptContainer}>
            <From fromName={this.props.fromName} msg={this.props.msg} />
          </div>
          <Receiver />
          <NotOnPlatform />
        </main>
      </div>
    );
  }
}
