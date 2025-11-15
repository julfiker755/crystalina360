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
import { dummyJson } from "@/components/view/user/dummy-json";
import { useGlobalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";

const intState = {
  page: 1,
  isPreview: false,
};

export default function Users() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const headers = ["Name", "Email", "Total Booked ", "Total Paid", "Action"];
  const isLoading = false;

  const data = [
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
    {
      name: "Elizabeth Olson",
      email: "example@gmail.com",
      totalBooked: 20,
      totalPaid: "$200",
      action: "View",
    },
  ];

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete user",
      title: "You are going to delete this user",
      description:
        "After deleting, this user will no longer available in your system",
    });
    if (confirmed) {
      console.log(id);
    }
  };

  return (
    <div>
      <NavTitle
        title="Manage users"
        subTitle="Manage your system users from this section"
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
              users
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => updateGlobal("page", v)}
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
                </div>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-6">{item.totalBooked}</h5>
              </TableCell>
              <TableCell>
                {" "}
                <h5 className="ml-4">{item.totalPaid}</h5>
              </TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <PreviewBtn
                      onClick={() => updateGlobal("isPreview", true)}
                    />
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
                src={""}
                fallback={"Julfiker"}
                alt="profile"
                fallbackStyle="aStyle"
              />
              <ul className="leading-5 mb-1">
                <li className="font-semibold">Md. Abid Hasan</li>
                <li className="text-figma-a_gray">example@gmail.com</li>
              </ul>
            </div>
            <DeleteBtn onClick={() => handleDelete("4343")} />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <EventCardSm
                icon="events_i"
                title="Total event bookings"
                value="15"
              />
              <EventCardSm
                icon="tickets_i"
                title="Total ticket bought"
                value="30"
              />
            </div>
            <EventCardSm icon="costed_" title="Total costed" value="$1,500" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function EventCardSm({ icon, title, value }: any) {
  return (
    <div className="flex items-center bg-[#EDEDED] p-3 rounded-xl gap-2 text-muted-foreground">
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
