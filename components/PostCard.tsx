import React from "react";
import { Post } from "../types";
import moment from "moment";
import Link from "next/link";
import PostInfo from "./PostInfo";
import Image from "next/image";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => {
  return (
    <div className="pb-16">
      <Link href={`/post/${post.slug}`}>
        <div className="relative overflow-hidden shadow-md pb-96 mb-4 cursor-pointer">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            height={320}
            width={549}
            className="object-top absolute h-96 w-full object-cover"
          />
        </div>
      </Link>
      <PostInfo post={post} />
      <Link href={`/post/${post.slug}`}>
        <div className="cursor-pointer">
          <h1 className="transition duration-200 hover:opacity-50 mb-8 text-xl font-semibold">
            {post.title}
          </h1>
          <p className="text-md mb-8">{post.excerpt}</p>
          <span className="flex justify-end transition duration-200 transform hover:translate-x-1 text-md font-medium">
            Continue Reading
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              className="ml-2"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
