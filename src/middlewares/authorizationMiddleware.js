import connection from "../db.js";

async function privateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  const session = await connection.query(
    "SELECT * FROM sessions WHERE token = $1",
    [token]
  );
  if (session.rows.length === 0) return res.sendStatus(401);

  res.locals.user = session.rows[0].userId;
  next();
}

export default privateToken;
