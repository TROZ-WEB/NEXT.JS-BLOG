import React from "react";
import { Author } from "../types";
import Image from "next/image";

type Props = {
  author: Author;
};

const Author = ({ author }: Props) => {
  return (
    <div className="text-center mt-20 mb-8 py-12 px-4 relative bg-black bg-opacity-10">
      <div className="absolute -top-14 left-1/2 -translate-x-1/2">
        <Image
          src={author.photo.url}
          alt={author.name}
          height={100}
          width={100}
          className="align-middle rounded-full"
        />
      </div>
      <h3 className="my-4 font-bold">{author.name}</h3>
      <p className="text-sm">{author.bio}</p>
    </div>
  );
};

export default Author;
