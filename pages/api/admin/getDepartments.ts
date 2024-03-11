// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Department[]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT departments.DepartmentId, departments.BodyPart FROM departments ORDER BY departments.DepartmentId;`,
      values: "",
    });

    const results = queryDb as Department[];
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
  }
}
