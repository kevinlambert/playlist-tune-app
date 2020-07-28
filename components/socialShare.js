import styles from "./socialShare.module.scss";

import { Facebook, Twitter } from "react-social-sharing";

export default () => {
  return (
    <div className={styles.container}>
      <Facebook solid small link="https://playlisttune.com" />
      <Twitter solid small link="https://playlisttune.com" />
    </div>
  );
};
