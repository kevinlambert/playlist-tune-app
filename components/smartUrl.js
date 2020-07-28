import styles from "./smartUrl.module.scss";

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
          <img src="/music-service_spotify.svg" alt="Listen on Spotify" />
        </a>
      ) : null}
      {appleMusicUrl ? (
        <a name="apple music" href={appleMusicUrl} target="_blank">
          <img
            src="/music-service_applemusic.svg"
            alt="Listen on Apple music"
          />
        </a>
      ) : null}
      {pandoraUrl ? (
        <a name="pandora" href={pandoraUrl} target="_blank">
          <img src="/music-service_pandora.svg" alt="Listen on Pandora" />
        </a>
      ) : null}
      {youtubeUrl ? (
        <a name="youtube" href={youtubeUrl} target="_blank">
          <img src="/music-service_youtube.svg" alt="Listen on Youtube" />
        </a>
      ) : null}
      {deezerUrl ? (
        <a
          name="deezer"
          href={deezerUrl}
          target="_blank"
          className={styles.mobileHide}
        >
          <img src="/music-service_deezer.svg" alt="Listen on Deezer" />
        </a>
      ) : null}
      {tidalUrl ? (
        <a
          name="tidal"
          href={tidalUrl}
          target="_blank"
          className={styles.mobileHide}
        >
          <img src="/music-service_tidal.svg" alt="Listen on Tidal" />
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
          <img src="/music-service_bandcamp.svg" alt="Download on Bandcamp" />
        </a>
      ) : null}
      {iTunesStoreUrl ? (
        <a
          name="itunes"
          href={iTunesStoreUrl}
          target="_blank"
          className={styles.mobileHide}
        >
          <img src="/music-service_itunes.svg" alt="Download on iTunes Store" />
        </a>
      ) : null}
      {amazonStoreUrl ? (
        <a
          name="Amazon Store"
          href={amazonStoreUrl}
          target="_blank"
          className={styles.mobileHide}
        >
          <img
            src="/music-service_amazonmp3.svg"
            alt="Download on Amazon Store"
          />
        </a>
      ) : null}
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
