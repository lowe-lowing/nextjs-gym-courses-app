// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";
import { sessionOptions } from "../../lib/session";
import { ResultSetHeader } from "mysql2";

type Body = {
  UserId: number;
  pfpUrl: string;
};

export default withIronSessionApiRoute(pfphandler, sessionOptions);

async function pfphandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = (await excuteQuery({
      query: `UPDATE users SET ProfilePicture = '${body.pfpUrl}' WHERE UserId = ${body.UserId};`,
      values: "",
    })) as ResultSetHeader;

    if (queryDb.affectedRows == 1) {
      if (req.session.user != undefined) {
        req.session.user.ProfilePicture = body.pfpUrl;
        await req.session.save();
      }
      res.status(200).send("success");
    } else {
      res.status(500).send("error");
    }
  } catch (error) {
    console.log(error);
  }
}
