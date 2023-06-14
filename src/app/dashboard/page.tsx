import { getServerSession } from "next-auth";
import Widgets from "@/components/widgets";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { aw, Server } from "@/server/db/appwrite";
import { Query } from "appwrite";
import { z } from "zod";
import AddWidget from "@/components/add-widget";

const widgetSchema = z.object({
  total: z.number(),
  documents: z.array(
    z.object({
      user_id: z.string(),
      site: z.string(),
      $id: z.string(),
      $createdAt: z.string(),
      $updatedAt: z.string(),
    })
  ),
});

export type Widgets = z.infer<typeof widgetSchema>;

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user) {
    return <p>not signed in</p>;
  }
  const widgets = await aw.database.listDocuments(
    Server.databaseID as string,
    Server.widgetCollectionID as string,
    [Query.equal("user_id", [session.user.id])]
  );

  const parsedWidgets = widgetSchema.safeParse(widgets);

  if (!parsedWidgets.success) {
    throw new Error(parsedWidgets.error.message);
  }

  return (
    <>
      {session?.user ? (
        <div className="lg:w-[56%] w-full p-4 my-6 h-[90vh]">
          <AddWidget userID={session.user.id} />
          <Widgets widgets={parsedWidgets.data} />
        </div>
      ) : (
        <p>not signed in</p>
      )}
    </>
  );
}
