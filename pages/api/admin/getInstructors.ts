// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<[StudentsAdmin]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT Users.*
        FROM Instructors
        INNER JOIN Users ON Users.UserId = Instructors.UserId`,
      values: "",
    });
    if (queryDb.length > 0) {
      res.status(200).json(queryDb);
    } else {
      res.status(500).json(queryDb);
    }
  } catch (error) {
    console.log(error);
  }
}
