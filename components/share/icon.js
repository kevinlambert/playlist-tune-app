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
  dataShareUrl,
  id,
  target,
}) => (
  <a
    id={id}
    href={href}
    onClick={onClick}
    data-share-url={dataShareUrl}
    className={classNames(styles.iconContainer, className)}
    target={target}
  >
    <div className={styles.icon} style={{ backgroundColor }}>
      <img src={src} alt={alt} />
    </div>
    <div className={styles.iconText}>{text}</div>
  </a>
);
