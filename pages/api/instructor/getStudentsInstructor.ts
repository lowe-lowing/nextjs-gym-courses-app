// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[StudentsInstructor]>) {
  try {
    const body = JSON.parse(req.body);
    const queryDb = await excuteQuery({
      query: `SELECT users.*, (group_concat(DISTINCT courses.CourseId, ":", courses.Name)) Attends
        FROM courses
        LEFT JOIN attended_courses ON courses.CourseId = attended_courses.CourseId
        LEFT JOIN users ON attended_courses.UserId = users.UserId
        INNER JOIN instructed_courses ON courses.CourseID = instructed_courses.CourseID
        WHERE instructed_courses.InstructorId = ${body.InstructorId}
        GROUP BY users.UserId;`,
      values: "",
    });

    const results: [StudentsInstructor] = queryDb;
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
