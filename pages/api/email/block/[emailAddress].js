import { insertBlockedEmail } from "../../../../services/mongo";

export default async (req, res) => {
  try {
    const {
      query: { emailAddress },
    } = req;

    const data = await insertBlockedEmail(emailAddress);

    res.status(200).end();
  } catch (error) {
    res.status(400).send(error);
  }
};
