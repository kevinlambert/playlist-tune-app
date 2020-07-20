import { setCookie } from "nookies";
import { getToken } from "../../../../services/spotify";
import getConfig from "next/config";

const {
  serverRuntimeConfig: { spotify },
} = getConfig();

const setResCookie = (res, name, value, options) =>
  setCookie({ res }, name, value, options);

const cookieSecureOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "strict",
};

export default async (req, res) => {
  try {
    const {
      query: { code },
    } = req;

    const data = await getToken(code);

    setResCookie(
      res,
      spotify.SPOTIFY_ACCESS_TOKEN_COOKIE,
      data["access_token"],
      cookieSecureOptions
    );

    setResCookie(
      res,
      spotify.SPOTIFY_REFRESH_TOKEN_COOKIE,
      data["refresh_token"],
      cookieSecureOptions
    );

    res.status(200).end();
  } catch (error) {
    res.status(500).send(error);
  }
};
