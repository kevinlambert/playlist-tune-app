import { Component } from "react";
import "isomorphic-fetch";
import { withRouter } from "next/router";
import logger from "../../services/logger";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { serverAddress },
} = getConfig();

const CONST_SPOTIFY = "spotify";
const CONST_APPLE = "apple";

const setToken = async (spotifyCode) => {
  try {
    const response = await fetch(
      `${serverAddress}/api/spotify/token/${spotifyCode}`,
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
};

class spotifyAuth extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps({ query, router }) {
    const spotifyCode = query.code;

    return { spotifyCode, router };
  }

  async componentDidMount() {
    const token = await setToken(this.props.spotifyCode);
    this.props.router.replace(`/receiver/spotify`);
  }

  render() {
    return <div></div>;
  }
}

export default withRouter(spotifyAuth);
