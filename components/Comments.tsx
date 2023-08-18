import React, { use } from "react";
import useQueryClient from "../hooks/useQueryClient";
import { Comment } from "../types";
import { getComments } from "../services";
import moment from "moment";
import HTMLReactParser from "html-react-parser";

type Props = {
  slug: string;
};

const Comments = ({ slug }: Props) => {
  const queryClient = useQueryClient();

  const comments = use(
    queryClient<Comment[]>("comments", async () => {
      const comments = await getComments(slug);
      return comments ? comments : [];
    })
  );

  return (
    <div className="pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b-4 border-black pb-4">
        {comments.length} Comment{comments.length === 1 ? "" : "s"}
      </h3>
      {comments.map((comment) => (
        <div
          key={comment.createdAt}
          className="border-b border-black mb-4 pb-6 last:border-0"
        >
          <p className="mb-4 text-xs">
            <span className="font-semibold">{comment.name}</span> on{" "}
            {moment(comment.createdAt).format("MMM DD, YYYY")}
          </p>
          <p className="whitespace-pre-line w-full">
            {HTMLReactParser(comment.comment)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
