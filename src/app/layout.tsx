/* eslint-disable @next/next/no-img-element */
import "./globals.css";
import ToastContainer from "@/components/toaster";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { signIn, signOut } from "next-auth/react";
import NavMenu from "@/components/navbar";
import { SignInSmaller } from "./actions";
import Link from "next/link";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import Arrow from "@/components/arrow";

export const metadata: Metadata = {
  title: {
    default: "Feedright",
    template: "Feedright • %s",
  },
  description: "Getting feedback made easier using widgets.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="font-sans">
      <body>
        <NextTopLoader
          color="#3f3f46"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow={false}
        />
        <main className="flex flex-col items-center justify-start min-h-screen">
          <div className="h-[5vh] w-full px-4 py-6 flex justify-between items-center border-b border-zinc-400/50">
            <Link className="text-zinc-950 font-semibold" href="/">
              Feedright ~
            </Link>
            <div className="w-[60%] lg:w-[18%] md:w-[23%] flex justify-end">
              {session?.user ? (
                <NavMenu session={session} />
              ) : (
                <SignInSmaller label="Sign In" />
              )}
            </div>
          </div>
          {children}
          <div className="h-[5vh] w-full flex flex-col lg:flex-row md:flex-row justify-center md:justify-between lg:justify-between items-center mt-4 lg:text-left md:text-left px-4 py-10 lg:py-6 md:py-6 border-t border-zinc-400/50 text-center">
            <p className="text-sm text-zinc-900 w-full">
              made with {`<3`} by{" "}
              <a
                href="https://twitter.com/_asheeshh"
                rel="noreferrer"
                target="_blank"
                className="text-zinc-950 font-semibold cursor-pointer"
              >
                ashish
              </a>{" "}
              for the{" "}
              <a
                href="https://hashnode.com/hackathons/appwrite"
                rel="noreferrer"
                target="_blank"
                className="text-zinc-950 font-semibold cursor-pointer"
              >
                hashnode x appwrite hackathon
              </a>
            </p>
            <p className="text-sm text-zinc-900 w-full lg:text-end md:text-end text-center">
              source code on{" "}
              <a
                href="https://github.com/asrvd/feedright"
                rel="noreferrer"
                target="_blank"
                className="text-zinc-950 font-semibold cursor-pointer"
              >
                github
              </a>
              {" | "}
              illustrations by{" "}
              <a
                href="https://popsy.co/"
                rel="noreferrer"
                target="_blank"
                className="text-zinc-950 font-semibold cursor-pointer"
              >
                popsy
              </a>
            </p>
          </div>
        </main>

        <ToastContainer />
        <Arrow />

        <Script
          async
          src="https://feedright.vercel.app/widget.js"
          data-widget-id="648a184a0eb63da99ea5"
        ></Script>
      </body>
    </html>
  );
}
