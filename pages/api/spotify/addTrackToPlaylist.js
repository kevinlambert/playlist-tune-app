import {
  getAPI,
  playlistHasTrack,
  getAccessTokenFromCookie,
} from "../../../services/spotify";

import getConfig from "next/config";

const {
  publicRuntimeConfig: { playlistCodes },
} = getConfig();

export default async (req, res) => {
  try {
    const {
      query: { playlistId, trackUri },
    } = req;

    const accessToken = getAccessTokenFromCookie(req);

    if (await playlistHasTrack(accessToken, playlistId, trackUri)) {
      res.statusCode = 200;
      res.json({ code: playlistCodes.TRACK_ALREADY_EXISTS_IN_PLAYLIST });
    } else {
      const spotifyApi = getAPI(accessToken);

      await spotifyApi
        .addTracksToPlaylist(playlistId, [trackUri])
        .then((data) => {
          if (data.statusCode === 201) {
            res.statusCode = 200;
            res.json({ code: playlistCodes.TRACK_ADDED_TO_PLAYLIST });
          } else {
            res.statusCode = 400;
            res.json({
              error: true,
              code: playlistCodes.FAILED_ADD_TRACK_PLAYLIST,
            });
          }
        });
    }
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: true, code: playlistCodes.UNKNOWN_ERROR });
  }
};
