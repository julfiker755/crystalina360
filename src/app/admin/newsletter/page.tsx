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
import { Button, TableCell, TableRow, Textarea } from "@/components/ui";
import { dummyJson } from "@/components/view/user/dummy-json";
import { useGlobalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { InputShow } from "@/components/reuseable/input-show";

const intState = {
  page: 1,
  isPreview: false,
};

export default function Newsletter() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const headers = ["Email", "Date", "Time", "Action"];
  const isLoading = false;

  const data = [
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
    {
      email: "example@gmail.com",
      date: "5 Sep, 2025",
      time: "10:00 AM",
      action: "Reply",
    },
  ];

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Subscription",
      title: "You are going to delete this subscription",
      description:
        "After deleting, you won't be able to find this subscription in your system",
    });
    if (confirmed) {
      console.log(id);
    }
  };

  return (
    <div>
      <NavTitle
        title="Newsletter"
        subTitle="Manage Newsletter subscriptions of your systemn from this section"
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
              subscriptions
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
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.time}</TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <Button
                      className="bg-figma-delete  text-primary h-10"
                      onClick={() => updateGlobal("isPreview", true)}
                    >
                      Reply
                    </Button>
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
        title="Replying to"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <div className="space-y-5">
          <InputShow
            className="rounded-xl"
            label="Email"
            value="example@gmail.com"
          />
          <div className="relative">
            <span className="text-blacks text-base font-medium bg-background absolute -top-3 left-5  px-3">
              Your message
            </span>
          </div>
          <Textarea
            className="sm:min-h-30 resize-none rounded-xl"
            placeholder="Type here..."
          ></Textarea>
          <Button size="lg" className="rounded-xl w-full">
            Send
          </Button>
        </div>
      </Modal>
    </div>
  );
}
