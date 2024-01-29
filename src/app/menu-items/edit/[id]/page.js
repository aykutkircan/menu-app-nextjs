"use client";

import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import DeleteConfirmation from "@/components/layout/DeleteConfirmation";

import { redirect, useParams } from "next/navigation";
import { useState, useEffect } from "react";

import toast from "react-hot-toast";

export default function EditMenuItem() {
  const { id } = useParams();

  const [menuItemId, setMenuItemId] = useState("");
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

  // initial values
  useEffect(() => {
    fetch("/api/menu-items?id=" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();

      if (data.success) {
        setMenuItemId(id);
        setMenuItemName(data?.menuItem?.name);
        setMenuItemDescription(data?.menuItem?.description);
        setMenuItemCategory(data?.menuItem?.category);
        setMenuItemPrice(data?.menuItem?.price);
        setMenuItemImage(data?.menuItem?.image);
      }
    });
  }, [id]);

  const handleSubmitForm = (ev) => {
    ev.preventDefault();
  };

  const handleEditForm = async (ev) => {
    ev.preventDefault();

    const updatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify({
          _id: menuItemId,
          name: menuItemName,
          description: menuItemDescription,
          category: menuItemCategory,
          price: menuItemPrice,
          image: menuItemImage,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(updatingPromise, {
      success: "Successfuly updated",
      error: "Could not updated",
      loading: "Updating..",
    });

    setRedirectRequest(true);
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
            <div className="flex gap-2 ">
              <button
                className="bg-yellow-500 text-white"
                onClick={handleEditForm}
              >
                Edit Category
              </button>
              <button type="button" className="bg-red-500 text-white">
                Delete Category
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
