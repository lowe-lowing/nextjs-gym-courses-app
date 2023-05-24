// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[StudentsAdmin]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT users.*, (group_concat(DISTINCT Courses.CourseId, ":", Courses.Name, "grade", CASE WHEN Grades.Grade IS NULL THEN 0 ELSE Grades.Grade END)) Attends, CASE WHEN Admins.UserId IS NULL THEN 0 ELSE 1 END IsAdmin, CASE WHEN Instructors.UserId IS NULL THEN 0 ELSE 1 END IsInstructor
        FROM users
        LEFT JOIN Admins ON users.UserId = Admins.UserId
        LEFT JOIN AttendedCourses ON AttendedCourses.UserId=users.UserId
        LEFT JOIN Courses ON AttendedCourses.CourseId = Courses.CourseId
        LEFT JOIN Grades ON Grades.CourseId = Courses.CourseId AND Grades.UserId = users.UserId
        LEFT JOIN Instructors ON Instructors.UserId=users.UserId
        GROUP BY users.UserId;`,
      values: "",
    });
    const results: [StudentsAdmin] = queryDb;
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
