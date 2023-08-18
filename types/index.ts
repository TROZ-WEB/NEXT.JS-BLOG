import { RichTextContent } from "@graphcms/rich-text-types";

export type Author = {
  bio: string;
  id: string;
  name: string;
  photo: {
    url: string;
  };
};

export type Post = {
  author: Author;
  createdAt: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  categories: {
    name: string;
    slug: string;
  }[];
  content: {
    raw: RichTextContent;
  };
};

export type Category = {
  name: string;
  slug: string;
};

export type Comment = {
  name: string;
  createdAt: string;
  comment: string;
};
