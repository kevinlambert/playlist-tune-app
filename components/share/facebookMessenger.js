import styles from "./share.module.scss";
import Icon from "./icon";

const appId = "316791766169633";
const redirect_uri = encodeURIComponent("https://playlisttune.com");

export default ({ link }) => (
  <>
    <Icon
      href={`fb-messenger://share/?app_id=${appId}&link=${link}&redirect_uri=${redirect_uri}`}
      className={styles.deviceOnly}
      backgroundColor="rgb(0, 132, 255)"
      src="/share/messenger.svg"
      alt="share on facebook messenger"
      text="Facebook Messenger"
    />
    <Icon
      href={`https://www.facebook.com/dialog/send?app_id=${appId}&link=${link}&redirect_uri=${redirect_uri}`}
      backgroundColor="rgb(0, 132, 255)"
      src="/share/messenger.svg"
      alt="share on facebook messenger"
      text="Facebook Messenger"
      className={styles.desktopOnly}
    />
  </>
);
