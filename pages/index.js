import { Component } from "react";
import "isomorphic-fetch";
import Link from "next/link";
import styles from "../styles/home.module.scss";
import SmartUrlIcon from "../components/smartUrl/smartUrlIcon";
import SpotifyFollow from "../components/spotifyFollow";
import { CONST_PERSONAL_MESSAGE__NONE } from "../services/constants";
import Share from "../components/share";
import PersonalNoteSelector from "../components/personalNote/selector";

import getConfig from "next/config";
const {
  publicRuntimeConfig: { smartUrls },
} = getConfig();

const defaultState = {
  msg: CONST_PERSONAL_MESSAGE__NONE,
};

const Sender = class sender extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;

    this.resetPage = this.resetPage.bind(this);
    this.personalNoteChange = this.personalNoteChange.bind(this);
  }

  resetPage() {
    this.setState(defaultState);
  }

  personalNoteChange(e) {
    this.setState({ msg: e.target.value });
  }

  render() {
    return (
      <div>
        <div style={{ maxWidth: "480px" }}>
          <fieldset>
            <legend style={{ fontWeight: 500 }}>Ever missed someone?</legend>
            Send a musical message to someone special
          </fieldset>
        </div>
        <h2>The Song</h2>

        <iframe
          title="Listen to the song Playlist Tune"
          style={{ border: "0", width: "100%", height: "120px" }}
          src="https://bandcamp.com/EmbeddedPlayer/track=3887074908/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=small/transparent=true/"
          seamless
        ></iframe>

        <SmartUrlIcon {...smartUrls} />
        <div className={"container"}>
          <SpotifyFollow />
        </div>

        <div className={styles.slipContainer}>
          <fieldset>
            <legend className={styles.slipTheSongHeading}>
              Slip the song into a friends playlist
            </legend>
            <div>
              <p style={{ lineHeight: "1em" }}>
                1. Choose a personal note:{" "}
                <span style={{ fontSize: "12px", color: "#666666" }}>
                  (optional)
                </span>
              </p>
              <PersonalNoteSelector onChange={this.personalNoteChange} />
            </div>
            <div>
              <div style={{ marginBottom: "10px", maxWidth: "400px" }}>
                <p>
                  2. Select an app to share the special link. <br />
                  <span className={styles.appShareExplaination}>
                    They'll be shown your personal note and the song slipped
                    into their chosen playlist.
                  </span>
                </p>
              </div>
              <Share msg={this.state.msg} />
            </div>
          </fieldset>
          <p
            className={styles.appShareExplaination}
            style={{ marginTop: "40px", textAlign: "center" }}
          >
            <Link href="/terms">
              <a style={{ color: "#464646", textDecoration: "underline" }}>
                Terms and conditions
              </a>
            </Link>{" "}
            apply. By using this website and sharing you accept these.
          </p>
        </div>
      </div>
    );
  }
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Sender />
    </div>
  );
}
