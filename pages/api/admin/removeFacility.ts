// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

type Body = {
  id: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `DELETE FROM Facilities WHERE FacilityId = ${body.id};`,
      values: "",
    });

    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("error");
  }
}
