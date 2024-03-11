// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `UPDATE facilities SET City = '${body.city}', Address = '${body.address}', Name = '${body.name}' WHERE FacilityId = ${body.facilityId};`,
      values: "",
    });

    res.status(200).send("success");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
