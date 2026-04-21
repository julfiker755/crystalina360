"use client";
import NavTitle from "@/components/reuseable/nav-title";
import { Pagination } from "@/components/reuseable/pagination";
import { Repeat } from "@/components/reuseable/repeat";
import SearchBox from "@/components/reuseable/search-box";
import { Button, Skeleton } from "@/components/ui";
import BlogCard from "@/components/view/user/reuse/blog-card";
import { useGlobalState } from "@/hooks";
import { useGetBlogQuery } from "@/redux/api/admin/blogApi";
import { useDebounce } from "use-debounce";
import { Plus } from "lucide-react";
import Link from "next/link";

const initState = {
  page: 1,
  search: "",
};

export default function Blog() {
  const [global, updateGlobal] = useGlobalState(initState);
  const [value] = useDebounce(global.search, 1000);
  const { data: blog, isLoading } = useGetBlogQuery({
    page: global.page,
    ...(value && { search: value }),
  });

  return (
    <div>
      <NavTitle
        title="Blogs"
        subTitle="Manage all of your blogs from this section"
      />
      <div className="flex-between gap-10">
        <SearchBox onChange={(v: any) => updateGlobal("search", v)} />
        <Link href="/admin/blogs/store">
          <Button type="button" size="lg" className="rounded-xl">
            <Plus />
            <span className="hidden md:block">Add More</span>
          </Button>
        </Link>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {isLoading ? (
            <Repeat count={10}>
              <Skeleton className="w-full h-60" />
            </Repeat>
          ) : (
            blog?.data?.map((item: any, index: any) => (
              <Link key={index} href={`/admin/blogs/${item?.id}`}>
                <BlogCard item={item} />
              </Link>
            ))
          )}
        </div>
        {blog?.meta?.total > 10 && (
          <ul className="flex items-center flex-wrap justify-between pt-10 pb-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                {blog?.meta?.total}
              </sup>
              blogs
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => updateGlobal("page", v)}
                {...blog?.meta}
              />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
