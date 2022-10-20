// Next.js API route support: https://nextjs.org/docs/api-routes/introductionhandleSubmit
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";

type Body = {
  CourseId: number;
  Name: string;
  Description: string;
  MaxAttendants: number;
  StartTime: string;
  Endtime: string;
  removedStudents: number[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);
    let q = `UPDATE Courses SET Name = '${body.Name}', Description = '${body.Description}', MaxAttendants = ${body.MaxAttendants}, StartTime = '${body.StartTime}', Endtime = '${body.Endtime}' WHERE CourseId = ${body.CourseId};`;

    body.removedStudents.forEach((studentId) => {
      q += `DELETE FROM AttendedCourses WHERE CourseId = ${body.CourseId} AND UserId = ${studentId};`;
    });

    const queryDb = await excuteQuery({
      query: q,
      values: "",
    });
    console.log(queryDb);

    if (queryDb.affectedRows == 1 || queryDb[0].affectedRows == 1) {
      res.status(200).json(queryDb);
    } else {
      res.status(500);
    }
  } catch (error) {
    console.log(error);
  }
}
