// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<StudentsAdmin[]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT users.*, (group_concat(DISTINCT courses.CourseId, ":", courses.Name, "grade", CASE WHEN grades.Grade IS NULL THEN 0 ELSE grades.Grade END)) Attends, CASE WHEN admins.UserId IS NULL THEN 0 ELSE 1 END IsAdmin, CASE WHEN instructors.UserId IS NULL THEN 0 ELSE 1 END IsInstructor
        FROM users
        LEFT JOIN admins ON users.UserId = admins.UserId
        LEFT JOIN attended_courses ON attended_courses.UserId=users.UserId
        LEFT JOIN courses ON attended_courses.CourseId = courses.CourseId
        LEFT JOIN grades ON grades.CourseId = courses.CourseId AND grades.UserId = users.UserId
        LEFT JOIN instructors ON instructors.UserId=users.UserId
        GROUP BY users.UserId;`,
      values: "",
    });
    const results = queryDb as StudentsAdmin[];
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
