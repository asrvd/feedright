import { aw, Server } from "@/server/db/appwrite";
import type { NextApiRequest, NextApiResponse } from "next";
import { Query } from "appwrite";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { userID } = req.query;

    if (typeof userID === "string") {
      const widgets = await aw.database.listDocuments(
        Server.databaseID as string,
        Server.widgetCollectionID as string,
        [Query.equal("user_id", ["test"])]
      );
      res.status(200).json(widgets);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}
