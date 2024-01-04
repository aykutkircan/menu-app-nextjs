"use client";

import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default function NewCategoryItem() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("/600x600.png");
  const [redirectRequest, setRedirectRequest] = useState(false);

  const handleSubmitForm = async (ev) => {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({
          name: categoryName,
          description: categoryDescription,
          image: categoryImage,
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

    setRedirectRequest(true); // if process is success redirect to '/categories'
  };

  if (redirectRequest) {
    return redirect("/categories");
  }

  return (
    <section className="mt-8">
      <UserTabs />
      <form className="mt-8 max-w-2xl mx-auto" onSubmit={handleSubmitForm}>
        <div
          className="md:grid items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div>
            <EditableImage image={categoryImage} setImage={setCategoryImage} />
          </div>
          <div className="grow">
            <label htmlFor="categoryName">Category Name</label>
            <input
              id="categoryName"
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              required
            />
            <label htmlFor="categoryDescription"> Category Description</label>
            <textarea
              id="categoryDescription"
              type="text"
              placeholder="Category Description"
              value={categoryDescription}
              onChange={(ev) => setCategoryDescription(ev.target.value)}
            />
            <button type="submit">Add New Category</button>
          </div>
        </div>
      </form>
    </section>
  );
}
