import connection from "../db.js";

export async function getUserUrls(req, res) {
  try {
    const promisse = await connection.query(
      `SELECT users.*, SUM(urls."visitCount") as "visitCount" FROM users JOIN urls ON urls."userId" = users.id WHERE users.id = $1;`,
      [res.locals.user]
    );

    const shortenUrls = await connection.query(
      `SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1;`,
      [res.locals.user]
    );

    const answer = {
      id: promisse.rows[0].id,
      name: promisse.rows[0].name,
      visitCount: promisse.rows[0].visitCount,
      shortenedUrls: shortenUrls.rows,
    };

    res.status(200).send(answer);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export async function getRanking(req, res) {
  try {
    const promisse = await connection.query(
      `SELECT users.id, users.name, COUNT(urls."userId") as "linksCount", SUM(urls."visitCount") as "visitCount" FROM urls LEFT JOIN users ON shortenedurls "userId" = users.id GROUP BY users.id ORDER BY "visitCount" ASC LIMIT 10;`
    );

    res.status(200).send(promisse.rows);
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}
