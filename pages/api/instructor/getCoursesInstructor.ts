// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[CourseObjectAdmin]>) {
  try {
    const body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `SELECT courses.*,
    (group_concat(DISTINCT attended_courses.UserId)) Attends,
    (
        group_concat(
            DISTINCT users.UserId,
            ";",
            users.FirstName,
            " ",
            users.Lastname,
            CASE
                WHEN grades.Grade IS NULL THEN " Grade: Not Set"
                ELSE concat(" Grade: ", grades.Grade)
            END
        )
    ) Students, course_departments.DepartmentId, departments.BodyPart, (group_concat(DISTINCT instructed_courses.InstructorId)) Instructors, facilities.Name as FacilityName
FROM courses
LEFT JOIN attended_courses ON courses.CourseId = attended_courses.CourseId
LEFT JOIN users ON attended_courses.UserId = users.UserId
LEFT JOIN course_departments ON courses.CourseId=course_departments.CourseId
INNER JOIN instructed_courses ON courses.CourseID = instructed_courses.CourseID
INNER JOIN departments ON course_departments.DepartmentId = departments.DepartmentId
INNER JOIN facilities ON courses.FacilityId=facilities.FacilityId
LEFT JOIN grades ON courses.CourseID = grades.CourseID
AND users.UserId = grades.UserId
WHERE instructed_courses.InstructorId = ${body.InstructorId}
GROUP BY courses.CourseId, course_departments.DepartmentId, departments.BodyPart;`,
      values: "",
    });
    const results: [CourseObjectAdmin] = queryDb;

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
