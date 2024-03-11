// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";
import { ResultSetHeader } from "mysql2";

type Body = {
  Email: string;
  Password: string;
  LastName: string;
  FirstName: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = (await excuteQuery({
      query: `INSERT INTO users (Email, Password, LastName, FirstName) VALUES('${body.Email}', '${body.Password}', '${body.LastName}', '${body.FirstName}');`,
      values: "",
    })) as ResultSetHeader;

    if (queryDb.affectedRows == 1) {
      res.status(200).json(queryDb);
    } else {
      res.status(500).send("Error while creating user");
    }
  } catch (error) {
    console.log(error);
  }
}
