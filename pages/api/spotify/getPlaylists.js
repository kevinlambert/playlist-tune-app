import { getAPI, getAccessTokenFromCookie } from "../../../services/spotify";

export default async (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const accessToken = getAccessTokenFromCookie(req);

      const spotifyApi = getAPI(accessToken);

      spotifyApi.getMe().then((me) => {
        spotifyApi.getUserPlaylists({ limit: 50 }).then((data) => {
          const playlists = data.body.items
            .filter(
              (item) => item.owner.id === me.body.id || item.collaborative
            )
            .map((item) => ({ id: item.id, name: item.name }));

          res.statusCode = 200;
          res.json(playlists);
          resolve();
        });
      });
    } catch (error) {
      res.statusCode = 400;
      res.end();
      reject(error);
    }
  });
};
