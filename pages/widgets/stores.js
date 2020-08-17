import getConfig from "next/config";
const {
  publicRuntimeConfig: { smartUrls },
} = getConfig();

import SmartUrlIcon from "../../components/smartUrl/smartUrlIcon";
import blankLayout from "../../components/layouts/blank";

const stores = () => (
  <html>
    <body>
      <SmartUrlIcon {...smartUrls} />
    </body>
  </html>
);

stores.Layout = blankLayout;

export default stores;
