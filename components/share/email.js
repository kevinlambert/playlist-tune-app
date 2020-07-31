import Icon from "./icon";

export default ({ subject, body }) => (
  <Icon
    href={`mailto:?subject=${subject}&body=${body}`}
    backgroundColor="rgb(88, 88, 88)"
    src="/share/email.svg"
    alt="share by email"
    text="Email"
  />
);
