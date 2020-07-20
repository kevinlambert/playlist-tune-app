import logger from "../services/logger";
import aws from "aws-sdk";
import AWS_CONFIG from "../aws.config.json";

aws.config.update(AWS_CONFIG);
// aws.config.update({ region: "REGION" });

export const sesSendEmail = ({ from, replyTo, to, subject, text, html }) => {
  // Create sendEmail params
  var params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
        Text: {
          Charset: "UTF-8",
          Data: text,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: from,
    ReplyToAddresses: [replyTo],
  };

  // Create the promise and SES service object
  var sendPromise = new aws.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  return sendPromise
    .then(function (data) {
      // logger.info(data.MessageId);
    })
    .catch(function (err) {
      logger.error(err);
    });
};
