import SpotifyWebApi from "spotify-web-api-node";
import getConfig from "next/config";

const {
  serverRuntimeConfig: { spotify },
} = getConfig();

export default (req, res) => {
  const scopes = [
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-read-private",
    "playlist-modify-private",
  ];

  var spotifyApi = new SpotifyWebApi({
    clientId: spotify.spotifyClientId,
    clientSecret: spotify.spotifyClientSecret,
    redirectUri: spotify.spotifyRedirectUri,
  });

  // Create the authorization URL
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, req.body.state);

  res.statusCode = 200;
  res.json({ authorizeURL });
};
