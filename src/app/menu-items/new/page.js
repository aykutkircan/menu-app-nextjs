"use client";

import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function NewMenuItem() {
  const [menuItemName, setMenuItemName] = useState("");
  const [menuItemCategory, setMenuItemCategory] = useState("");
  const [menuItemDescription, setMenuItemDescription] = useState("");
  const [menuItemPrice, setMenuItemPrice] = useState(0);
  const [menuItemImage, setMenuItemImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [redirectRequest, setRedirectRequest] = useState(false);

  useEffect(() => {
    fetch("/api/categories", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    });
  }, []);

  const handleSubmitForm = async (ev) => {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify({
          name: menuItemName,
          description: menuItemDescription,
          category: menuItemCategory,
          price: menuItemPrice,
          image: menuItemImage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Created successfully",
      error: "Could not created",
    });

    setRedirectRequest(true); // if process is success redirect to '/menu-items'
  };

  if (redirectRequest) {
    return redirect("/menu-items");
  }

  return (
    <section className="mt-8">
      <UserTabs />
      <form className="mt-8 max-w-2xl mx-auto" onSubmit={handleSubmitForm}>
        <div
          className="md:grid items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          {/* Image Input */}
          <div>
            <EditableImage image={menuItemImage} setImage={setMenuItemImage} />
          </div>
          {/* Name Input */}
          <div className="grow">
            <label htmlFor="menuItem">Name</label>
            <input
              id="menuItem"
              type="text"
              placeholder="Name"
              value={menuItemName}
              onChange={(ev) => setMenuItemName(ev.target.value)}
              required
            />
            {/* Price Input */}
            <label htmlFor="menuItem">Price</label>
            <input
              id="menuPrice"
              type="number"
              placeholder="Price"
              value={menuItemPrice}
              onChange={(ev) => setMenuItemPrice(ev.target.value)}
              required
            />
            {/* Category Input */}
            <label>Category</label>
            <select
              value={menuItemCategory}
              className="text-gray-500"
              onChange={(ev) => setMenuItemCategory(ev.target.value)}
            >
              <option value={""} disabled>
                {"Select a Category"}
              </option>
              {categories?.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
            {/* Description Input */}
            <label htmlFor="menuItemDescription">Description</label>
            <textarea
              id="menuItemDescription"
              type="text"
              placeholder="Description"
              value={menuItemDescription}
              onChange={(ev) => setMenuItemDescription(ev.target.value)}
            />
            {/* Submit Button */}
            <button type="submit">Add New Menu Item</button>
          </div>
        </div>
      </form>
    </section>
  );
}
