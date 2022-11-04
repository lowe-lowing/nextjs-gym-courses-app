// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body) as EditUserBody;

    let q: string = `UPDATE Users SET Email = '${body.Email}', FirstName = '${body.FirstName}', LastName = '${body.LastName}' WHERE UserId = ${body.UserId}; `;

    if (body.LevelChanged) {
      if (body.InitLevel === 1) {
        q += `DELETE FROM Admins WHERE UserId = ${body.UserId}; `;
      } else if (body.InitLevel === 2) {
        q += `DELETE FROM Instructors WHERE UserId = ${body.UserId}; `;
      }
      if (body.Level == 1) {
        q += `INSERT INTO Admins (UserId) VALUES (${body.UserId}); `;
      } else if (body.Level == 2) {
        q += `INSERT INTO Instructors (UserId) VALUES (${body.UserId}); `;
      }
    }

    const queryDb = await excuteQuery({
      query: q,
      values: "",
    });

    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
