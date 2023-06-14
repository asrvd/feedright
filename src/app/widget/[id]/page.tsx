/* eslint-disable @next/next/no-img-element */
import { aw, Server } from "@/server/db/appwrite";
import { Query } from "appwrite";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { z } from "zod";
import Code from "@/components/code";

const feedbackSchema = z.object({
  total: z.number(),
  documents: z.array(
    z.object({
      widget_id: z.string(),
      type: z.enum(["bug", "idea", "other"]),
      content: z.string(),
      screenshot: z.string().optional().nullable(),
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
        <div className="lg:w-[56%] w-full p-4 my-6 min-h-[90vh] ">
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
                  {feedback.screenshot && (
                    <details className="mt-2">

                      <summary className="text-xs font-semibold">
                        View screenshot
                      </summary>

                    <img
                      src={feedback.screenshot}
                      alt="screenshot"
                      className="w-full h-auto rounded-lg mt-2"
                    />
                    </details>
                  )}
                </div>
              );
            })}
            {parsedFeedbacks.data.total === 0 && (
              <div className="flex flex-col gap-8 items-center justify-center">
                <img
                  src="https://illustrations.popsy.co/white/digital-nomad.svg"
                  alt="illustration"
                  className="w-[500px] h-[460px] lg:px-4 select-none self-center"
                />
                <p className="">No feedbacks yet!</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>not logged in</p>
      )}
    </>
  );
}
