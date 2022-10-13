import connection from "../db.js";
import {
  signUpSchema,
  signInSchema,
} from "../middlewares/schemas/authSchema.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const validation = signUpSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res
      .status(422)
      .send(validation.error.details.map((value) => value.message));
    return;
  }
  try {
    const promisse = await connection.query(
      "SELECT * FROM users WHERE email=$1;",
      [req.body.email]
    );
    if (promisse.rows.length === 0) {
      const cryptPassword = bcrypt.hashSync(req.body.password, 10);
      await connection.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
        [req.body.name, req.body.email, cryptPassword]
      );
      res.sendStatus(201);
      return;
    } else {
      res.sendStatus(409);
      return;
    }
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export async function signIn(req, res) {
  const validation = signInSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res
      .status(422)
      .send(validation.error.details.map((value) => value.message));
    return;
  }
  try {
    const promisse = await connection.query(
      "SELECT * FROM users WHERE email=$1;",
      [req.body.email]
    );

    if (
      promisse.rows[0].email &&
      bcrypt.compareSync(req.body.password, promisse.rows[0].password)
    ) {
      const token = uuid();
      await connection.query(
        `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,
        [promisse.rows[0].id, token]
      );
      res.status(200).send({ token: token });
      return;
    } else {
      res.sendStatus(401);
      return;
    }
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}
