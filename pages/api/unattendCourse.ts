// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";

type Body = {
  UserId: number;
  CourseId: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `DELETE FROM attended_courses WHERE CourseId = ${body.CourseId} AND UserId =${body.UserId};`,
      values: "",
    });

    if (queryDb.affectedRows == 1) {
      res.status(200).send("success");
    } else {
      res.status(500).send("error");
    }
  } catch (error) {
    console.log(error);
  }
}
