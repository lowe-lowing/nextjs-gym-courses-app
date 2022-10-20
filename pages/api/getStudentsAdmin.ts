// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[CourseObject]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT Users.*, (group_concat(DISTINCT Courses.CourseId, ":", Courses.Name)) Attends
        FROM Users
        LEFT JOIN AttendedCourses ON AttendedCourses.UserId=Users.UserId
        LEFT JOIN Courses ON AttendedCourses.CourseId = Courses.CourseId
        GROUP BY Users.UserId;`,
      values: "",
    });
    const results: [CourseObject] = queryDb;
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
