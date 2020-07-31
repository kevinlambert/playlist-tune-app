import Icon from "./icon";
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
      <Icon
        href={
          this.state.isApple
            ? `sms://open?addresses=+&body=${this.props.message}`
            : `sms:+?body=${this.props.message}`
        }
        backgroundColor="#ffbd00"
        src="/share/sms.svg"
        alt="share by sms"
        text="SMS / iMessage"
      />
    );
  }
}
