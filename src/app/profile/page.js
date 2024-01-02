"use client";

import toast from "react-hot-toast";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;

  const [submitError, setSubmitError] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userImage, setUserImage] = useState("/600x600.png");

  // get initial profil data
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        const dataPromise = response.json();

        dataPromise.then((data) => {
          setUserName(data.user.name || "");
          setUserEmail(data.user.email);
          setUserImage(data.user.image || "/600x600.png");
        });
      });
    }
  }, [session, status, submitError]);

  // save user data when click 'save' button
  const handleSubmitForm = async function (ev) {
    ev.preventDefault();
    setSubmitError(false);

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify({ userImage, userName, userEmail }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else {
        setSubmitError(true);
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Updating...",
      success: <b>Updated!</b>,
      error: <b>Could not update.</b>,
    });
  };

  //TODO
  if (status === "unauthenticated") {
    return redirect("/");
  }

  return (
    <section className="mt-8">
      <UserTabs />
      {/* User Form */}
      <div className="max-w-md mx-auto mt-8">
        <div className="md:flex gap-4">
          <EditableImage image={userImage} setImage={setUserImage} />

          <form className="grow p-2" onSubmit={handleSubmitForm}>
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              disabled
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
