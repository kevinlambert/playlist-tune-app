import { Component } from "react";
import "isomorphic-fetch";
import styles from "../styles/home.module.scss";
import logger from "../services/logger";

const defaultState = {
  name: "",
  email: "",
  subscribeToMailingList: false,
};

export default class  extends Component {
  constructor(props) {
    super(props);
    this.state = defaultState;

    this.resetPage = this.resetPage.bind(this);
  }

  resetPage() {
    this.setState(defaultState);
  }

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


  render() {
    return (
        <div className={"checkboxContainer"}>
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
        </div>
      );
};

