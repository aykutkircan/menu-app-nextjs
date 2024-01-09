"use client";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import DeleteConfirmation from "@/components/layout/DeleteConfirmation";

import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditCategory() {
  const { id } = useParams();

  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [redirectRequest, setRedirectRequest] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  // initial values
  useEffect(() => {
    fetch("/api/categories?id=" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      const data = await response.json();

      if (data.success) {
        setCategoryId(id);
        setCategoryName(data?.category?.name);
        setCategoryDescription(data?.category?.description);
        setCategoryImage(data?.category?.image);
      }
    });
  }, [id]);

  const handleEditForm = async (ev) => {
    ev.preventDefault();

    const updatingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: "PUT",
        body: JSON.stringify({
          _id: categoryId,
          name: categoryName,
          description: categoryDescription,
          image: categoryImage,
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

  const handleDeleteForm = async (ev) => {
    ev.preventDefault();

    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: "DELETE",
        body: JSON.stringify({
          _id: categoryId,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deletingPromise, {
      success: "Successfuly deleted",
      error: "Could not deleted",
      loading: "Deleting..",
    });

    setRedirectRequest(true);
  };

  const openConfirmationDialog = (ev) => {
    ev.preventDefault();
    setDisplayModal(true);
  };

  if (redirectRequest) {
    return redirect("/categories");
  }

  return (
    <section className="mt-8">
      <UserTabs />
      <form className="mt-8 max-w-2xl mx-auto">
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
            <div className="flex gap-2 ">
              <button
                className="bg-yellow-500 text-white"
                onClick={handleEditForm}
              >
                Edit Category
              </button>
              <button
                type="button"
                className="bg-red-500 text-white"
                onClick={openConfirmationDialog}
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      </form>
      <DeleteConfirmation
        showModal={displayModal}
        setDisplayModal={setDisplayModal}
        handleDeleteForm={handleDeleteForm}
      />
    </section>
  );
}
