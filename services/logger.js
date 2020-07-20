import "isomorphic-fetch";
import {
  CONST_LOG_LEVEL_INFO,
  CONST_LOG_LEVEL_DEBUG,
  CONST_LOG_LEVEL_WARN,
  CONST_LOG_LEVEL_ERROR,
} from "../services/constants";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { serverAddress },
} = getConfig();

const logApi = (level, message) => {
  try {
    fetch(`${serverAddress}/api/logger`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ level, message }),
    });
  } catch (error) {
    console.error("Logger failed");
  }
};

export default class logger {
  static info(message) {
    logApi(CONST_LOG_LEVEL_INFO, message);
  }

  static warn(message) {
    logApi(CONST_LOG_LEVEL_WARN, message);
  }

  static debug(message) {
    logApi(CONST_LOG_LEVEL_DEBUG, message);
  }

  static error(error) {
    logApi(CONST_LOG_LEVEL_ERROR, error.message || error);
  }
}
