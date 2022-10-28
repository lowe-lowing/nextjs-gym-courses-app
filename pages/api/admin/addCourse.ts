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
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `INSERT INTO Courses (Name, Description, MaxAttendants, StartTime, Endtime, EveryWeek) VALUES('${body.Name}', '${body.Description}', ${body.MaxAttendants}, '${body.StartTime}', '${body.Endtime}', ${body.EveryWeek});`,
      values: "",
    });

    if (queryDb.affectedRows == 1) {
      res.status(200).json(queryDb);
    } else {
      res.status(500);
    }
  } catch (error) {
    console.log(error);
  }
}
