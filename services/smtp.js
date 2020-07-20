import nodemailer from "nodemailer";
import logger from "../services/logger";

import getConfig from "next/config";

const {
  serverRuntimeConfig: { mail },
} = getConfig();

// X-Mailer:
// Mailer:
// Return-Path:

const transporter = nodemailer.createTransport({
  host: "mail.infomaniak.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: mail.smtpUsername,
    pass: mail.smtpPassword,
  },
  list: {
    unsubscribe: {
      url: "https://playlisttune.com/block/",
    },
  },
});

export const smtpSendEmail = async (mailData) => {
  try {
    await transporter.sendMail(mailData);
  } catch (error) {
    logger.error(error);
  }
};
