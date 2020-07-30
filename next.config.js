const SPOTIFY_TRACK_ID = "1V2aY2lEP9v4KG7w3hzOIC";

module.exports = () => {
  const isDev = process.env.NODE_ENV === "development";
  const isProd = process.env.NODE_ENV === "production";
  const isStaging = process.env.NODE_ENV === "staging";

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const productionServerAddress = "https://playlisttune.com";

  const env = {
    SERVER_ADDRESS: (() => {
      if (isDev) return "http://localhost:3000";
      if (isProd) {
        return productionServerAddress;
      }
      if (isStaging) return "https://playlist-tune-app-11187.nodechef.com";
      return "SERVER_ADDRESS:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
  };

  // next.config.js object
  return {
    env,
    serverRuntimeConfig: {
      mail: {
        sendGridApiKey: "llGIFFrLM9RvCJhRBJBJPg",
        smtpUsername: process.env.SMTP_USERNAME,
        smtpPassword: process.env.SMTP_PASSWORD,
        playlistTuneEmail: "noreply@playlisttune.com",
        mailer: process.env.MAILER,
      },
      mailingList: {
        convertKitApiKey: "llGIFFrLM9RvCJhRBJBJPg",
      },
      reCAPTCHA: {
        reCAPCHA_Secret_key: "6LdoQq8ZAAAAADYnq4B0GK0G54vm3gI1lW2l4o3H",
        reCAPCHA_human_threshold: 0.7,
      },
      spotify: {
        spotifyClientId: "d17b0577174a4ebc907a30633ec51b1f",
        spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        spotifyRedirectUri: `${env.SERVER_ADDRESS}/receiver/spotifyAuth`,
        SPOTIFY_ACCESS_TOKEN_COOKIE: "sfyac",
        SPOTIFY_REFRESH_TOKEN_COOKIE: "sfyrc",
      },
      mongo: {
        url: process.env.DATABASE_URI,
        databaseName: "playlist-tune-app",
      },
    },
    publicRuntimeConfig: {
      serverAddress: env.SERVER_ADDRESS,
      productionServerAddress,
      reCAPTCHA_site_key: "6LdoQq8ZAAAAAPCCp-g1MCk597BPOAjGiR9MPXXs",
      SPOTIFY_TRACK_URI: `spotify:track:${SPOTIFY_TRACK_ID}`,
      SPOTIFY_TRACK_ID,
      playlistCodes: {
        TRACK_ALREADY_EXISTS_IN_PLAYLIST: "TRACK_ALREADY_EXISTS_IN_PLAYLIST",
        TRACK_ADDED_TO_PLAYLIST: "TRACK_ADDED_TO_PLAYLIST",
        FAILED_ADD_TRACK_PLAYLIST: "FAILED_ADD_TRACK_PLAYLIST",
        UNKNOWN_ERROR: "UNKNOWN_ERROR",
      },
      smartUrls: {
        spotifyUrl: `https://open.spotify.com/track/${SPOTIFY_TRACK_ID}`,
        appleMusicUrl:
          "https://geo.music.apple.com/us/album/playlist-tune-single/1523032312?app=music",
        iTunesStoreUrl:
          "https://geo.itunes.apple.com/us/album/playlist-tune-single/1523032312?app=itunes",
        pandoraUrl:
          "https://pandora.app.link/?$desktop_url=https%3A%2F%2Fwww.pandora.com%2Fartist%2Fkevin-lambert%2Fplaylist-tune-single%2FALP65mxjvwkKtKZ&$ios_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A6048766&$android_deeplink_path=pandorav4%3A%2F%2Fbackstage%2Falbum%3Ftoken%3DAL%3A6048766&~channel=Partner%20Catalog%20Search%20API",
        youtubeUrl: "https://www.youtube.com/watch?v=LVG96U_hBBA",
        deezerUrl: "https://www.deezer.com/album/160156602",
        amazonMusicUrl: "https://music.amazon.com/albums/B08CSPB2CN",
        amazonStoreUrl:
          "https://www.amazon.com/dp/B08CSPB2CN?linkCode=osi&th=1&psc=1",
        bandcampUrl: "http://kevinlambert.bandcamp.com/track/playlist-tune",
        tidalUrl: "http://www.tidal.com/album/148238803",
      },
      urls: {
        block: `https://playlisttune.com/block/`,
      },
      mail: {
        mailer: process.env.MAILER,
      },
    },
  };
};
