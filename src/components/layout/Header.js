import React from "react";
import Link from "next/link";

export default function Header() {
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
      <nav className="flex items-center justify-end">
        <Link
          className="bg-primary text-white rounded-full px-4 py-2 font-semibold text-sm"
          href={"/admin"}
          target="_blank"
        >
          Admin Panel
        </Link>
      </nav>
    </header>
  );
}
