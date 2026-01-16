"use client";
import useConfirmation from "@/provider/confirmation";
import Avatars from "@/components/reuseable/avater";
import { DeleteBtn, PreviewBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import Modal from "@/components/reuseable/modal";
import NavTitle from "@/components/reuseable/nav-title";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { TableCell, TableRow } from "@/components/ui";
import { useGlobalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/api/admin/userApi";
import { useDebounce } from "use-debounce";

const intState: any = {
  page: 1,
  isPreview: false,
  search: "",
  details: {},
};

export default function Users() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const headers = ["Name", "Email", "Total Booked ", "Total Paid", "Action"];
  const [value] = useDebounce(global.search, 1000);
  const { data: users, isLoading } = useGetUsersQuery({
    page: global.page,
    ...(value && { search: value }),
  });
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete user",
      title: "You are going to delete this user",
      description:
        "After deleting, this user will no longer available in your system",
    });
    if (confirmed) {
      await deleteUser(id).unwrap();
      updateGlobal("details", {});
      updateGlobal("isPreview", false);
    }
  };

  return (
    <div>
      <NavTitle
        title="Manage users"
        subTitle="Manage your system users from this section"
      />
      <SearchBox onChange={(v: any) => updateGlobal("search", v)} />
      <CustomTable
        headers={headers}
        pagination={
          users?.meta?.total > 10 && (
            <ul className="flex items-center flex-wrap justify-between py-3">
              <li className="flex">
                Total:
                <sup className="font-medium text-2xl relative -top-3 px-2 ">
                  {users?.meta?.total}
                </sup>
                users
              </li>
              <li>
                <Pagination
                  onPageChange={(v: any) => updateGlobal("page", v)}
                  {...users?.meta}
                />
              </li>
            </ul>
          )
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : users?.data?.length > 0 ? (
          users?.data?.map((item: any, index: any) => (
            <TableRow key={index} className="border">
              <TableCell className="relative">
                <div className="flex items-center gap-3">
                  <Avatars
                    src={item.img || "/avater.png"}
                    fallback={item.name}
                    alt="profile"
                    fallbackStyle="aStyle"
                  />
                  <span>{item.name}</span>
                </div>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-6">{item.ticket_booked || 0}</h5>
              </TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-4">{item.total_paid || 0}</h5>
              </TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <PreviewBtn
                      onClick={() => {
                        updateGlobal("isPreview", true);
                        updateGlobal("details", item);
                      }}
                    />
                  </li>
                  <li>
                    <DeleteBtn onClick={() => handleDelete(item?.id)} />
                  </li>
                </ul>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem
            colSpan={headers?.length}
            title="No users are available at the moment"
            tdStyle="!bg-background"
          />
        )}
      </CustomTable>
      {/* ============== preview modal ============== */}
      <Modal
        open={global.isPreview}
        setIsOpen={(v: any) => updateGlobal("isPreview", v)}
        title="User Details"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between gap-2 border p-2 rounded-md">
            <div className="flex items-center gap-2">
              <Avatars
                src={global?.details?.img || "/avater.png"}
                fallback={global?.details?.name || ""}
                alt="profile"
                fallbackStyle="aStyle"
              />
              <ul className="leading-5 mb-1">
                <li className="font-semibold">{global?.details?.name}</li>
                <li className="text-figma-a_gray">{global?.details?.email}</li>
              </ul>
            </div>
            <DeleteBtn onClick={() => handleDelete(global?.details?.id)} />
          </div>
          <div className="bg-figma-delete w-full py-1 px-3 rounded-md">
            <div className="flex justify-between space-x-10">
              <div className="flex items-center">
                <FavIcon name="a_plans" />{" "}
                <span className="ml-2 text-base font-normal">Active plan:</span>
              </div>
              <div className="font-medium text-lg">Annual</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <EventCardSm
                icon="events_i"
                title="Total event bookings"
                value={global?.details?.total_event_bookings || 0}
              />
              <EventCardSm
                icon="tickets_i"
                title="Total ticket bought"
                value={global?.details?.total_ticket_bought || 0}
              />
            </div>
            <EventCardSm
              icon="costed_"
              title="Total costed"
              value={global?.details?.total_cost || 0}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function EventCardSm({ icon, title, value }: any) {
  return (
    <div className="flex items-center bg-figma-delete p-3 rounded-xl gap-2 text-muted-foreground">
      <span className="bg-white size-12 rounded-full grid place-items-center">
        {" "}
        <FavIcon name={icon} />
      </span>
      <div className="flex flex-col">
        <span className="text-base leading-4 text-primary">{title}</span>
        <span className="text-xl text-primary font-medium">{value}</span>
      </div>
    </div>
  );
}
