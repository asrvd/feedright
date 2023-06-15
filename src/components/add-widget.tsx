"use client";

import { useState } from "react";
import { CloseIcon } from "./icons";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AddWidget({ userID }: { userID: string }) {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [siteName, setSiteName] = useState("");

  async function addWidget() {
    let id = toast.loading("Adding widget...");

    const res = await fetch("/api/create-widget", {
      method: "POST",
      body: JSON.stringify({
        user_id: userID,
        site: siteName,
      }),
    });

    if (res.ok) {
      toast.success("Widget added!", { id });
      router.refresh();
    } else {
      toast.error("Something went wrong", { id });
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-neutral-800 to-stone-900 mb-4">
          Your Widgets
        </h2>
        <button
          className="flex justify-center items-center bg-zinc-200 text-zinc-950 px-3 py-2 rounded-md text-center font-semibold text-sm hover:bg-zinc-200/50 transition-all border duration-200 border-zinc-300/60 hover:border-zinc-500/60 shadow-sm"
          onClick={() => setOpenDropdown(true)}
        >
          Add Widget
        </button>
      </div>
      {openDropdown && (
        <div className="w-full bg-zinc-200 rounded-md shadow-sm border border-zinc-300/60 mb-4">
          <div className="flex justify-between items-center px-4 py-2">
            <p className="text-base font-semibold">Add Widget</p>
            <button
              className="text-zinc-950 text-sm font-semibold"
              onClick={() => setOpenDropdown(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex gap-2 p-4">
            <input
              type="text"
              placeholder="Site URL"
              className="w-full bg-zinc-50 text-zinc-900 focus:bg-zinc-100 transition-all border border-zinc-300/60 shadow-smfocus:border-zinc-500/50 duration-200 rounded-md p-2 outline-none focus:ring-1 ring-zinc-700/50"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
            <button
              className="flex justify-center items-center bg-zinc-50 text-zinc-950 px-3 py-2 rounded-md text-center font-semibold text-sm hover:bg-zinc-100 transition-all border duration-200 border-zinc-300/60 hover:border-zinc-500/60 shadow-sm focus:ring-1 ring-zinc-700/50"
              onClick={() => {
                addWidget();
                router.refresh();
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
