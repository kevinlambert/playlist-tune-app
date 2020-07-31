import WhatsApp from "./whatsapp";
import FacebookMessenger from "./facebookMessenger";
import Email from "./email";
import Sms from "./sms";
import CopyLink from "./copyLink";
import { CONST_PERSONAL_MESSAGE__NONE } from "../../services/constants";
import getConfig from "next/config";
import styles from "./share.module.scss";

const {
  publicRuntimeConfig: { productionServerAddress },
} = getConfig();

export const receiverUrl = ({ fromName, toName, msg = 0 }, noEncode) => {
  const url = `${productionServerAddress}/receiver?msg=${msg}`;
  return noEncode ? url : encodeURIComponent(url);
};

export const title = ({ toName }) => `Hey, I'm sending you a song message`;

export const slipMessage = ({ fromName, toName, msg }, noEncode) => {
  return (
    encodeURIComponent(`Hey ${toName}\r
I want to slip a song into your playlist.
\r`) + receiverUrl({ fromName, toName, msg })
  );
};

export default ({
  fromName = "",
  toName = "",
  msg = CONST_PERSONAL_MESSAGE__NONE,
}) => (
  <div>
    <div className={styles.container}>
      <WhatsApp message={slipMessage({ fromName, toName, msg }, true)} />
      <FacebookMessenger link={receiverUrl({ fromName, toName, msg })} />
      <Sms message={slipMessage({ fromName, toName, msg })} />
      <Email
        body={slipMessage({ fromName, toName, msg }, true)}
        subject={title({ toName })}
      />
      <CopyLink />
    </div>
    <input
      style={{ display: "none" }}
      readOnly
      className={styles.copyShareLink}
      id="COPY_SHARE_LINK_ID"
      type="text"
      value={receiverUrl({ msg }, true)}
    />
  </div>
);
