"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import IconRightCircle from "@/components/icons/IconRightCircle";
import UserTabs from "@/components/layout/UserTabs";

export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu-items", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();
      if (data.success) {
        setMenuItems(data.menuItems);
      }
    });
  }, []);

  return (
    <section className="mt-8">
      <UserTabs />
      <div className="mt-8">
        <Link
          className="button flex max-w-sm mx-auto hover:bg-gray-200"
          href={"/menu-items/new"}
        >
          <span>Crete new menu item</span>
          <IconRightCircle />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4 hover:bg-white hover:shadow-md hover:shadow-black/25"
              >
                <div className="relative">
                  <Image
                    className="rounded-md mx-auto"
                    src={item.image}
                    alt={""}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
