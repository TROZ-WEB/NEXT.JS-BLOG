import { request, gql } from "graphql-request";
import { Category, Comment, Post } from "../types";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

type BaseResults = "" | undefined;

type PostsResults =
  | BaseResults
  | {
      postsConnection: {
        edges: {
          node: Post;
        }[];
      };
    };

type PostDetailsResults = BaseResults | { post: Post };

type FeaturedPostsResults = BaseResults | { posts: Post[] };

type CategoriesResults = BaseResults | { categories: Category[] };

type CommentsResults = BaseResults | { comments: Comment[] };

export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const results: PostsResults =
    graphqlAPI && (await request(graphqlAPI, query));

  return results === "" ? "" : results?.postsConnection.edges;
};

export const getPostsByCategory = async (slug: string) => {
  const query = gql`
    query GetPostsByCategory($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const results: PostsResults =
    graphqlAPI && (await request(graphqlAPI, query, { slug }));

  return results === "" ? "" : results?.postsConnection.edges;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;

  const results: PostDetailsResults =
    graphqlAPI && (await request(graphqlAPI, query, { slug }));

  return results === "" ? "" : results?.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const results: FeaturedPostsResults =
    graphqlAPI && (await request(graphqlAPI, query));

  return results === "" ? "" : results?.posts;
};

export const getSimilarPosts = async (
  slug: string,
  categories: string[] | undefined
) => {
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const results: FeaturedPostsResults =
    graphqlAPI && (await request(graphqlAPI, query, { slug, categories }));

  return results === "" ? "" : results?.posts;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const results: CategoriesResults =
    graphqlAPI && (await request(graphqlAPI, query));

  return results === "" ? "" : results?.categories;
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const results: CommentsResults =
    graphqlAPI && (await request(graphqlAPI, query, { slug }));

  return results === "" ? "" : results?.comments;
};

type CommentObj = {
  name: string;
  email: string;
  comment: string;
  slug: string;
};

export const submitComment = async (commentObj: CommentObj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentObj),
  });

  return result.json();
};
