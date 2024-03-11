// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<CourseObject[]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT courses.*, (group_concat(DISTINCT attended_courses.UserId)) Attends, (group_concat(DISTINCT users.FirstName, " ", users.Lastname SEPARATOR ', ')) Instructors, course_departments.DepartmentId, departments.BodyPart, facilities.Name as FacilityName
        FROM courses
        LEFT JOIN attended_courses ON courses.CourseId=attended_courses.CourseId
        LEFT JOIN instructed_courses ON courses.CourseId=instructed_courses.CourseId
        LEFT JOIN users ON users.UserId=instructed_courses.InstructorId
        LEFT JOIN course_departments ON courses.CourseId=course_departments.CourseId
        INNER JOIN departments ON course_departments.DepartmentId = departments.DepartmentId
        INNER JOIN facilities ON courses.FacilityId=facilities.FacilityId
        GROUP BY courses.CourseId, course_departments.DepartmentId, departments.BodyPart;`,
      values: "",
    });

    const results = queryDb as CourseObject[];
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
