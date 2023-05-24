// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Facility[]>) {
  try {
    const queryDb = await excuteQuery({
      query: `SELECT * FROM facilities ORDER BY facilities.Name;`,
      values: "",
    });

    const result: Facility[] = queryDb;
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
