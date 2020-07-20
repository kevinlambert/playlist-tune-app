import { Component } from "react";
import "isomorphic-fetch";
import { withRouter } from "next/router";
import logger from "../../services/logger";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { serverAddress },
} = getConfig();

const blockEmail = async (emailAddress) => {
  try {
    const response = await fetch(
      `${serverAddress}/api/email/block/${emailAddress}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return { success: response.status === 200 };
  } catch (error) {
    logger.error(error);
  }
};

const EMAIL_BLOCK_SUCCESS = "EMAIL_BLOCK_SUCCESS";
const EMAIL_BLOCK_FAILED = "EMAIL_BLOCK_FAILED";
const EMAIL_BLOCK_PENDING = "EMAIL_BLOCK_PENDING";

class spotifyAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailBlockStatus: EMAIL_BLOCK_PENDING,
    };
  }

  static async getInitialProps({ query, router }) {
    const emailAddress = query.emailAddress;
    return { emailAddress };
  }

  async componentDidMount() {
    const result = await blockEmail(this.props.emailAddress);
    if (result.success) {
      this.setState({ emailBlockStatus: EMAIL_BLOCK_SUCCESS });
    } else {
      this.setState({ emailBlockStatus: EMAIL_BLOCK_FAILED });
    }
  }

  render() {
    if (this.state.emailBlockStatus === EMAIL_BLOCK_PENDING) {
      return <p>We are processing your blocking request.</p>;
    } else if (this.state.emailBlockStatus === EMAIL_BLOCK_SUCCESS) {
      return (
        <p>
          Your email address has been block.
          <br />
          You should not be receiving anymore messages from PlaylistTune.com
        </p>
      );
    } else {
      return <p>There was a problem blocking your email. Please contact us.</p>;
    }
  }
}

export default withRouter(spotifyAuth);
