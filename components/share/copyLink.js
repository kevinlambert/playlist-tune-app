import styles from "./share.module.scss";

const copyLink = (e) => {
  var copyText = document.getElementById("COPY_SHARE_LINK_ID");
  copyText.style.display = "block";

  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
};

export default ({ message }) => (
  <a
    onClick={copyLink}
    className={styles.icon}
    style={{ backgroundColor: "#0070f3" }}
  >
    <img src="/share/link.svg" alt="copy link" />
  </a>
);
