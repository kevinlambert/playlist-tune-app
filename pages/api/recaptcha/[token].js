import "isomorphic-fetch";
import getConfig from "next/config";

const {
  serverRuntimeConfig: { reCAPTCHA },
} = getConfig();

export default async (req, res) => {
  const {
    query: { token },
  } = req;

  const query = `secret=${reCAPTCHA.reCAPCHA_Secret_key}&response=${token}&remoteip=${req.connection.remoteAddress}`;

  const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

  try {
    const response = await fetch(verifyURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const passThreshold = data.score >= reCAPTCHA.reCAPCHA_human_threshold;

    res.statusCode = 200;
    res.json({ success: data.success, passThreshold });
  } catch (error) {
    console.log(error);
  }
};
