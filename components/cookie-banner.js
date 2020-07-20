import { Component } from "react";
import styles from "./cookie-banner.module.scss";
const COOKIE_BANNER_HIDE = "cookie-banner-hide";

export default class CookieBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
    };

    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.setState({
      hide: !!window.localStorage.getItem(COOKIE_BANNER_HIDE),
    });
  }

  close() {
    window.localStorage.setItem(COOKIE_BANNER_HIDE, true);
    this.setState({
      hide: true,
    });
  }

  render() {
    if (this.state.hide) {
      return null;
    } else {
      return (
        <div className={styles.container}>
          <div>This site uses cookies to improve your browsing experience</div>
          <button onClick={this.close}>OK</button>
        </div>
      );
    }
  }
}
