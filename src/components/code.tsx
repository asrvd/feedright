"use client";

import { useState } from "react";
import { CopyButton } from "./ui/buttons";
import { CodeIcon, CloseIcon } from "./icons";
import ToolTip from "./tooltip";

export default function Code({ widgetID }: { widgetID: string }) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-neutral-800 to-stone-900 mb-4 text-center self-center">
          Recieved Feedbacks
        </h2>
        <ToolTip content="Embed Script">
          <button
            className="flex justify-center items-center bg-zinc-200 text-zinc-950 p-2 font-bold rounded-md text-center  text-sm hover:bg-zinc-200/50 transition-all border duration-200 border-zinc-300/60 hover:border-zinc-500/60 shadow-sm"
            onClick={() => setOpenDropdown(true)}
          >
            <CodeIcon />
          </button>
        </ToolTip>
      </div>
      {openDropdown && (
        <div className="w-full bg-zinc-200 rounded-md shadow-sm border border-zinc-300/60 mb-4">
          <div className="flex justify-between items-center px-4 py-2">
            <p className="text-base font-semibold">
              Paste the script tag in your code to use your widget
            </p>
            <button
              className="text-zinc-950 text-sm font-semibold"
              onClick={() => setOpenDropdown(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex gap-2 p-4">
            <p className="bg-zinc-100 w-full p-2 rounded-lg relative shadow-sm border border-zinc-300/60">
              <code className="text-zinc-950 text-sm whitespace-pre-line">
                {`<script 
                async 
                src="https://feedbacks.vercel.app/widget.js" 
                data-widget-id="${widgetID}">
                </script>`}
              </code>
              <CopyButton
                text={`<script async src="https://feedbacks.vercel.app/widget.js data-widget-id=${widgetID}"></script>`}
              />
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
