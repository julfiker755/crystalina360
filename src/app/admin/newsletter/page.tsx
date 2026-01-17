"use client";
import useConfirmation from "@/provider/confirmation";
import { DeleteBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import NavTitle from "@/components/reuseable/nav-title";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import { Button, TableCell, TableRow, Textarea } from "@/components/ui";
import { InputShow } from "@/components/reuseable/input-show";
import { useGlobalState } from "@/hooks";
import {
  useDeleteNewsletMutation,
  useGetNewsletQuery,
  useReplayNewsletMutation,
} from "@/redux/api/admin/newsletterApi";
import { useDebounce } from "use-debounce";
import { FormEvent, useState } from "react";
import sonner from "@/components/reuseable/sonner";
import Modal from "@/components/reuseable/modal";
import { helpers } from "@/lib";

const intState: any = {
  page: 1,
  isPreview: false,
  search: "",
  details: {},
};

export default function Newsletter() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const headers = ["Email", "Date", "Time", "Action"];
  const [value] = useDebounce(global.search, 1000);
  const [deleteNewslet] = useDeleteNewsletMutation();
  const [replayNewslet, { isLoading: replayLoading }] =
    useReplayNewsletMutation();
  const [message, setMessage] = useState("");

  const { data: newsletter, isLoading } = useGetNewsletQuery({
    page: global.page,
    ...(value && { search: value }),
  });

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Subscription",
      title: "You are going to delete this subscription",
      description:
        "After deleting, you won't be able to find this subscription in your system",
    });
    if (confirmed) {
      await deleteNewslet(id).unwrap();
    }
  };
  const id = global?.details?.id;
  // == replaySubmit ==
  const replaySubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = helpers.fromData({
      msg: message,
    });
    const res = await replayNewslet({ id, data }).unwrap();
    if (res.status) {
      setMessage("");
      sonner.success(
        "Reply Successful",
        "The newsletter reply email has been sent",
        "bottom-right"
      );
      updateGlobal("isPreview", false);
      updateGlobal("details", {});
    }
  };

  return (
    <div>
      <NavTitle
        title="Newsletter"
        subTitle="Manage Newsletter subscriptions of your systemn from this section"
      />
      <SearchBox onChange={(v: any) => updateGlobal("search", v)} />
      <CustomTable
        headers={headers}
        pagination={
          newsletter?.meta?.total > 10 ? (
            <ul className="flex items-center flex-wrap justify-between py-3">
              <li className="flex">
                Total:
                <sup className="font-medium text-2xl relative -top-3 px-2 ">
                  {newsletter?.meta?.total || 0}
                </sup>
                subscriptions
              </li>
              <li>
                <Pagination
                  onPageChange={(v: any) => updateGlobal("page", v)}
                  {...newsletter?.meta}
                />
              </li>
            </ul>
          ) : null
        }
      >
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} tdStyle="!pl-2" />
        ) : newsletter?.data?.length > 0 ? (
          newsletter?.data?.map((item: any, index: any) => (
            <TableRow key={index} className="border">
              <TableCell>{item.email}</TableCell>
              <TableCell>{helpers.formatDate(item.created_at)}</TableCell>
              <TableCell>{helpers.formatTime(item.created_at)}</TableCell>
              <TableCell>
                <ul className="flex gap-2">
                  <li>
                    <Button
                      className="bg-figma-delete  text-primary h-10"
                      onClick={() => {
                        updateGlobal("isPreview", true);
                        updateGlobal("details", item);
                      }}
                    >
                      Reply
                    </Button>
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
            title="No Newsletter are available at the moment"
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
        <form onSubmit={replaySubmit} className="space-y-5">
          <InputShow
            className="rounded-xl text-black"
            label="Email"
            value={global?.details?.email}
          />
          <div className="relative">
            <span className="text-blacks text-base font-medium bg-background absolute -top-3 left-5  px-3">
              Your message
            </span>
          </div>
          <Textarea
            className="sm:min-h-30 resize-none rounded-xl"
            placeholder="Type here..."
            required={true}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Textarea>
          <Button
            disabled={replayLoading}
            size="lg"
            className="rounded-xl w-full"
          >
            Send
          </Button>
        </form>
      </Modal>
    </div>
  );
}
