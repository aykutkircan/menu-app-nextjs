"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function UserTabs() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(true); // TODO

  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link
        className={pathname === "/profile" ? "active" : ""}
        href={"/profile"}
      >
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            href={"/categories"}
            className={pathname.includes("/categories") ? "active" : ""}
          >
            Categories
          </Link>
          <Link
            href={"/menu-items"}
            className={pathname.includes("menu-items") ? "active" : ""}
          >
            Menu Items
          </Link>
        </>
      )}
    </div>
  );
}
