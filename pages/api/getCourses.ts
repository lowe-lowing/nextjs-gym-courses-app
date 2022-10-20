// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[CourseObject]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT Courses.*, (group_concat(DISTINCT AttendedCourses.UserId)) Attends
        FROM Courses
        LEFT JOIN AttendedCourses ON Courses.CourseId=AttendedCourses.CourseId
        GROUP BY Courses.CourseId;`,
      values: "",
    });
    const results: [CourseObject] = queryDb;
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
