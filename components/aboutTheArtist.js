import { Component } from "react";
import styles from "./aboutTheArtist.module.scss";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen || false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.noToggle ? (
          <p style={{ fontWeight: "600" }}>About the Artist</p>
        ) : (
          <p>
            Singer-Songwriter Kevin Lambert created this website{" "}
            <a className="linkButton" onClick={this.toggle}>
              ...more
            </a>
          </p>
        )}
        <div
          className={styles.text}
          style={{ display: this.state.isOpen ? "block" : "none" }}
        >
          <p>
            Singer-Songwriter Kevin Lambert's music has a relaxed living room
            feel similar to Jason Mraz and Noah Kahan.
          </p>
          <p>
            With a happy sunny summer vibe, this acoustic song will have you
            back on the beach with your friends, jamming on the guitar.
          </p>
          {this.props.showLink ? (
            <p style={{ fontSize: "14px", color: "grey" }}>
              Find out more about Kevin at{" "}
              <a href="https://kevinlambertmusic.com" target="_blank">
                KevinLambertMusic.com
              </a>
            </p>
          ) : null}
          <div style={{ borderBottom: "1px solid grey", width: "100px" }}></div>
        </div>
      </div>
    );
  }
}
