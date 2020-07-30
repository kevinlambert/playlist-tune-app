import WhatsApp from "./whatsapp";
import FacebookMessenger from "./facebookMessenger";
import Email from "./email";
import Sms from "./sms";
import { CONST_PERSONAL_MESSAGE_NONE } from "../../services/constants";
import getConfig from "next/config";
import styles from "./share.module.scss";

const {
  publicRuntimeConfig: { productionServerAddress },
} = getConfig();

export const receiverUrl = (
  { fromName, toName, msg = CONST_PERSONAL_MESSAGE_NONE },
  noEncode
) => {
  const url = `${productionServerAddress}/receiver?fromName=${fromName}&toName=${toName}&msg=${msg}`;
  return noEncode ? url : encodeURIComponent(url);
};

export const title = ({ toName }) =>
  `Hey ${toName}, I want to slip a song into your playlist`;

export const slipMessage = ({ fromName, toName, msg }, noEncode) => {
  return (
    encodeURIComponent(`Hey ${toName},\r
I want to slip a song into your playlist.
\r`) + receiverUrl({ fromName, toName, msg })
  );
};

export default ({ fromName, toName, msg }) => (
  <div className={styles.container}>
    <WhatsApp message={slipMessage({ fromName, toName, msg })} />
    <FacebookMessenger link={receiverUrl({ fromName, toName, msg })} />
    <Sms message={slipMessage({ fromName, toName, msg })} />
    <Email
      body={slipMessage({ fromName, toName, msg }, true)}
      subject={title({ toName })}
    />
  </div>
);
