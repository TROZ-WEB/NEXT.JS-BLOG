import React from "react";
import { Post } from "../types";
import PostInfo from "./PostInfo";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";

type Props = {
  post: Post;
};

const PostDetail = ({ post }: Props) => {
  return (
    <div className="pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          width={549}
          height={412}
          priority
          className="object-top h-full w-full"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <PostInfo post={post} />
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        <RichText content={post.content.raw} />;
      </div>
    </div>
  );
};

export default PostDetail;
