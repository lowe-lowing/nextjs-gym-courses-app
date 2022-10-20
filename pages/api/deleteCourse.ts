// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";

type Body = {
  CourseId: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `SET FOREIGN_KEY_CHECKS=0; DELETE FROM Courses WHERE CourseId = ${body.CourseId}; DELETE FROM AttendedCourses WHERE CourseId = ${body.CourseId}; SET FOREIGN_KEY_CHECKS=1;`,
      values: "",
    });

    if (queryDb[1].affectedRows == 1) {
      res.status(200).send("success");
    } else {
      res.status(500).send("error");
    }
  } catch (error) {
    console.log(error);
  }
}
