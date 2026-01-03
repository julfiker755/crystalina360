"use client";
import { Pagination } from "@/components/reuseable/pagination";
import BlogCard from "../../reuse/blog-card";
import { AppAlert } from "../../reuse";
import Link from "next/link";
import { useGetBlogQuery } from "@/redux/api/admin/blogApi";
import { Repeat } from "@/components/reuseable/repeat";
import { Skeleton } from "@/components/ui";
import { useState } from "react";

export function Blogs() {
  const [page, setIsPate] = useState(1);
  const { data: blog, isLoading } = useGetBlogQuery({
    page: page,
  });
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {isLoading ? (
          <Repeat count={10}>
            <Skeleton className="w-full h-60" />
          </Repeat>
        ) : (
          blog?.data?.map((item: any, index: any) => (
            <Link key={index} href={`/blog/${item?.id}`}>
              <BlogCard item={item} />
            </Link>
          ))
        )}
      </div>
      <div className="flex justify-end my-10">
        <Pagination onPageChange={(v: any) => setIsPate(v)} {...blog?.meta} />
      </div>
      <AppAlert className="mb-10" />
    </div>
  );
}
