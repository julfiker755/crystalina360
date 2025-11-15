"use client";
import { Pagination } from "@/components/reuseable/pagination";
import BlogCard from "../../reuse/blog-card";
import { blogItem, dummyJson } from "../../dummy-json";
import { AppAlert } from "../../reuse";
import Link from "next/link";

export function Blogs() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {blogItem.map((item: any, index) => (
          <Link key={index} href={`/blog/${item?.id}`}>
            <BlogCard item={item} />
          </Link>
        ))}
      </div>
      <div className="flex justify-end my-10">
        <Pagination
          onPageChange={(v: any) => console.log(v)}
          {...dummyJson.meta}
        />
      </div>
      <AppAlert className="mb-10" />
    </div>
  );
}
