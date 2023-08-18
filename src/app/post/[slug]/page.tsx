import React from "react";
import {
  Author,
  Categories,
  Comments,
  CommentsForm,
  PostDetail,
  PostWidget,
} from "../../../../components";
import { Post } from "../../../../types";
import { getPostDetails } from "../../../../services";

type Props = {
  params: {
    slug: string;
  };
};

async function getData(slug: string): Promise<Post | undefined> {
  const post = (await getPostDetails(slug)) || undefined;

  return post;
}

const PostDetails = async ({ params }: Props) => {
  const post: Post | undefined = await getData(params.slug);

  if (!post) return;

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
