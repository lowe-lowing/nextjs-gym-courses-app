// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";

type Body = {
  Email: string;
  Password: string;
  LastName: string;
  FirstName: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `INSERT INTO Users (Email, Password, LastName, FirstName) VALUES('${body.Email}', '${body.Password}', '${body.LastName}', '${body.FirstName}');`,
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
