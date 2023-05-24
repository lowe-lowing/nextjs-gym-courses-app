// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body) as EditUserBody;

    let q: string = `UPDATE users SET Email = '${body.Email}', FirstName = '${body.FirstName}', LastName = '${body.LastName}' WHERE UserId = ${body.UserId}; `;

    if (body.LevelChanged) {
      if (body.InitLevel === 1) {
        q += `DELETE FROM admins WHERE UserId = ${body.UserId}; `;
      } else if (body.InitLevel === 2) {
        q += `DELETE FROM instructors WHERE UserId = ${body.UserId}; `;
      }
      if (body.Level == 1) {
        q += `INSERT INTO admins (UserId) VALUES (${body.UserId}); `;
      } else if (body.Level == 2) {
        q += `INSERT INTO instructors (UserId) VALUES (${body.UserId}); `;
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
