import styles from "./smartUrlIcon.module.scss";

const Streaming = ({
  spotifyUrl = "",
  appleMusicUrl = "",
  pandoraUrl = "",
  youtubeUrl = "",
  deezerUrl = "",
  tidalUrl = "",
}) => {
  return (
    <>
      {spotifyUrl ? (
        <a name="spotify" href={spotifyUrl} target="_blank">
          <img
            src="/store-logos/icons/music-service_spotify-icon.svg"
            alt="Listen on Spotify"
          />
        </a>
      ) : null}
      {appleMusicUrl ? (
        <a name="apple music" href={appleMusicUrl} target="_blank">
          <img
            src="/store-logos/icons/music-service_applemusic-icon.svg"
            alt="Listen on Apple music"
          />
        </a>
      ) : null}
      {pandoraUrl ? (
        <a name="pandora" href={pandoraUrl} target="_blank">
          <img
            src="/store-logos/icons/music-service_pandora-icon.svg"
            alt="Listen on Pandora"
          />
        </a>
      ) : null}
      {youtubeUrl ? (
        <a name="youtube" href={youtubeUrl} target="_blank">
          <img
            src="/store-logos/icons/music-service_youtube-icon.svg"
            alt="Listen on Youtube"
          />
        </a>
      ) : null}
      {deezerUrl ? (
        <a
          name="deezer"
          href={deezerUrl}
          target="_blank"
          className={styles.mobileHide}
        >
          <img
            src="/store-logos/icons/music-service_deezer-text-icon.svg"
            alt="Listen on Deezer"
          />
        </a>
      ) : null}
      {tidalUrl ? (
        <a
          name="tidal"
          href={tidalUrl}
          target="_blank"
          className={styles.mobileHide}
        >
          <img
            src="/store-logos/icons/music-service_tidal-icon.svg"
            alt="Listen on Tidal"
          />
        </a>
      ) : null}
    </>
  );
};

const Download = ({
  bandcampUrl = "",
  iTunesStoreUrl = "",
  amazonStoreUrl = "",
}) => {
  return (
    <>
      {bandcampUrl ? (
        <a
          name="Bandcamp"
          href={bandcampUrl}
          target="_blank"
          className={styles.mobileHide}
        >
          <img
            src="/store-logos/icons/music-service_bandcamp-icon.svg"
            alt="Download on Bandcamp"
          />
        </a>
      ) : null}
      {/* {iTunesStoreUrl ? (
        <a
          name="itunes"
          href={iTunesStoreUrl}
          target="_blank"
          className={styles.mobileHide}
        >
          <img
            src="/store-logos/icons/music-service_itunes-icon.svg"
            alt="Download on iTunes Store"
          />
        </a>
      ) : null} */}
      {/* {amazonStoreUrl ? (
        <a
          name="Amazon Store"
          href={amazonStoreUrl}
          target="_blank"
          className={styles.mobileHide}
        >
          <img
            src="/store-logos/icons/music-service_amazonmp3-icon.svg"
            alt="Download on Amazon Store"
          />
        </a>
      ) : null} */}
    </>
  );
};

export default (props) => {
  return (
    <div className={styles.smartUrlContainer}>
      <Streaming {...props} />
      <Download {...props} />
    </div>
  );
};
