import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `SELECT users.*, CASE WHEN Admins.UserId IS NULL THEN 0 ELSE 1 END IsAdmin, CASE WHEN Instructors.UserId IS NULL THEN 0 ELSE 1 END IsInstructor
      FROM users
      LEFT JOIN Admins ON users.UserId = Admins.UserId
      LEFT JOIN Instructors ON Instructors.UserId=users.UserId
      WHERE Email = '${body.Email}' and Password = '${body.Password}'`,
      values: "",
    });

    if (queryDb.length == 1) {
      req.session.user = queryDb[0];
      await req.session.save();
      res.status(200).json(queryDb);
    } else {
      res.status(401).json({ message: "wrong login" });
    }
  } catch (error) {
    console.log(error);
  }
}
