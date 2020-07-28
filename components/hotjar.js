import { hotjar } from "react-hotjar";
import { Component } from "react";

export default class extends Component {
  componentDidMount() {
    hotjar.initialize(1921817, 6);
  }
  render() {
    return <></>;
  }
}

// force deploy
