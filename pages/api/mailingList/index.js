import { subscribeConvertKit } from "../../../services/mailingList/index";

export default async (req, res) => {
  try {
    const {
      query: { name, emailAddress },
    } = req;

    const data = await subscribeConvertKit({ name, email: emailAddress });

    res.status(200).end();
  } catch (error) {
    res.status(400).send(error);
  }
};
