import logger from "../services/logger";
import SpotifyWebApi from "spotify-web-api-node";
import { parseCookies } from "nookies";

import getConfig from "next/config";

const {
  serverRuntimeConfig: { spotify },
} = getConfig();

export const getAccessTokenFromCookie = (req) => {
  const cookies = parseCookies({ req });

  return cookies[spotify.SPOTIFY_ACCESS_TOKEN_COOKIE];
};

export const getToken = (spotifyCode) => {
  return new Promise((resolve, reject) => {
    if (spotifyCode === "") {
      reject("No code");
    } else {
      var spotifyApi = new SpotifyWebApi({
        clientId: spotify.spotifyClientId,
        clientSecret: spotify.spotifyClientSecret,
        redirectUri: spotify.spotifyRedirectUri,
      });
      spotifyApi.authorizationCodeGrant(spotifyCode).then(
        function (data) {
          resolve(data.body);
        },
        function (err) {
          logger.error(err);
          reject(err);
        }
      );
    }
  });
};

export const getAPI = (accessToken) => {
  var spotifyApi = new SpotifyWebApi({
    clientId: spotify.spotifyClientId,
    clientSecret: spotify.spotifyClientSecret,
    redirectUri: spotify.spotifyRedirectUri,
  });

  spotifyApi.setAccessToken(accessToken);
  return spotifyApi;
};

export const playlistHasTrack = async (accessToken, playlistId, trackUri) => {
  try {
    const spotifyApi = getAPI(accessToken);

    const response = await spotifyApi.getPlaylistTracks(playlistId, {
      fields: "items(track(uri))",
    });

    const tracks = response.body.items.map((item) => item.track);
    const trackExists = !!tracks.find((track) => track.uri === trackUri);

    return trackExists;
  } catch (error) {
    logger.error(error);
  }
};
