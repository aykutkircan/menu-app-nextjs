"use client";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";

import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCategory() {
  const { id } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [redirectRequest, setRedirectRequest] = useState(false);

  useEffect(() => {
    fetch("/api/categories?id=" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();

      if (data.success) {
        setCategoryName(data?.category?.name);
        setCategoryDescription(data?.category?.description);
        setCategoryImage(data?.category?.image);
      }
    });
  }, [id]);

  const handleSubmitForm = (ev) => {
    ev.preventDefault();

    setRedirectRequest(true);
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
            <button type="submit">Edit Category</button>
          </div>
        </div>
      </form>
    </section>
  );
}
