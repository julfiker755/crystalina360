"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import NavTitle from "@/components/reuseable/nav-title";
import { QuillText } from "@/components/reuseable/text-editor";
import { Button } from "@/components/ui";
import BlogStatisticsChart from "@/components/view/admin/simple/blog-statistics-chart";
import FavIcon from "@/icon/favIcon";
import useConfirmation from "@/provider/confirmation";
import {
  useDeleteBlogMutation,
  useSlgBlogQuery,
} from "@/redux/api/admin/blogApi";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { confirm } = useConfirmation();
  const [deleteBlog] = useDeleteBlogMutation();
  const { data: blog } = useSlgBlogQuery(id);
  const { img, description, title, viewsByDate } = blog?.data || {};

  const handleDelete = async (ids: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Blog",
      title: "You are going to delete this blog",
      description:
        "After deleting, user's won't be able to find this blog in your system.",
    });
    if (confirmed) {
      const res = await deleteBlog(ids).unwrap();
      if (res.status) {
        router.back();
      }
    }
  };

  return (
    <div>
      <NavTitle
        title="Blogs"
        subTitle="Manage all of your blogs from this section"
      />
      <ul className="flex-between">
        <li>
          <BackBtn className="bg-figma-sidebar" iconStyle="text-primary" />
        </li>
        <li className="flex items-center space-x-3">
          <Link href={`/admin/blogs/edit/${id}`}>
            <Button size="lg">
              <FavIcon name="edit2" />
              Edit
            </Button>
          </Link>

          <Button
            onClick={() => handleDelete(id)}
            size="lg"
            className="bg-figma-danger"
          >
            <FavIcon name="delete_two" />
            Delete
          </Button>
        </li>
      </ul>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <ImgBox
          src={img || "/not.png"}
          className="lg:h-full w-full"
          alt="Blog Image"
        />
        <div className="lg:col-span-2">
          <BlogStatisticsChart data={viewsByDate} className="h-[330px]" />
        </div>
      </div>
      <div className="mt-6">
        <h5 className="text-xl font-medium">{title}</h5>
        <QuillText className="mb-10" text={description} />
      </div>
    </div>
  );
}
