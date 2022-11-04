import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    req.session.destroy();
    req.session.save();
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log(error);
  }
}
