"use client";

import React, { use } from "react";
import { getCategories } from "../services";

import Link from "next/link";
import { Category } from "../types";
import useQueryClient from "../hooks/useQueryClient";

const Header = () => {
  const queryClient = useQueryClient();

  const categories = use(
    queryClient<Category[]>("categories", async () => {
      const categories = await getCategories();
      return categories ? categories : [];
    })
  );

  return (
    <div className="container mx-auto px-10 mb-10">
      <div className="border-b-4 w-full inline-block border-black py-6">
        <div className="block md:float-left">
          <Link href="/">
            <div className="cursor-pointer font-bold text-2xl">TROZ Pastry</div>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories?.map((category) => (
            <Link key={category.name} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle ml-4 cursor-pointer text-base">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
