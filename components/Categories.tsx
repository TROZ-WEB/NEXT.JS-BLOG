"use client";

import React, { use } from "react";
import { getCategories } from "../services";
import Link from "next/link";
import { Category } from "../types";
import useQueryClient from "../hooks/useQueryClient";

const Categories = () => {
  const queryClient = useQueryClient();

  const categories = use(
    queryClient<Category[]>("categories", async () => {
      const categories = await getCategories();
      return categories ? categories : [];
    })
  );
  return (
    <div className="mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b-4 border-black pb-4">
        Categories
      </h3>
      {categories.map((category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block pb-2 mb-2">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
