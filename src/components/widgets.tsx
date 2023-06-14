"use client";

import type { Widgets } from "@/app/dashboard/page";
import { useRouter } from "next/navigation";

export default function Widgets({ widgets }: { widgets: Widgets }) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 w-full min-h-full">
      {widgets.documents.map((widget) => {
        return (
          <div
            className="w-full rounded-lg p-2 bg-zinc-200 hover:bg-zinc-200/50 cursor-pointer drop-shadow-sm flex justify-between items-center border border-zinc-300/60 hover:border-zinc-500/60"
            key={widget.$id}
            onClick={() => router.push(`/widget/${widget.$id}`)}
          >
            <p className="text-base font-semibold">{widget.site}</p>
            <p className="text-xs">
              {Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(new Date(widget.$createdAt))}
            </p>
          </div>
        );
      })}
    </div>
  );
}
