import sanitize from "../services/sanitize";
import { Component } from "react";
import "isomorphic-fetch";
import Link from "next/link";
import Recaptcha from "react-google-invisible-recaptcha";
import styles from "../styles/home.module.scss";
import { CONST_MAILER_NATIVE } from "../services/constants";
import { mailToHref } from "../components/email/template";
import SmartUrl from "../components/smartUrl";
import Meta from "../components/meta";
import SocialShare from "../components/socialShare";
import AboutTheArtist from "../components/aboutTheArtist";

import getConfig from "next/config";
const {
  publicRuntimeConfig: { reCAPTCHA_site_key, mail, smartUrls },
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

    this.onResolved = this.onResolved.bind(this);
    this.resetPage = this.resetPage.bind(this);
  }

  resetPage() {
    this.setState(defaultState);
  }

  handleChange = async (evt) => {
    // This triggers everytime the input is changed
    await this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleCheckBoxChange = async (evt) => {
    // This triggers everytime the input is changed
    await this.setState({
      [evt.target.name]: evt.target.checked,
    });
  };

  async onResolved() {
    const token = this.recaptcha.getResponse();

    try {
      const response = await fetch(`/api/recaptcha/${token}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success) {
        if (!data.passThreshold) {
          //do something to verify email address of the sender
        }

        if (this.state.subscribeToMailingList) {
          await this.subscribeToMailingList();
        }

        await this.sendEmail();
      } else {
        // not human
        //do something to verify email address of the sender
      }
    } catch (error) {
      console.log(error);
    }
  }

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
      console.log(error);
    }
  }

  async sendEmail() {
    this.setState({ status: EMAIL_SENT_PENDING });
    try {
      const response = await fetch("/api/email/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      });
      const data = await response.json();
      data.success
        ? this.setState({ status: EMAIL_SENT_SUCCESS })
        : this.setState({
            status: EMAIL_SENT_FAILED,
            isEmailAddressBlocked: data.isBlocked,
          });
    } catch (error) {
      console.log(error);
      this.setState({ status: EMAIL_SENT_FAILED });
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

    this.setState({ toMessage: sanitize(this.state.toMessage) });

    this.recaptcha.execute();
  };

  // force update
  form() {
    return (
      <div>
        <h2>The Song</h2>

        <iframe
          title="Listen to the song Playlist Tune"
          style={{ border: "0", width: "100%", height: "120px" }}
          src="https://bandcamp.com/EmbeddedPlayer/track=3887074908/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=small/transparent=true/"
          seamless
        ></iframe>
        <AboutTheArtist showLink={true} />
        <p style={{ fontWeight: 600 }}>
          <em>Listen here too...</em>
        </p>
        <SmartUrl {...smartUrls} />
        <h2>Send someone a song message...</h2>
        <h3>How it'll look:</h3>
        <div className={styles.container}>
          <img
            className={styles.exampleEmail}
            src="/email-example.png"
            alt="Example of the email message"
          />
        </div>
        <h3>How It Works</h3>
        <ol>
          <li>Fill in the form below.</li>
          <li>The recipient will get an email with a link.</li>
          <li>
            Clicking the link will slip the song into their chosen playlist.
          </li>
        </ol>

        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Your Details</legend>
            <div>
              <label htmlFor="fromName">Your Name</label>
              <input
                name="fromName"
                type="text"
                id="fromName"
                required
                value={this.state.fromName}
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="fromEmail">Your Email</label>
              <input
                name="fromEmail"
                type="email"
                id="fromEmail"
                required
                value={this.state.fromEmail}
                onChange={this.handleChange}
              ></input>
            </div>
            <div className={"checkboxContainer"}>
              <input
                name="subscribeToMailingList"
                type="checkbox"
                id="subscribeToMailingList"
                checked={this.state.subscribeToMailingList}
                onChange={this.handleCheckBoxChange}
              ></input>
              <label htmlFor="subscribeToMailingList">
                Yes, Subscribe me to KevinLambertMusic.com
                <br />
                for email updates and news.
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Recipients Details</legend>
            <div>
              <label htmlFor="toName">To Name</label>
              <input
                name="toName"
                type="text"
                id="toName"
                required
                value={this.state.toName}
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <label htmlFor="toEmail">To Email</label>
              <input
                name="toEmail"
                type="email"
                id="toEmail"
                required
                value={this.state.toEmail}
                onChange={this.handleChange}
              ></input>
              <div>
                <label htmlFor="toMessage">Message</label>
                <textarea
                  name="toMessage"
                  type="textarea"
                  id="toMessage"
                  rows="6"
                  required
                  value={this.state.toMessage}
                  onChange={this.handleChange}
                ></textarea>
              </div>
            </div>
          </fieldset>
          {this.sendButton()}
          <Recaptcha
            ref={(ref) => (this.recaptcha = ref)}
            sitekey={reCAPTCHA_site_key}
            onResolved={this.onResolved}
            badge="inline"
          />
        </form>
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
      <SocialShare />
      <Sender />
    </div>
  );
}
