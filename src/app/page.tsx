import { Post } from "../../types";
import { Categories, PostCard, PostWidget } from "../../components";
import { getPosts } from "../../services";

async function getData(): Promise<{ node: Post }[]> {
  const posts = (await getPosts()) || [];

  return posts;
}

export default async function Home() {
  const posts: { node: Post }[] = await getData();

  return (
    <div className="container mx-auto px-10 mb-18">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard key={post.node.title} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
