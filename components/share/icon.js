import styles from "./share.module.scss";
import classNames from "classnames";

export default ({
  onClick,
  className,
  href,
  backgroundColor,
  src,
  alt,
  text,
}) => (
  <a
    href={href}
    onClick={onClick}
    className={classNames(styles.iconContainer, className)}
  >
    <div className={styles.icon} style={{ backgroundColor }}>
      <img src={src} alt={alt} />
    </div>
    <div className={styles.iconText}>{text}</div>
  </a>
);
