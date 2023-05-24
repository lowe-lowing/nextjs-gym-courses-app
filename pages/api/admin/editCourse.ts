// Next.js API route support: https://nextjs.org/docs/api-routes/introductionhandleSubmit
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

type Body = {
  CourseId: number;
  Name: string;
  Description: string;
  MaxAttendants: number;
  StartTime: string;
  Endtime: string;
  EveryWeek: number;
  removedStudents: number[];
  DepartmentId: number;
  InstructorsChanged: boolean;
  PrevInstructorsIds: Array<string>;
  InstructorsIds: Array<string>;
  FacilityId: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);
    let q = `UPDATE courses SET Name = '${body.Name}', Description = '${body.Description}', MaxAttendants = ${
      body.MaxAttendants
    }, StartTime = '${body.StartTime}', Endtime = '${body.Endtime}', EveryWeek = ${body.EveryWeek}, FacilityId = ${
      body.FacilityId || 0
    } WHERE CourseId = ${body.CourseId}; UPDATE course_departments SET DepartmentId = '${
      body.DepartmentId
    }' WHERE CourseId = ${body.CourseId}; `;

    body.removedStudents.forEach((studentId) => {
      q += `DELETE FROM attended_courses WHERE CourseId = ${body.CourseId} AND UserId = ${studentId}; `;
    });

    if (body.InstructorsChanged) {
      body.InstructorsIds.forEach((InstructorsId) => {
        if (body.PrevInstructorsIds.indexOf(InstructorsId) == -1) {
          q += `INSERT INTO instructed_courses (CourseId, InstructorId) VALUES (${body.CourseId}, ${parseInt(
            InstructorsId
          )});`;
        }
      });
      body.PrevInstructorsIds.forEach((prevInstructorId) => {
        if (body.InstructorsIds.indexOf(prevInstructorId) == -1) {
          q += `DELETE FROM instructed_courses WHERE CourseId = ${body.CourseId} AND InstructorId = ${parseInt(
            prevInstructorId
          )};`;
        }
      });
    }

    const queryDb = await excuteQuery({
      query: q,
      values: "",
    });

    if (queryDb.affectedRows == 1 || queryDb[0].affectedRows == 1) {
      res.status(200).json(queryDb);
    } else {
      res.status(500).json(queryDb);
    }
  } catch (error) {
    console.log(error);
  }
}
