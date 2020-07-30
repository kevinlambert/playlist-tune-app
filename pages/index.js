import sanitize from "../services/sanitize";
import { Component } from "react";
import "isomorphic-fetch";
import Link from "next/link";
import styles from "../styles/home.module.scss";
import { CONST_MAILER_NATIVE } from "../services/constants";
import { mailToHref } from "../components/email/template";
import SmartUrlIcon from "../components/smartUrl/smartUrlIcon";
import Meta from "../components/meta";
import logger from "../services/logger";
import SpotifyFollow from "../components/spotifyFollow";
import Head from "next/head";
import Share from "../components/share";

import getConfig from "next/config";
const {
  publicRuntimeConfig: { mail, smartUrls },
} = getConfig();

const FILL_FORM = "FILL_FORM";
const EMAIL_SENT_PENDING = "EMAIL_SENT_PENDING";
const EMAIL_SENT_SUCCESS = "EMAIL_SENT_SUCCESS";
const EMAIL_SENT_FAILED = "EMAIL_SENT_FAILED";

const defaultState = {
  fromName: "",
  fromEmail: "",
  toName: "",
  toEmail: "",
  toMessage: "",
  status: FILL_FORM,
  subscribeToMailingList: false,
};

const Sender = class sender extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;

    this.resetPage = this.resetPage.bind(this);
  }

  resetPage() {
    this.setState(defaultState);
  }

  handleChange = async (evt) => {
    // This triggers everytime the input is changed
    await this.setState({
      [evt.target.dataset.name]: evt.target.value,
    });
  };

  handleCheckBoxChange = async (evt) => {
    // This triggers everytime the input is changed
    await this.setState({
      [evt.target.name]: evt.target.checked,
    });
  };

  async subscribeToMailingList() {
    try {
      const response = await fetch(
        `/api/mailingList?name=${this.state.fromName}&emailAddress=${this.state.fromEmail}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      logger.error(error);
    }
  }

  sendButton() {
    if (mail.mailer === CONST_MAILER_NATIVE) {
      const href = mailToHref({ ...this.state });

      return (
        <a className={`${styles.sendButton} button`} href={href}>
          Send
        </a>
      );
    } else {
      return <input className={styles.sendButton} type="submit" value="Send" />;
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    // this.setState({ toMessage: sanitize(this.state.toMessage) });

    // this.recaptcha.execute();
  };

  urlToShare() {}

  form() {
    return (
      <div>
        <Head></Head>
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
          <h2 className={styles.slipTheSongHeading}>
            Slip the song into a friends playlist
          </h2>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              {/* <legend>Your Details</legend> */}
              <div>
                <label htmlFor="name">Your Name</label>
                <input
                  name="name"
                  type="text"
                  id="name"
                  autoComplete="name"
                  required
                  data-name="fromName"
                  value={this.state.fromName}
                  onChange={this.handleChange}
                ></input>
              </div>
              {/* <div className={"checkboxContainer"}>
                <input
                  name="subscribeToMailingList"
                  type="checkbox"
                  id="subscribeToMailingList"
                  data-name="subscribeToMailingList"
                  checked={this.state.subscribeToMailingList}
                  onChange={this.handleCheckBoxChange}
                ></input>
                <label
                  htmlFor="subscribeToMailingList"
                  className={styles.mailingListLabel}
                >
                  Yes, Subscribe me to KevinLambertMusic.com
                  <br />
                  for email updates and news.
                </label>
              </div> */}

              <div>
                <label htmlFor="toName">Friends Name</label>
                <input
                  name="toName"
                  type="text"
                  id="toName"
                  required
                  data-name="toName"
                  value={this.state.toName}
                  onChange={this.handleChange}
                ></input>
              </div>
              <div>
                <div style={{ marginBottom: "10px" }}>Send via:</div>
                <Share
                  fromName={this.state.fromName}
                  toName={this.state.toName}
                  msg={this.state.msg}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }

  emailPending() {
    return <p className={styles.message}>Please wait: Processing</p>;
  }

  emailSuccess() {
    return (
      <div className={styles.messageContainer}>
        <p className={styles.successMessage}>It's been sent. Woohoo!</p>
        <button onClick={this.resetPage}>Send another message</button>
        <iframe
          src="https://open.spotify.com/follow/1/?uri=spotify:artist:1DSuM3Lz5mq1nH6veIFIF5&size=detail&theme=light"
          width="300"
          height="56"
          scrolling="no"
          frameBorder="0"
          style={{ border: "none", overflow: "hidden" }}
          allowtransparency="true"
        ></iframe>
      </div>
    );
  }

  emailFailed() {
    // if (this.state.isEmailAddressBlocked) {
    //   return (
    //     <>
    //       <p className={styles.failedMessage}>
    //         Oh dear!
    //         <br />
    //         We couldn't send to that email address.
    //       </p>
    //       <p>
    //         You can try another email address{" "}
    //         <a onClick={this.resetPage}>here</a>
    //       </p>
    //     </>
    //   );
    // } else {
    return (
      <p className={styles.failedMessage}>
        Oh dear! Something went wrong.
        <br />
        It didn't send for some reason. Please try again{" "}
        <Link href="/">
          <a onClick={this.resetPage}>here</a>
        </Link>{" "}
        or contact us to help you out.
      </p>
    );
    // }
  }

  render() {
    switch (this.state.status) {
      case EMAIL_SENT_SUCCESS:
        return this.emailSuccess();
        break;
      case EMAIL_SENT_FAILED:
        return this.emailFailed();
        break;
      case EMAIL_SENT_PENDING:
        return this.emailPending();
        break;
      default:
        return this.form();
        break;
    }
  }
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Meta />
      <Sender />
    </div>
  );
}
