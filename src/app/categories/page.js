"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import IconRightCircle from "@/components/icons/IconRightCircle";
import UserTabs from "@/components/layout/UserTabs";

export default function CategoriesPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();
      if (data.success) {
        setMenuItems(data.categories);
      }
    });
  }, []);

  return (
    <section className="mt-8">
      <UserTabs />
      <div className="mt-8">
        <Link className="button flex max-w-sm mx-auto" href={"/categories/new"}>
          <span>Crete new category item</span>
          <IconRightCircle />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit category item:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                key={item._id}
                href={"/categories/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
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
