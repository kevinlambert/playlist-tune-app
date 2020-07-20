import {
  CONST_LOG_LEVEL_INFO,
  CONST_LOG_LEVEL_DEBUG,
  CONST_LOG_LEVEL_WARN,
  CONST_LOG_LEVEL_ERROR,
} from "../../services/constants";

const logger = (level, message) => {
  switch (level) {
    case CONST_LOG_LEVEL_INFO:
      console.info(message);
      break;

    case CONST_LOG_LEVEL_DEBUG:
      console.debug(message);
      break;

    case CONST_LOG_LEVEL_WARN:
      console.warn(message);
      break;

    case CONST_LOG_LEVEL_ERROR:
    default:
      console.error(message);
      break;
  }
};

export default (req, res) => {
  const { level, message } = req.body;

  logger(level, message);

  res.status(200).end();
};
