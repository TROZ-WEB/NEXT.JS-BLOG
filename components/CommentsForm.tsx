"use client";

import React, { useEffect, useRef, useState } from "react";
import { submitComment } from "../services";

type Props = {
  slug: string;
};

const CommentsForm = ({ slug }: Props) => {
  const [error, setError] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const storeDataEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameEl.current && emailEl.current) {
      nameEl.current.value = window.localStorage.getItem("name") || "";
      emailEl.current.value = window.localStorage.getItem("email") || "";
    }
  });

  const handleCommentSubmission = () => {
    setError(false);

    const comment = commentEl.current?.value;
    const name = nameEl.current?.value;
    const email = emailEl.current?.value;
    const storeData = storeDataEl.current?.checked;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then(() => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b-4 border-black pb-4">
        Leave a reply
      </h3>
      <div className="grid grid-cols-1 gap-4 mb-4 relative">
        <textarea
          className="p-4 outline-none w-full border-black border-2 bg-transparent block px-2.5 pb-2.5 pt-4 text-sm appearance-none focus:outline-none focus:ring-0 peer"
          ref={commentEl}
          placeholder=" "
          name="comment"
          id="comment"
        />
        <label
          htmlFor="comment"
          className="absolute duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-bg px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Comment
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <input
            className="p-4 outline-none w-full border-black border-2 bg-transparent block px-2.5 pb-2.5 pt-4 text-sm appearance-none focus:outline-none focus:ring-0 peer"
            type="text"
            ref={nameEl}
            placeholder=" "
            name="name"
            id="name"
          />
          <label
            htmlFor="comment"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-bg px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Name
          </label>
        </div>
        <div className="relative">
          <input
            className="p-4 outline-none w-full border-black border-2 bg-transparent block px-2.5 pb-2.5 pt-4 text-sm appearance-none focus:outline-none focus:ring-0 peer"
            type="text"
            ref={emailEl}
            placeholder=" "
            name="email"
            id="email"
          />
          <label
            htmlFor="comment"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-bg px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Email
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            name="storeData"
            id="storeData"
            value="true"
          />
          <label className="cursor-pointer ml-2" htmlFor="storeData">
            Save my e-mail and name for the next time I comment
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="mt-4 flex justify-end">
        {showSuccessMessage && (
          <span className="text-xs float-right mt-3 mr-6 text-green-500">
            Comment submitted for review
          </span>
        )}
        <button
          className="bg-black text-bg px-6 py-2 transition duration-200 transform hover:-translate-y-1 text-md font-medium"
          type="button"
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentsForm;
