"use client";
import { CSVLink } from "react-csv";
import useConfirmation from "@/provider/confirmation";
import { DeleteBtn } from "@/components/reuseable/btn";
import { CustomTable } from "@/components/reuseable/custom-table";
import NavTitle from "@/components/reuseable/nav-title";
import { Pagination } from "@/components/reuseable/pagination";
import SearchBox from "@/components/reuseable/search-box";
import { TableNoItem } from "@/components/reuseable/table-no-item";
import { TableSkeleton } from "@/components/reuseable/table-skeleton";
import {
  Badge,
  Button,
  Checkbox,
  TableCell,
  TableRow,
  Textarea,
} from "@/components/ui";
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
import { helpers, newsletSts } from "@/lib";
import { Sheet } from "lucide-react";
import Avatars from "@/components/reuseable/avater";
import { newsLetterOption } from "@/components/dummy-data";

const intState: any = {
  page: 1,
  isPreview: false,
  search: "",
  details: {},
  status: "userPurchase",
};

export default function Newsletter() {
  const { confirm } = useConfirmation();
  const [global, updateGlobal] = useGlobalState(intState);
  const [value] = useDebounce(global.search, 1000);
  const [deleteNewslet] = useDeleteNewsletMutation();
  const [replayNewslet, { isLoading: replayLoading }] =
    useReplayNewsletMutation();
  const [message, setMessage] = useState("");

  const { data: newsletter, isLoading } = useGetNewsletQuery({
    page: global.page,
    ...(value && { search: value }),
    status: global?.status,
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
        "bottom-right",
      );
      updateGlobal("isPreview", false);
      updateGlobal("details", {});
    }
  };

  const getTableColumns = () => {
    switch (global.status) {
      case newsletSts.userPurchase:
        return ["Name", "Email", "Tags", "Date", "Time", "Action"];
      case newsletSts.operatorSales:
        return ["Name", "Email", "Tags", "Date", "Time", "Action"];
      case newsletSts.userMetrics:
        return ["Name", "Email", "Purchase Count", "Purchase Amount", "Action"];
      case newsletSts.operatorMetrics:
        return ["Name", "Email", "Sales Count", "Sales Amount", "Action"];
      case newsletSts.userDisciplines:
        return ["Name", "Email", "Discipline Purchased", "Date", "Time", "Action"];
      case newsletSts.operatorDisciplines:
        return ["Name", "Email", "Discipline Sold", "Action"];
      case newsletSts.userEvent:
        return ["Name", "Email", "Event Purchase", "Action"];
      case newsletSts.operatorEvent:
        return ["Name", "Email", "Event Sold", "Action"];
      case newsletSts.purpose:
        return ["Name", "Email", "Purpose", "Action"];
      case newsletSts.duration:
        return ["Name", "Email", "Event Duration", "Action"];
      case newsletSts.price:
        return ["Name", "Email", "Price Bucket", "Action"];
      case newsletSts.capacity:
        return ["Name", "Email", "Average Capacity", "Event Capacity", "Action"];
      case newsletSts.subscribed:
        return ["Name", "Email", "Subscribed", "Action"];
      default:
        return [];
    }
  };

  const getCSVData = () => {
    return newsletter?.data?.map((item: any, idx: any) => {
      const row: any = {};
      row["S.No"] = idx + 1;
      getTableColumns().forEach((header) => {
        switch (header) {
          case "Name":
            row["Name"] = item.name;
            break;
          case "Email":
            row["Email"] = item.email;
            break;
          case "Tags":
            row["Tags"] = helpers.camelCaseText(item.tags);
            break;
          case "Date":
            row["Date"] = helpers.formatDate(item.last_purchase_date);
            break;
          case "Time":
            row["Time"] = helpers.formatTime(item.last_purchase_date);
            break;
          case "Date":
            row["Date"] = helpers.formatDate(item.last_sale_date);
            break;
          case "Time":
            row["Time"] = helpers.formatTime(item.last_sale_date);
            break;
          case "Purchase Count":
            row["Purchase Count"] = item.purchase_counts;
            break;
          case "Purchase Amount":
            row["Purchase Amount"] = item.purchase_amounts;
            break;
          case "Sales Count":
            row["Sales Count"] = item.sales_count;
            break;
          case "Sales Amount":
            row["Sales Amount"] = item.sales_amount;
            break;
          case "Discipline Purchased":
            row["Discipline Purchased"] = item.discipline_purchased?.join(", ") || "N/A";
            break;
          case "Discipline Sold":
            row["Discipline Sold"] = item.discipline_sold?.join(", ") || "N/A";
            break;
          case "Event Purchase":
            row["Event Purchase"] = item.event_type_purchase?.join(", ") || "N/A";
            break;
          case "Event Sold":
            row["Event Sold"] = item.event_type_sold?.join(", ") || "N/A";
            break;
          case "Purpose":
            row["Purpose"] = item.purpose?.join(", ") || "N/A";
            break;
          case "Event Duration":
            row["Event Duration"] = item.average_event_duration?.join(", ") || "N/A";
            break;
          case "Price Bucket":
            row["Price Bucket"] = item.price_bucket || "N/A";
            break;
          case "Average Capacity":
            row["Average Capacity"] = item.average_capacity || 0;
            break;
          case "Event Capacity":
            row["Event Capacity"] = item.event_capacity || 0;
            break;
          case "Subscribed":
            row["Subscribed"] = item.is_subscribed ? "Yes" : "No";
            break;
          default:
            break;
        }
      });
      return row;
    }) || [];
  };

  return (
    <div>
      <NavTitle
        title="Newsletter"
        subTitle="Manage Newsletter subscriptions of your systemn from this section"
      />
      <div className="flex items-center justify-between">
        <SearchBox onChange={(v: any) => updateGlobal("search", v)} />
        <CSVLink
          data={getCSVData()}
          filename={`newsletter_${global?.status}.csv`}
        >
          <Button>
            <Sheet />
            CSV
          </Button>
        </CSVLink>
      </div>
      <div className="border p-4 flex gap-4 flex-wrap rounded-md mt-7">
        {newsLetterOption?.map((item, idx) => (
          <ul key={idx} className="flex items-center space-x-2">
            <li>
              <Checkbox
                onCheckedChange={() => updateGlobal("status", item.value)}
                checked={global.status == item.value}
              />
            </li>
            <li>{item.label}</li>
          </ul>
        ))}
      </div>
      <CustomTable
        headers={getTableColumns()}
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
          <TableSkeleton colSpan={getTableColumns()?.length} tdStyle="!pl-2" />
        ) : newsletter?.data?.length > 0 ? (
          newsletter?.data?.map((item: any, index: any) => (
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
              {/* === userPurchase === */}
              {global.status === newsletSts.userPurchase && (
                <>
                  <TableCell>
                    <Badge>{helpers.camelCaseText(item.tags)}</Badge>
                  </TableCell>
                  <TableCell>
                    {helpers.formatDate(item.last_purchase_date)}
                  </TableCell>
                  <TableCell>
                    {helpers.formatTime(item.last_purchase_date)}
                  </TableCell>
                </>
              )}
              {/* === operatorSales === */}
              {global.status === newsletSts.operatorSales && (
                <>
                  <TableCell>
                    <Badge>{helpers.camelCaseText(item.tags)}</Badge>
                  </TableCell>
                  <TableCell>
                    {helpers.formatDate(item.last_sale_date)}
                  </TableCell>
                  <TableCell>
                    {helpers.formatTime(item.last_sale_date)}
                  </TableCell>
                </>
              )}
              {/* === userMetrics === */}
              {global.status === newsletSts.userMetrics && (
                <>
                  <TableCell>
                    <span className="ml-6">{item?.purchase_counts}</span>
                  </TableCell>
                  <TableCell>
                    <span className="ml-6">{item?.purchase_amounts}</span>
                  </TableCell>
                </>
              )}
              {/* === operatorMetrics === */}
              {global.status === newsletSts.operatorMetrics && (
                <>
                  <TableCell>
                    <span className="ml-6">{item?.sales_count}</span>
                  </TableCell>
                  <TableCell>
                    <span className="ml-6">{item?.sales_amount}</span>
                  </TableCell>
                </>
              )}
              {/* === user Disciplines === */}
              {global.status === newsletSts.userDisciplines && (
                <>
                  <TableCell>
                    <div className="flex flex-wrap  gap-1 w-[200px]">
                      {item?.discipline_purchased?.length > 0 ? (
                        item?.discipline_purchased?.map((item: any, idx: any) => (
                          <Badge key={idx}>{item}</Badge>
                        ))
                      ) : (<Badge>N/A</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {helpers.formatDate(item.last_purchase_date)}
                  </TableCell>
                  <TableCell>
                    {helpers.formatTime(item.last_purchase_date)}
                  </TableCell>
                </>
              )}
              {/* === operatorDisciplines === */}
              {global.status === newsletSts.operatorDisciplines && (
                <>
                  <TableCell>
                    <div className="flex flex-wrap  gap-1 w-[200px]">
                      {item?.discipline_sold?.length > 0 ? (
                        item?.discipline_sold?.map((item: any, idx: any) => (
                          <Badge key={idx}>{item}</Badge>
                        ))
                      ) : (<Badge>N/A</Badge>)}
                    </div>
                  </TableCell>
                </>
              )}
              {/* === userEvent === */}
              {global.status === newsletSts.userEvent && (
                <>
                  <TableCell>
                    <div className="flex flex-wrap  gap-1 w-[200px]">
                      {item?.event_type_purchase?.length > 0 ? (
                        item?.event_type_purchase?.map((item: any, idx: any) => (
                          <Badge key={idx}>{item}</Badge>
                        ))
                      ) : (<Badge>N/A</Badge>)}
                    </div>
                  </TableCell>
                </>
              )}
              {/* === operatorEvent === */}
              {global.status === newsletSts.operatorEvent && (
                <>
                  <TableCell>
                    <div className="flex flex-wrap  gap-1 w-[200px]">
                      {item?.event_type_sold?.length > 0 ? (
                        item?.event_type_sold?.map((item: any, idx: any) => (
                          <Badge key={idx}>{item}</Badge>
                        ))
                      ) : (<Badge>N/A</Badge>)}
                    </div>
                  </TableCell>
                </>
              )}
              {/* === purpose === */}
              {global.status === newsletSts.purpose && (
                <>
                  <TableCell>
                    <div className="flex flex-wrap  gap-1 w-[200px]">
                      {item?.purpose?.length > 0 ? (
                        item?.purpose?.map((item: any, idx: any) => (
                          <Badge key={idx}>{item}</Badge>
                        ))
                      ) : (<Badge>N/A</Badge>)}
                    </div>
                  </TableCell>
                </>
              )}
              {/*  === duration === */}
              {global.status === newsletSts.duration && (
                <>
                  <TableCell>
                    <div className="flex flex-wrap  gap-1 w-[200px]">
                      {item?.average_event_duration?.length > 0 ? (
                        item?.average_event_duration?.map((item: any, idx: any) => (
                          <Badge key={idx}>{helpers.camelCaseText(item)}</Badge>
                        ))
                      ) : (<Badge>N/A</Badge>)}
                    </div>
                  </TableCell>
                </>
              )}
              {/*  === price === */}
              {global.status === newsletSts.price && (
                <>
                  <TableCell>
                    <Badge>{item?.price_bucket || "N/A"}</Badge>
                  </TableCell>
                </>
              )}

              {/*  === capacity == */}
              {global.status === newsletSts.capacity && (
                <>
                  <TableCell>
                    <span className="ml-5">{item?.average_capacity || 0}</span>
                  </TableCell>
                  <TableCell>
                    <span className="ml-5">{item?.event_capacity || 0}</span>
                  </TableCell>
                </>
              )}
              {/*  === subscribed  == */}
              {global.status === newsletSts.subscribed && (
                <>
                  <TableCell>
                    <Badge>{item?.is_subscribed ? "Yes" : "No"}</Badge>
                  </TableCell>
                </>
              )}

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
            colSpan={getTableColumns()?.length}
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
