import connection from "../db.js";
import { signUpSchema } from "../middlewares/schemas/authSchema.js";
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
      "SELECT * FROM users WHERE email=$1",
      [req.body.email]
    );
    if (promisse.rows.length === 0) {
      const cryptPassword = bcrypt.hashSync(req.body.password, 10);
      await connection.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
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
  try {
    res.send("rota para fazer login");
    return;
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}
