import blankLayout from "../../components/layouts/blank";

import { Component } from "react";
import "isomorphic-fetch";
import Link from "next/link";
import styles from "../../styles/home.module.scss";
import { CONST_PERSONAL_MESSAGE__NONE } from "../../services/constants";
import Share from "../../components/share";
import PersonalNoteSelector from "../../components/personalNote/selector";

const defaultState = {
  msg: CONST_PERSONAL_MESSAGE__NONE,
};

const ShareContainer = class extends Component {
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
      <div className={styles.slipContainer}>
        <fieldset>
          <legend className={styles.slipTheSongHeading}>
            Touch someone today.
            <br />
            Slip the song into a friend's playlist
          </legend>

          <div>
            <p style={{ lineHeight: "1em", fontWeight: 600 }}>
              1. Choose a personal note:{" "}
              <span
                style={{
                  fontSize: "12px",
                  color: "#666666",
                  fontWeight: 400,
                }}
              >
                (optional)
              </span>
            </p>
            <PersonalNoteSelector onChange={this.personalNoteChange} />
          </div>
          <div>
            <div
              style={{
                marginBottom: "10px",
                maxWidth: "400px",
                fontWeight: 600,
              }}
            >
              <p>
                2. Select an app to share the special link. <br />
                <span className={styles.appShareExplaination}>
                  Your friend will see your personal note and the song slipped
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
    );
  }
};

const page = () => <ShareContainer />;

page.Layout = blankLayout;

export default page;
