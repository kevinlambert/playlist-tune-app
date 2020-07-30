import styles from "./share.module.scss";

export default ({ message }) => (
  <a
    href={`whatsapp://send?text=${message}`}
    className={styles.icon}
    style={{ backgroundColor: "rgb(77, 194, 71)" }}
  >
    <img src="/share/whatsapp.svg" alt="share on whatsapp" />
  </a>
);
