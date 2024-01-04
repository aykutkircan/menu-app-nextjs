"use client";

import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ image, setImage }) {
  // set image when upload new profile image
  const handleUpload = async function (ev) {
    const files = ev.target.files;
    if (!files || files.length == 0) {
      return;
    }

    const formData = new FormData();
    formData.append("image", files[0]);
    // formData.append("filename", ConvertKebabCase(session?.data?.user?.name));

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const dataPromise = response.json();

        return dataPromise.then((data) => {
          setImage(data.destination);
          resolve();
        });
      }

      reject();
    });

    await toast.promise(promise, {
      loading: "Updating...",
      success: <b>Updated!</b>,
      error: <b>Could not update.</b>,
    });
  };

  return (
    <div>
      <div className="p-2 rounded-lg relative max-w-[120px]">
        {image ? (
          <Image
            src={image}
            className="rounded-lg w-full h-full mb-1"
            width={200}
            height={0}
            style={{ width: "200px", height: "auto" }}
            priority={true}
            alt="image"
          ></Image>
        ) : (
          <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
            No image
          </div>
        )}

        <label>
          <input type="file" className="hidden" onChange={handleUpload} />
          <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
            Change Image
          </span>
        </label>
      </div>
    </div>
  );
}
