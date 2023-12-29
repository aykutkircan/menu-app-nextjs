"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const session = useSession();

  const { status: sessionStatus } = session;

  return (
    <header className="flex items-center justify-between">
      <nav className="flex gap-6 text-gray-400 font-semibold items-center">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          Yöre Mantı Evi
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/menu"}>Menu</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/contact"}>Contact</Link>
      </nav>
      <nav className="flex gap-6 text-gray-400 font-semibold items-center">
        {sessionStatus === "authenticated" && (
          <Link
            className="bg-primary text-white rounded-full px-4 py-2 font-semibold text-sm"
            href={"/"}
            onClick={() => signOut()}
          >
            Logout
          </Link>
        )}
        {sessionStatus === "unauthenticated" && (
          <>
            <Link href={"/login"}>Login</Link>
            <Link
              className="bg-primary text-white rounded-full px-4 py-2 font-semibold text-sm"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
