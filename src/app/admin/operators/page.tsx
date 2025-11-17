"use client";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Pagination } from "@/components/reuseable/pagination";
import { dummyJson } from "@/components/view/user/dummy-json";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import useConfirmation from "@/provider/confirmation";
import Avatars from "@/components/reuseable/avater";
import { TableCell, TableRow } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";

export default function Operator() {
  const { confirm } = useConfirmation();
  const headers = [
    "Name",
    "Email",
    "Total events",
    "Total ticket sold",
    "Total earned",
    "Action",
  ];
  const isLoading = false;

  const data = [
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "up",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "down",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "up",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "up",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "down",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "up",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "down",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "up",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "up",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalEvents: 12,
      totalTickets: 600,
      totalEarned: "$1,200",
      seller: "up",
    },
  ];

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Operator",
      title: "You are going to delete this operator",
      description:
        "After deleting, this operator will no longer available in your system",
    });
    if (confirmed) {
      console.log(id);
    }
  };

  return (
    <div>
      <NavTitle
        title="Manage Operators"
        subTitle="Manage your system operators from this section"
      />
      <SearchBox onChange={(e) => console.log(e)} />
      <CustomTable
        headers={headers}
        pagination={
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                500
              </sup>
              operators
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => console.log(v)}
                {...dummyJson.meta}
              />
            </li>
          </ul>
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : data?.length > 0 ? (
          data?.map((item, index) => (
            <TableRow key={index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={""}
                    fallback={item.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.name}</span>
                  {item.seller === "up" ? (
                    <FavIcon name="top_seller" />
                  ) : (
                    <FavIcon name="verified" />
                  )}
                </div>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-6">{item.totalEvents}</h5>
              </TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-4">{item.totalTickets}</h5>
              </TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-4">{item.totalEarned}</h5>
              </TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <Link href={`/admin/operators/123`}>
                      <PreviewBtn />
                    </Link>
                  </li>
                  <li>
                    <DeleteBtn onClick={() => handleDelete("4343")} />
                  </li>
                </ul>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No operators` are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </CustomTable>
    </div>
  );
}
