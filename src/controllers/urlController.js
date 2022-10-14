import connection from "../db.js";
import { nanoid } from "nanoid";

export async function postShortlyURL(req, res) {
  try {
    if (new URL(req.body.url)) {
      const shortUrl = nanoid(10);
      await connection.query(
        `INSERT INTO urls ("userId", url, "shortUrl", "visitCount") VALUES ($1, $2, $3, $4);`,
        [res.locals.user, req.body.url, shortUrl, 0]
      );
      res.status(201).send({ shortUrl });
    }
  } catch (error) {
    res.status(422).send(error.message);
  }
}

export async function getUniqueUrl(req, res) {
  const { id } = req.params;

  try {
    const url = await connection.query(
      `SELECT id,"shortUrl",url FROM urls WHERE id=$1;`,
      [id]
    );
    if (!url.rows[0]) {
      res.sendStatus(404);
      return;
    }
    res.status(200).send(url.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export async function getUniqueShorten(req, res) {
  const shorten = req.params.shortUrl;

  try {
    const realUrl = await connection.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1;`,
      [shorten]
    );
    if (!realUrl.rows[0]) {
      res.sendStatus(404);
      return;
    }

    await connection.query(
      `UPDATE urls set "visitCount" = $1 WHERE "shortUrl" = $2;`,
      [realUrl.rows[0].visitCount + 1, shorten]
    );
    res.redirect(realUrl.rows[0].url);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;

  try {
    const promisse = await connection.query(
      "SELECT * FROM urls WHERE id = $1",
      [id]
    );
    if (!promisse.rows[0]) {
      res.sendStatus(404);
      return;
    }

    if (promisse.rows[0].userId === res.locals.user) {
      await connection.query("DELETE FROM urls WHERE id = $1", [id]);
      res.sendStatus(204);
      return;
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}
