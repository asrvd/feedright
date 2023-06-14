"use client";

import { useState } from "react";
import { CloseIcon, BackIcon, FeedbackIcon } from "./icons";

type FeedbackType = "bug" | "idea" | "other";

export default function FeedbackWidget({ widgetID }: { widgetID: string }) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const submitFeedback = async () => {
    setIsSending(true);
    const res = await fetch("https://feedright.vercel.app/api/create-feedback", {
      method: "POST",
      body: JSON.stringify({
        widget_id: widgetID,
        type: feedbackType,
        content: feedbackText,
      }),
    });
    const data = await res.json();
    setIsSending(false);
    setShowForm(false);
    setShowThanks(true);
    console.log(data);
  };

  console.log("recieved widgetID: ", widgetID);

  return (
    <>
      {showForm && (
        <div className="font-sans fixed bottom-20 right-4 bg-zinc-50 rounded-lg p-4 shadow-md text-zinc-950 w-[300px] h-[230px] flex flex-col justify-start items-center gap-4 drop-shadow-lg">
          <h2 className="font-black text-lg leading-none">
            {feedbackType
              ? feedbackType === "bug"
                ? "Report a bug"
                : feedbackType === "idea"
                ? "Suggest an idea"
                : "Tell us anything"
              : `What's on your mind?`}
          </h2>
          {!feedbackType && (
            <div className="flex gap-2 w-full h-full">
              <button
                className="rounded-lg px-2 py-6 bg-zinc-200/70 focus:ring-1 ring-zinc-700/50 hover:bg-zinc-200 duration-200 ease-in w-1/3 flex flex-col items-center font-bold"
                onClick={() => setFeedbackType("bug")}
              >
                <span className="text-2xl">🐛</span>
                <span className="text-lg">Bug</span>
              </button>
              <button
                className="rounded-lg px-2 py-6 bg-zinc-200/70 hover:bg-zinc-200 focus:ring-1 ring-zinc-700/50 duration-200 ease-in w-1/3 flex flex-col items-center font-bold"
                onClick={() => setFeedbackType("idea")}
              >
                <span className="text-2xl">💡</span>
                <span className="text-lg">Idea</span>
              </button>
              <button
                className="rounded-lg px-2 py-6 bg-zinc-200/70 hover:bg-zinc-200 focus:ring-1 ring-zinc-700/50 duration-200 ease-in w-1/3 flex flex-col items-center font-bold"
                onClick={() => setFeedbackType("other")}
              >
                <span className="text-2xl">👀</span>
                <span className="text-lg">Other</span>
              </button>
            </div>
          )}
          {feedbackType && (
            <div className="flex flex-col gap-2 w-full ease-in h-full">
              <textarea
                className="rounded-lg p-2 bg-zinc-200/70 hover:bg-zinc-200 border-none outline-none focus:ring-1 ring-zinc-700/50 duration-200 ease-in w-full h-2/3"
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder={
                  feedbackType === "bug"
                    ? "Describe the bug"
                    : feedbackType === "idea"
                    ? "Describe your idea"
                    : "What do you want us to know?"
                }
              />
              <button
                className="rounded-lg h-1/3 bg-zinc-200/70 hover:bg-zinc-200 focus:ring-1 ring-zinc-700/50 duration-200 ease-in w-full text-center font-bold"
                onClick={submitFeedback}
                disabled={!feedbackText || isSending}
              >
                {isSending ? "Sending..." : "Send"}
              </button>
            </div>
          )}
          <button
            className="absolute top-4 right-4 text-zinc-950 hover:text-zinc-900 duration-200 ease-in"
            onClick={() => {
              setFeedbackType(null);
              setFeedbackText("");
              setShowForm(false);
            }}
          >
            <CloseIcon />
          </button>
          {feedbackType && (
            <button
              className="absolute top-4 left-4 text-zinc-950 hover:text-zinc-900 duration-200 ease-in"
              onClick={() => {
                setFeedbackType(null);
                setFeedbackText("");
              }}
            >
              <BackIcon />
            </button>
          )}
          <p className="text-xs leading-none">
            widget by{" "}
            <a
              className="font-semibold"
              href="https://feedright.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              feedright
            </a>
          </p>
        </div>
      )}
      <button
        className="fixed bottom-4 right-4 bg-zinc-50 text-xl rounded-full p-3 drop-shadow-lg text-zinc-950 hover:text-zinc-900 duration-200 ease-in"
        name="Leave Feedback"
        onClick={() => {
          setShowForm(!showForm);
          setShowThanks(false);
          setFeedbackType(null);
          setFeedbackText("");
        }}
      >
        {showForm || showThanks ? <CloseIcon /> : <FeedbackIcon />}
      </button>
      {showThanks && (
        <div className="fixed bottom-20 right-4 bg-zinc-50 rounded-lg p-4 shadow-md text-zinc-950 w-[300px] h-[230px] flex flex-col justify-start items-center gap-4 drop-shadow-lg">
          <h2 className="font-black text-lg leading-none h-full">
            Thanks for your feedback!
          </h2>
          <p className="text-xs leading-none">
            widget by{" "}
            <a
              className="font-semibold"
              href="https://feedright.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              feedright
            </a>
          </p>
        </div>
      )}
    </>
  );
}