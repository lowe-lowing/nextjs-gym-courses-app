// Next.js API route support: https://nextjs.org/docs/api-routes/introductionhandleSubmit
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

type Body = {
  Name: string;
  Description: string;
  MaxAttendants: number;
  StartTime: string;
  Endtime: string;
  EveryWeek: number;
  DepartmentId: number;
  InstructorsIds: Array<string>;
  FacilityId: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    let q: string = `INSERT INTO Courses (Name, Description, MaxAttendants, StartTime, Endtime, EveryWeek, FacilityId) VALUES('${body.Name}', '${body.Description}', ${body.MaxAttendants}, '${body.StartTime}', '${body.Endtime}', ${body.EveryWeek}, ${body.FacilityId}); INSERT INTO CourseDepartments (CourseId, DepartmentId) VALUES(LAST_INSERT_ID(), '${body.DepartmentId}');`;

    if (body.InstructorsIds.length > 0) {
      body.InstructorsIds.forEach((InstructorId) => {
        q += `INSERT INTO InstructedCourses (CourseId, InstructorId) VALUES (LAST_INSERT_ID(), ${InstructorId});`;
      });
    }
    const queryDb = await excuteQuery({
      query: q,
      values: "",
    });
    res.status(200).json(queryDb);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}
