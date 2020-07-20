import logger from "../logger";
import "isomorphic-fetch";

import getConfig from "next/config";
const {
  serverRuntimeConfig: { mailingList },
} = getConfig();

const convertKitFormId = "1533929";
const playlisttuneTag = 1733857;

export const subscribeConvertKit = async ({ name, email }) => {
  const apiBody = {
    api_key: mailingList.convertKitApiKey,
    first_name: name,
    email,
    tags: [playlisttuneTag],
  };

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiBody),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    logger.error(error);
  }
};
