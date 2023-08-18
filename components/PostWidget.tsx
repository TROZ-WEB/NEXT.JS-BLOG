"use client";

import React, { use } from "react";
import { getRecentPosts, getSimilarPosts } from "../services";
import moment from "moment";
import useQueryClient from "../hooks/useQueryClient";
import { Post } from "../types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  categories?: string[];
  slug?: string;
};

const PostWidget = ({ categories, slug }: Props) => {
  let featuredPosts: Post[] = [];
  const queryClient = useQueryClient();

  if (slug) {
    featuredPosts = use(
      queryClient<Post[]>("similarPosts", async () => {
        const featuredPosts = await getSimilarPosts(slug, categories);
        return featuredPosts ? featuredPosts : [];
      })
    );
  } else {
    featuredPosts = use(
      queryClient<Post[]>("recentPosts", async () => {
        const featuredPosts = await getRecentPosts();
        return featuredPosts ? featuredPosts : [];
      })
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b-4 border-black pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {featuredPosts?.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-6">
          <div className="w-16 h-16 flex-none relative overflow-hidden ">
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              height={60}
              width={60}
              className="h-full object-top absolute object-cover shadow-md"
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-xs">
              {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
