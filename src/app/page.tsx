/* eslint-disable @next/next/no-img-element */

import { SignIn } from "./actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NavButton } from "@/components/ui/buttons";
import FeedbackWidget from "@/components/Widget";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-full lg:w-[90%] flex flex-col lg:flex-row h-[90vh] justify-center items-center p-4 my-6">
      <div className="flex flex-col items-center justify-center lg:px-4 h-full gap-8 lg:items-start">
        <h2 className="font-black bg-gradient-to-b from-zinc-800 via-neutral-600 to-stone-800 text-[3rem] md:text-[4.5rem] lg:text-[5rem] text-transparent bg-clip-text leading-none tracking-tight lg:text-left text-center">
          Getting feedbacks has never been easier!
        </h2>
        {session?.user ? (
          <Link
            className="flex justify-center items-center bg-zinc-200 text-zinc-950 px-4 py-3 rounded-md text-center font-semibold text-sm hover:bg-zinc-200/50 transition-all border duration-200 border-zinc-300/60 hover:border-zinc-500/60 shadow-sm"
            href="/dashboard"
          >
            Your Dashboard
          </Link>
        ) : (
          <SignIn label="Get Started" />
        )}
      </div>
      <img
        src="https://illustrations.popsy.co/white/team-idea.svg"
        alt="illustration"
        className="w-[500px] h-[460px] lg:px-4 select-none"
      />
      <FeedbackWidget widgetID="1" />
    </section>
  );
}
