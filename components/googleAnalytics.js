import ReactGA from "react-ga";
import { Component } from "react";

ReactGA.initialize("UA-159635793-2");

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return <></>;
  }
}
