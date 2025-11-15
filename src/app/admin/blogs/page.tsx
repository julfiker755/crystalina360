"use client";
import NavTitle from "@/components/reuseable/nav-title";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { Button } from "@/components/ui";
import { blogItem, dummyJson } from "@/components/view/user/dummy-json";
import BlogCard from "@/components/view/user/reuse/blog-card";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Blog() {
  return (
    <div>
      <NavTitle
        title="Blogs"
        subTitle="Manage all of your blogs from this section"
      />
      <div className="flex-between gap-10">
        <SearchBox onChange={(e) => console.log(e)} />
        <Link href="/admin/blogs/store">
          <Button type="button" size="lg" className="rounded-xl">
            <Plus />
            <span className="hidden md:block">Add More</span>
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {blogItem.map((item: any, index) => (
            <Link key={index} href={`/admin/blogs/${item?.id}`}>
              <BlogCard item={item} />
            </Link>
          ))}
        </div>
        <ul className="flex items-center flex-wrap justify-between pt-10 pb-3">
          <li className="flex">
            Total:
            <sup className="font-medium text-2xl relative -top-3 px-2 ">50</sup>
            blogs
          </li>
          <li>
            <Pagination
              onPageChange={(v: any) => console.log(v)}
              {...dummyJson.meta}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
