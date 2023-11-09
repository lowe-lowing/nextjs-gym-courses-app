// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[StudentGrade] | any>) {
  try {
    const body = JSON.parse(req.body) as GradeBody;
    let q: string = "";

    body.Grades.forEach((grade: StudentGrade) => {
      q += `INSERT INTO grades (CourseId, UserId, Grade) VALUES(${body.CourseId}, ${grade.UserId}, '${grade.Grade}') ON DUPLICATE KEY UPDATE CourseId=${body.CourseId}, UserId=${grade.UserId}, Grade='${grade.Grade}'; `;
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
