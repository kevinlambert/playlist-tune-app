// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from "@sendgrid/mail";
import logger from "../services/logger";
import getConfig from "next/config";

const {
  serverRuntimeConfig: { mail },
} = getConfig();

sgMail.setApiKey(mail.sendGridApiKey);

// $headers ="From:<$from>\n";
// $headers.="MIME-Version: 1.0\n";
// $headers.="Content-type: text/html; charset=iso 8859-1";

// $headers = "From: " .($from) . "\r\n";
// $headers .= "Reply-To: ".($from) . "\r\n";
// $headers .= "Return-Path: ".($from) . "\r\n";;
// $headers .= "MIME-Version: 1.0\r\n";
// $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
// $headers .= "X-Priority: 3\r\n";
// $headers .= "X-Mailer: PHP". phpversion() ."\r\n";

// "MIME-Version": "1.0\n",
// "Content-type": "text/html; charset=iso 8859-1",

export const sendGridSendEmail = async (mailData) => {
  try {
    // mailData.headers = {
    //   From: "noreply@playlistune.com",
    // };
    await sgMail.send(mailData);
  } catch (error) {
    logger.error(error);
  }
};
