// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[CourseObjectAdmin]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT Courses.*, (group_concat(DISTINCT AttendedCourses.UserId)) Attends, (group_concat(DISTINCT Users.UserId, ":", Users.FirstName, " ", Users.Lastname)) Students, CourseDepartments.DepartmentId, Departments.BodyPart, (group_concat(DISTINCT InstructedCourses.InstructorId)) Instructors, Facilities.Name as FacilityName
        FROM Courses
        LEFT JOIN AttendedCourses ON Courses.CourseId=AttendedCourses.CourseId
        LEFT JOIN Users ON AttendedCourses.UserId = Users.UserId
        LEFT JOIN CourseDepartments ON Courses.CourseId=CourseDepartments.CourseId
        LEFT JOIN InstructedCourses ON Courses.CourseId = InstructedCourses.CourseId
        INNER JOIN Departments ON CourseDepartments.DepartmentId = Departments.DepartmentId
        INNER JOIN Facilities ON Courses.FacilityId=Facilities.FacilityId
        GROUP BY Courses.CourseId, CourseDepartments.DepartmentId;;`,
      values: "",
    });
    const results: [CourseObjectAdmin] = queryDb;
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
