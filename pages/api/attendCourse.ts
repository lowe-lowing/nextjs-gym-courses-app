// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";
import { ResultSetHeader } from "mysql2";

type Body = {
  UserId: number;
  CourseId: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = (await excuteQuery({
      query: `INSERT INTO attended_courses (CourseId, UserId) VALUES(${body.CourseId}, ${body.UserId});`,
      values: "",
    })) as ResultSetHeader;

    if (queryDb.affectedRows == 1) {
      res.status(200).send("success");
    } else {
      res.status(500).send("error");
    }
  } catch (error) {
    console.log(error);
  }
}
