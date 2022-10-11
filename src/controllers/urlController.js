import shortlySchema from "../middlewares/schemas/urlSchema.js";

export async function shortlyURL(req, res) {
  const validation = shortlySchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res
      .status(422)
      .send(validation.error.details.map((value) => value.message));
    return;
  }
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}
