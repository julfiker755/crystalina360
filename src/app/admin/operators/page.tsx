"use client";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Pagination } from "@/components/reuseable/pagination";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import useConfirmation from "@/provider/confirmation";
import Avatars from "@/components/reuseable/avater";
import { TableCell, TableRow } from "@/components/ui";
import {
  useDeleteUserMutation,
  useGetOperatorQuery,
} from "@/redux/api/admin/userApi";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";
import { useGlobalState } from "@/hooks";
import { useDebounce } from "use-debounce";

const intState = {
  page: 1,
  search: "",
};

export default function Operator() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const [value] = useDebounce(global.search, 1000);
  const headers = [
    "Name",
    "Email",
    "Total events",
    "Total ticket sold",
    "Total earned",
    "Action",
  ];
  const { data: operators, isLoading } = useGetOperatorQuery({
    page: global.page,
    ...(value && { search: value }),
  });
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Operator",
      title: "You are going to delete this operator",
      description:
        "After deleting, this operator will no longer available in your system",
    });
    if (confirmed) {
      await deleteUser(id).unwrap();
    }
  };

  return (
    <div>
      <NavTitle
        title="Manage Operators"
        subTitle="Manage your system operators from this section"
      />
      <SearchBox onChange={(e) => updateGlobal("search", e)} />
      <CustomTable
        headers={headers}
        pagination={
          operators?.meta?.total > 10 && (
            <ul className="flex items-center flex-wrap justify-between py-3">
              <li className="flex">
                Total:
                <sup className="font-medium text-2xl relative -top-3 px-2 ">
                  {operators?.meta?.total}
                </sup>
                operators
              </li>
              <li>
                <Pagination
                  onPageChange={(v: any) => updateGlobal("page", v)}
                  {...operators?.meta}
                />
              </li>
            </ul>
          )
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : operators?.data?.length > 0 ? (
          operators?.data?.map((item: any, index: any) => (
            <TableRow key={index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={item?.img || "/avater.png"}
                    fallback={item.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.name}</span>
                  {item.is_top_seller === true ? (
                    <FavIcon name="top_seller" />
                  ) : (
                    <FavIcon className="size-5" name="verified" />
                  )}
                </div>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-6">{item.total_events}</h5>
              </TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-4">{item.total_tickets_sold}</h5>
              </TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-4">{item.total_earned}</h5>
              </TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <Link href={`/admin/operators/${item.id}`}>
                      <PreviewBtn />
                    </Link>
                  </li>
                  <li>
                    <DeleteBtn onClick={() => handleDelete(item.id)} />
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
