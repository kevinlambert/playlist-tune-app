import getConfig from "next/config";
import { sesSendEmail } from "../../../../services/aws";
import { smtpSendEmail } from "../../../../services/smtp";
import { sendGridSendEmail } from "../../../../services/sendgrid";
import { isEmailBlocked } from "../../../../services/mongo";
import {
  CONST_MAILER_AWSSES,
  CONST_MAILER_SMTP,
  CONST_MAILER_SENDGRID,
} from "../../../../services/constants";
import {
  htmlMessageBody,
  textMessageBody,
  subject,
  callToActionHref,
} from "../../../../components/email/template";

const {
  publicRuntimeConfig: { urls },
  serverRuntimeConfig: { mail },
} = getConfig();

const formatEmailAddress = ({ name, address }) => `"${name}" <${address}>`;

const blockUrl = (toEmail) => `${urls.block}${encodeURI(toEmail)}`;

export default async (req, res) => {
  const { fromName, fromEmail, toName, toEmail, toMessage } = req.body;

  const data = await isEmailBlocked(toEmail);

  if (data.isBlocked) {
    res.status(400).json({
      error: true,
      isBlocked: true,
    });
  } else {
    const htmlBody = htmlMessageBody({
      fromName,
      fromEmail,
      toName,
      toMessage,
      blockUrl: blockUrl(toEmail),
      callToActionHref,
    });

    const textBody = textMessageBody({
      fromName,
      fromEmail,
      toName,
      toMessage,
      blockUrl: blockUrl(toEmail),
      callToActionHref,
    });

    const mailData = {
      from: formatEmailAddress({
        name: "Playlist Tune",
        address: mail.playlistTuneEmail,
      }),
      replyTo: formatEmailAddress({ name: fromName, address: fromEmail }),
      to: formatEmailAddress({ name: toName, address: toEmail }),
      subject: subject(fromName),
      text: textBody, // plain text body
      html: htmlBody, // html body
    };

    if (mail.mailer === CONST_MAILER_SMTP) {
      smtpSendEmail(mailData);
    } else if (mail.mailer === CONST_MAILER_AWSSES) {
      sesSendEmail(mailData).catch(console.error);
    } else if (mail.mailer === CONST_MAILER_SENDGRID) {
      sendGridSendEmail(mailData);
    }

    res.status(200).json({ success: true });
  }
};
