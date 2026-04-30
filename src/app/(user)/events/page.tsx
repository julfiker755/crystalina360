"use client";
import EventCard, {
  SkeletonEventCard,
} from "@/components/reuseable/event-card";
import Modal2 from "@/components/reuseable/modal2";
import { Pagination } from "@/components/reuseable/pagination";
import { Repeat } from "@/components/reuseable/repeat";
import SearchBox from "@/components/reuseable/search-box";
import { SubTitle } from "@/components/reuseable/sub-title";
import { AppAlert, SortBox } from "@/components/view/user/reuse";
import { useGetUserEventsQuery } from "@/redux/api/user/userEventsApi";
import { NoItemData } from "@/components/reuseable/table-no-item";
import { useGlobalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";

const intGlobalState = {
  page: 1,
  search: "",
};

export default function ExploreAll() {
  const t = useTranslations("user.explore");
  const [isSort, setIsSort] = useState(false);
  const [global, updateGlobal] = useGlobalState(intGlobalState);
  const [value] = useDebounce(global.search, 1000);
  const [sortValue, setSortValue] = useState("");
  const { data: eventsItem, isLoading } = useGetUserEventsQuery({
    per_page: 9,
    page: global?.page,
    ...(value && { search: value }),
    ...(sortValue && { keyword: sortValue }),
  });

  const handleSubmit = (value: string) => {
    setIsSort(false);
    setSortValue(value);
  };

  return (
    <div className="container">
      <ul className="flex justify-between flex-wrap items-center pt-10 pb-5">
        <li>
          <SubTitle text={t("title")} />
        </li>
        <li className="flex items-center mt-3 md:mt-0 space-x-3">
          <SearchBox
            placeholder={t("search_hare")}
            onChange={(v: any) => updateGlobal("search", v)}
          />
          <h1
            onClick={() => setIsSort(!isSort)}
            className="bg-figma-input icon"
          >
            <FavIcon className="size-10" name="arrowUpDown" />
          </h1>
          <Link href="/events-filter/all">
            <h1 className="bg-figma-input icon">
              <FavIcon className="size-10" name="filter" />
            </h1>
          </Link>
        </li>
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {isLoading ? (
          <Repeat count={10}>
            <SkeletonEventCard />
          </Repeat>
        ) : eventsItem?.data?.length > 0 ? (
          eventsItem?.data?.map((item: any) => (
            <Link key={item.id} href={`/events/${item?.id}`}>
              <EventCard wish={true} item={item} />
            </Link>
          ))
        ) : (
          <NoItemData
            className="col-span-1 md:col-span-2 lg:col-span-3"
            title="No events found. Try adjusting your search or filters"
          />
        )}
      </div>
      <div className="flex justify-end my-10">
        <Pagination
          onPageChange={(v: any) => updateGlobal("page", v)}
          {...eventsItem?.meta}
        />
      </div>
      <AppAlert />
      {/*  =============  sort hare ========= */}
      <Modal2 open={isSort} setIsOpen={setIsSort}>
        <SortBox handleSubmit={handleSubmit}>
          <Button
            onClick={() => setIsSort(false)}
            className="w-full text-red-500 border  bg-transparent"
          >
            {t("close")}
          </Button>
        </SortBox>
      </Modal2>
    </div>
  );
}
