"use client";

import NextNProgress from "nextjs-progressbar";

export default function Progress() {
  return (
    <NextNProgress
      color="#a1a1aa"
      startPosition={0.3}
      stopDelayMs={200}
      height={2}
    />
  );
}
