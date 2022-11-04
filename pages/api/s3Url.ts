// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import generateUploadUrl from "../../lib/s3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = await generateUploadUrl();
    res.send({ url });
  } catch (error) {
    console.log(error);
  }
}
