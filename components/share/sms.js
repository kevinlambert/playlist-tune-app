import styles from "./share.module.scss";
import { Component } from "react";
import { isApple } from "../../services/device";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isApple: true,
    };
  }

  componentDidMount() {
    this.setState({ isApple: isApple() });
  }

  render() {
    return (
      <a
        href={
          this.state.isApple
            ? `sms://open?addresses=+&body=${this.props.message}`
            : `sms:+?body=${this.props.message}`
        }
        className={styles.icon}
        style={{ backgroundColor: "#ffbd00" }}
      >
        <img src="/share/sms.svg" alt="share by sms" />
      </a>
    );
  }
}
