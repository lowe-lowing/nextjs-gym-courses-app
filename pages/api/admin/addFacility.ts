// Next.js API route support: https://nextjs.org/docs/api-routes/introductionhandleSubmit
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../../lib/db";

type Body = {
  City: string;
  Address: string;
  Name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `INSERT INTO facilities (City, Address, Name) VALUES ('${body.City}', '${body.Address}', '${body.Name}'); SELECT LAST_INSERT_ID() as lastId;`,
      values: "",
    });

    res.status(200).json(queryDb);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}
