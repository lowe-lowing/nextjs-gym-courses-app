// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[CourseObject]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT Courses.*, (group_concat(DISTINCT AttendedCourses.UserId)) Attends, (group_concat(DISTINCT Users.FirstName, " ", Users.Lastname SEPARATOR ', ')) Instructors
        FROM Courses
        LEFT JOIN AttendedCourses ON Courses.CourseId=AttendedCourses.CourseId
        LEFT JOIN InstructedCourses ON Courses.CourseId=InstructedCourses.CourseId
        LEFT JOIN Users ON Users.UserId=InstructedCourses.InstructorId
        GROUP BY Courses.CourseId;`,
      values: "",
    });
    const results: [CourseObject] = queryDb;
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
