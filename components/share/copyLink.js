import Icon from "./icon";

const copyLink = (e) => {
  var copyText = document.getElementById("COPY_SHARE_LINK_ID");
  copyText.style.display = "block";

  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
};

export default ({ message }) => (
  <Icon
    onClick={copyLink}
    backgroundColor="#0070f3"
    src="/share/link.svg"
    alt="copy the link"
    text="Copy Link"
  />
);
