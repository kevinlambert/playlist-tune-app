import styles from "./share.module.scss";

const appId = "316791766169633";
const redirect_uri = encodeURIComponent("https://playlisttune.com");

export default ({ link }) => (
  <>
    <a
      href={`fb-messenger://share/?link=&${link}&app_id=${appId}”`}
      className={`${styles.icon} ${styles.deviceOnly}`}
      style={{ backgroundColor: "rgb(0, 132, 255)" }}
    >
      <img src="/share/messenger.svg" alt="share on facebook messenger" />
    </a>
    <a
      href={`https://www.facebook.com/dialog/send?app_id=${appId}&link=${link}&redirect_uri=${redirect_uri}`}
      target="_blank"
      className={`${styles.icon} ${styles.desktopOnly}`}
      style={{ backgroundColor: "rgb(0, 132, 255)" }}
    >
      <img src="/share/messenger.svg" alt="share on facebook messenger" />
    </a>
  </>
);
