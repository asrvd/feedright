import { aw, Server } from "@/server/db/appwrite";
import type { NextApiRequest, NextApiResponse } from "next";
import { Query } from "appwrite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { widgetID } = req.query;

    if (typeof widgetID === "string") {
      const widgets = await aw.database.listDocuments(
        Server.databaseID as string,
        Server.feedbackCollectionID as string,
        [Query.equal("widget_id", [widgetID])]
      );
      res.status(200).json(widgets);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}