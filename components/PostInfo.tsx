import React from "react";
import { Post } from "../types";
import moment from "moment";
import Image from "next/image";

type Props = {
  post: Post;
};

const PostInfo = ({ post: { author, createdAt } }: Props) => {
  return (
    <div className="flex items-center justify-end mb-4 w-full">
      <div className="flex items-center justify-center lg:mb-0 w-full lg:w-auto mr-8">
        <Image
          src={author.photo.url}
          alt={author.name}
          height={20}
          width={20}
          className="align-middle rounded-full"
        />
        <p className="inline align-middle  ml-2 text-sm">{author.name}</p>
      </div>
      <div className="text-sm ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 inline mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>{moment(createdAt).format("MMM DD, YYYY")}</span>
      </div>
    </div>
  );
};

export default PostInfo;
