// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[CourseObjectAdmin]>) {
  try {
    const body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `SELECT Courses.*,
    (group_concat(DISTINCT AttendedCourses.UserId)) Attends,
    (
        group_concat(
            DISTINCT Users.UserId,
            ";",
            Users.FirstName,
            " ",
            Users.Lastname,
            CASE
                WHEN Grades.Grade IS NULL THEN " Grade: Not Set"
                ELSE concat(" Grade: ", Grades.Grade)
            END
        )
    ) Students
FROM Courses
    LEFT JOIN AttendedCourses ON Courses.CourseId = AttendedCourses.CourseId
    LEFT JOIN Users ON AttendedCourses.UserId = Users.UserId
    INNER JOIN InstructedCourses ON Courses.CourseID = InstructedCourses.CourseID
    LEFT JOIN Grades ON Courses.CourseID = Grades.CourseID
    AND Users.UserId = Grades.UserId
WHERE InstructedCourses.InstructorId = ${body.InstructorId}
GROUP BY Courses.CourseId;`,
      values: "",
    });
    const results: [CourseObjectAdmin] = queryDb;
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
