import Icon from "./icon";

export default ({ link }) => (
  <Icon
    href={`https://www.snapchat.com/scan?attachmentUrl=${link}`}
    backgroundColor="#FFFC00"
    src="/share/snapchat.svg"
    alt="share on snapchat"
    text="Snapchat"
    target={"_blank"}
  />
);
