// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[StudentsAdmin]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT Users.*, (group_concat(DISTINCT Courses.CourseId, ":", Courses.Name)) Attends, CASE WHEN Admins.UserId IS NULL THEN 0 ELSE 1 END IsAdmin, CASE WHEN Instructors.UserId IS NULL THEN 0 ELSE 1 END IsInstructor
        FROM Users
        LEFT JOIN Admins ON Users.UserId = Admins.UserId
        LEFT JOIN AttendedCourses ON AttendedCourses.UserId=Users.UserId
        LEFT JOIN Courses ON AttendedCourses.CourseId = Courses.CourseId
        LEFT JOIN Instructors ON Instructors.UserId=Users.UserId
        GROUP BY Users.UserId;`,
      values: "",
    });
    const results: [StudentsAdmin] = queryDb;
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
