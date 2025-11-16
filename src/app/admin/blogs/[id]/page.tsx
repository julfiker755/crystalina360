"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { Button } from "@/components/ui";
import BlogStatisticsChart from "@/components/view/admin/simple/blog-statistics-chart";
import FavIcon from "@/icon/favIcon";
import { RandomImg } from "@/lib";
import useConfirmation from "@/provider/confirmation";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogDetails() {
  const { id } = useParams();
  const { confirm } = useConfirmation();

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Blog",
      title: "You are going to delete this blog",
      description:
        "After deleting, user's won't be able to find this blog in your system.",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <ul className="flex-between">
        <li>
          <BackBtn className="bg-figma-sidebar" iconStyle="text-primary" />
        </li>
        <li className="flex items-center space-x-3">
          <Link href={`/admin/blogs/edit/33`}>
            <Button size="lg">
              <FavIcon name="edit2" />
              Edit
            </Button>
          </Link>

          <Button
            onClick={() => handleDelete("1234")}
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
          src={RandomImg()}
          className="lg:h-full w-full"
          alt="Blog Image"
        />
        <div className="lg:col-span-2">
          <BlogStatisticsChart className="h-[330px]" />
        </div>
      </div>
      <div className="mt-6">
        <h5 className="text-xl font-medium">Blog title goes here..</h5>
        <p className="text-figma-black">
          Lorem ipsum dolor sit amet consectetur. At nunc vitae ac lacinia sed
          ullamcorper condimentum mollis. Quis fermentum commodo et sed. Lectus
          diam aliquam aliquet est lectus ultrices tristique et. Amet egestas
          duis vitae sed sit. Id et eget pulvinar aliquam feugiat hac accumsan
          tellus. Quis pharetra elit sed ultrices. At arcu commodo volutpat in
          et cursus. Aliquam elit ut dui tincidunt. Feugiat purus massa quis
          turpis aliquet fringilla fermentum. Aliquam lacus cras mattis lacus
          morbi. Leo dignissim a a metus consectetur. Amet felis feugiat sapien
          facilisis porta aliquam hendrerit malesuada. A vitae egestas morbi
          malesuada ullamcorper. Amet eu sagittis fringilla tincidunt
          consectetur cursus posuere libero. Convallis eget imperdiet accumsan
          habitant in gravida porta augue enim. Eget aliquam porttitor sem nibh.
          Turpis feugiat non tincidunt blandit quis pellentesque. In at dapibus
          interdum pellentesque pharetra mi nulla neque sed. Fermentum ac semper
          lacus egestas mauris lorem praesent ultrices ipsum.
        </p>
      </div>
    </div>
  );
}
