// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[StudentsInstructor]>) {
  try {
    const body = JSON.parse(req.body);
    const queryDb = await excuteQuery({
      query: `SELECT Users.*, (group_concat(DISTINCT Courses.CourseId, ":", Courses.Name)) Attends
        FROM Courses
        LEFT JOIN AttendedCourses ON Courses.CourseId = AttendedCourses.CourseId
        LEFT JOIN Users ON AttendedCourses.UserId = Users.UserId
        INNER JOIN InstructedCourses ON Courses.CourseID = InstructedCourses.CourseID
        WHERE InstructedCourses.InstructorId = ${body.InstructorId}
        GROUP BY Users.UserId;`,
      values: "",
    });

    const results: [StudentsInstructor] = queryDb;
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
