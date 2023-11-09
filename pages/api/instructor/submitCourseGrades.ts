// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[StudentGrade] | any>) {
  try {
    const body = JSON.parse(req.body) as CourseGradeBody;
    let q: string = "";

    body.Grades.forEach((grade: CourseGrade) => {
      q += `INSERT INTO grades (CourseId, UserId, Grade) VALUES(${grade.CourseId}, ${body.UserId}, '${grade.Grade}') ON DUPLICATE KEY UPDATE CourseId=${grade.CourseId}, UserId=${body.UserId}, Grade='${grade.Grade}'; `;
    });

    const queryDb = await excuteQuery({
      query: q,
      values: "",
    });

    res.status(200).json(queryDb);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
