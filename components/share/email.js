import styles from "./share.module.scss";

export default ({ subject, body }) => (
  <a
    href={`mailto:?subject=${subject}&body=${body}`}
    className={styles.icon}
    style={{ backgroundColor: "rgb(88, 88, 88)" }}
  >
    <img src="/share/email.svg" alt="share by email" />
  </a>
);
