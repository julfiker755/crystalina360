"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import useConfirmation from "@/provider/confirmation";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogDetails() {
  const { id } = useParams();
  const { confirm } = useConfirmation();

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Coupon",
      title: "You are going to delete this coupon",
      description:
        "After deleting, user's won't be able to find this coupon in your system.",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <ul className="flex items-center justify-between">
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
    </div>
  );
}
