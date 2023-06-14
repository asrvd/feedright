import { aw, Server } from "@/server/db/appwrite";
import { Query } from "appwrite";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { z } from "zod";
import Code from "@/components/code";
import FeedbackWidget from "@/components/Widget";

const feedbackSchema = z.object({
  total: z.number(),
  documents: z.array(
    z.object({
      widget_id: z.string(),
      type: z.enum(["bug", "idea", "other"]),
      content: z.string(),
      $id: z.string(),
      $createdAt: z.string(),
      $updatedAt: z.string(),
    })
  ),
});

export default async function Widget({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerSession(authOptions);

  const feedbacks = await aw.database.listDocuments(
    Server.databaseID as string,
    Server.feedbackCollectionID as string,
    [Query.equal("widget_id", [params.id])]
  );
  const parsedFeedbacks = feedbackSchema.safeParse(feedbacks);

  if (!parsedFeedbacks.success) {
    throw new Error(parsedFeedbacks.error.message);
  }

  return (
    <>
      {session?.user ? (
        <div className="lg:w-[56%] w-full p-4 my-6 h-[90vh]">
          <Code widgetID={params.id} />
          <div className="flex flex-col gap-2 w-full min-h-full">
            {parsedFeedbacks.data.documents.map((feedback) => {
              return (
                <div
                  className="w-full rounded-lg p-2 bg-zinc-200 hover:bg-zinc-200/50 drop-shadow-sm flex flex-col border-zinc-300/60 hover:border-zinc-500/60 border"
                  key={feedback.$id}
                >
                  <p className="text-xs font-semibold">
                    {feedback.type === "bug"
                      ? "Bug report"
                      : feedback.type === "idea"
                      ? "Idea suggestion"
                      : "Other"}
                    {" | "}
                    {Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(feedback.$createdAt))}
                  </p>
                  <p className="text-base mt-2">{feedback.content}</p>
                </div>
              );
            })}
          </div>
          <FeedbackWidget widgetID={params.id} />
        </div>
      ) : (
        <p>not logged in</p>
      )}
    </>
  );
}
