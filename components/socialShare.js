import { Facebook, Twitter } from "react-social-sharing";

export default () => {
  return (
    <div style={{ "align-self": "flex-end" }}>
      <Facebook solid small link="https://playlisttune.com" />
      <Twitter solid small link="https://playlisttune.com" />
    </div>
  );
};
