import Icon from "./icon";

export default ({ message }) => (
  <Icon
    href={`whatsapp://send?text=${message}`}
    backgroundColor="rgb(77, 194, 71)"
    src="/share/whatsapp.svg"
    alt="share on whatsapp"
    text="WhatsApp"
  />
);
