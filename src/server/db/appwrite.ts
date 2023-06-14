import { Client as Appwrite, Account, Databases, Storage } from "appwrite";

export const Server = {
    endpoint: "https://cloud.appwrite.io/v1",
    project: process.env.NEXT_PUBLIC_PROJECT_ID,
    widgetCollectionID: process.env.NEXT_PUBLIC_WIDGET_COLLECTION_ID,
    feedbackCollectionID: process.env.NEXT_PUBLIC_FEEDBACK_COLLECTION_ID,
    databaseID: process.env.NEXT_PUBLIC_DATABASE_ID,
    bucketID: process.env.NEXT_PUBLIC_BUCKET_ID,
};

export const client = new Appwrite()
    .setEndpoint(Server.endpoint)
    .setProject(Server.project as string);
const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export const aw = { account, database, storage };