import type { NextApiRequest, NextApiResponse } from "next";
import { aw, Server } from "@/server/db/appwrite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const payload = JSON.parse(req.body);
    console.log(payload);
    const widget = await aw.database.createDocument(
      Server.databaseID as string,
      Server.feedbackCollectionID as string,
      "unique()",
      payload
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(widget);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}