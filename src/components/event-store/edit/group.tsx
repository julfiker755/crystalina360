"use client";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { FromSelect2 } from "@/components/reuseable/from-select2";
import { FromTagInput } from "@/components/reuseable/from-tag";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import SearchBox from "@/components/reuseable/search-box";
import { Button, Checkbox, Label } from "@/components/ui";
import { useFileUpload } from "@/hooks/useFileUpload";
import { FieldValues, useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import Form from "@/components/reuseable/from";
import Modal from "@/components/reuseable/modal";
import { useModalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { delivary_t, helpers } from "@/lib";
import { useEffect, useState } from "react";
import { UploadBtn } from "@/components/reuseable/btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonLimit from "../element/person-limit";
import { LocationDroupDown } from "../element/location";
import { AccessibilityBox } from "../element/accessibility";
import TicketQuantity from "../element/ticket-quantity";
import { useUpdateEventsMutation } from "@/redux/api/operator/opratorApi";
import { useRouter } from "next/navigation";
import sonner from "@/components/reuseable/sonner";
import { ErrorInput } from "@/components/reuseable/error";
import {
  delivaryOptions,
  disciplineOptions,
  durationOptions,
  purposeItem,
} from "@/components/dummy-data";
import { InputTime } from "@/components/reuseable/timeInput";
import { getGroupSchemaEdit, getValuesGroup } from "../element/default";
import { FromInput } from "@/components/reuseable/form-input";
import MultiDate from "../element/multi-date";
import { cleanObject } from "@/lib/function-utils";

const initialState = {
  holistic: false,
  istime: false,
  isDate: false,
};

export default function GroupEdit({
  msg,
  events_all,
}: {
  msg: string;
  events_all: any;
}) {
  const [searchText, setSearchText] = useState("");
  const [selectDate, setSelectDate] = useState<any>([]);
  const [state, setState] = useModalState(initialState);
  const [selAccbility, setSelAccbility] = useState<string[]>([]);
  const [isDelivery, setIsDelivery] = useState<any>("offline");
  const defaultValues = getValuesGroup(isDelivery) as any;
  const defaultSchema = getGroupSchemaEdit(isDelivery) as any;
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const from = useForm({
    resolver: zodResolver(defaultSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const id = events_all?.data?.event?.id;

  //  ================= default value set =============
  useEffect(() => {
    if (!events_all?.data?.event) return;
    const event = events_all.data.event;
    const cloneobj = {
      delivery_type: event.delivery_type || "",
      event_purpose: event.event_purpose || "",
      event_title: event.event_title || "",
      event_description: event.event_description || "",
      holistic_discipline: event.holistic_discipline || [],
    };

    if (event?.delivery_type == delivary_t.offline) {
      //   === offline ===
      const offlineObj = {
        event_time: event.event_time?.[0] || "",
        event_date: event.event_date || [],
        event_duration: event.event_duration || "",
        tags: event.tags || [],
        city: event.city || "",
        province: event.province || "",
        region: event.region || "",
        country: event.country || "",
        price: event?.price?.toString() || "",
        accessibility: event.accessibility || [],
        ticket_quantity: event?.ticket_quantity?.toString() || "",
        min_person: event?.min_person?.toString() || "",
        max_person: event.max_person?.toString() || "",
        ...cloneobj,
      };
      from.reset(offlineObj);
      setSelAccbility(event.accessibility || []);
      setSelectDate(event?.event_date || []);
    } else if (event?.delivery_type === delivary_t.online) {
      //  === online ===
      const onlineObj = {
        event_time: event?.event_time?.[0] || "",
        event_date: event?.event_date || [],
        tags: event.tags || [],
        price: event?.price?.toString() || "",
        ticket_quantity: event?.ticket_quantity?.toString() || "",
        min_person: event?.min_person?.toString() || "",
        max_person: event.max_person?.toString() || "",
        ...cloneobj,
      };
      from.reset(onlineObj);
      setSelectDate(event.event_date || []);
    } else if (event?.delivery_type === delivary_t.ondemand) {
      //  === ondemand ===
      const ondemandObj = {
        event_date: event.event_date?.[0] || "",
        event_time: event.event_time?.[0] || [],
        price: event?.price?.toString() || "",
        city: event.city || "",
        province: event.province || "",
        region: event.region || "",
        country: event.country || "",
        tags: event.tags || [],
        ...cloneobj,
      };
      from.reset(ondemandObj);
    }

    // UI related states
    setIsDelivery(event.delivery_type);
  }, [events_all]);

  const get = (v: any) => from.watch(v);
  const delivaryType = get("delivery_type") == delivary_t.ondemand;
  const [{ files }, { getInputProps }] = useFileUpload({
    accept: delivaryType ? "video/*" : "image/*",
  });

  useEffect(() => {
    from.setValue("img", files[0]?.file);
    from.setValue("accessibility", selAccbility || []);
  }, [files, selAccbility]);

  const [updateEvents, { isLoading }] = useUpdateEventsMutation();

  const handleSubmit = async (values: FieldValues) => {
    const { img, ...rest } = values || {};
    const valuedata = cleanObject({
      ...rest,
    });
    const data = helpers.fromData({
      event_type: "group",
      ...(img ? { img: img } : {}),
      ...valuedata,
    });

    try {
      const res = await updateEvents({
        id,
        data,
        onUploadProgress: (progressEvent: ProgressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setProgress(progress);
          }
        },
      }).unwrap();
      if (res.status) {
        router.back();
        sonner.success(
          "Event Updated Successfully",
          "The event has been successfully updated.",
          "bottom-right",
        );
        setProgress(0);
      }
    } catch (err: any) {
      sonner.error("Error", err?.data?.error, "bottom-right");
      setProgress(0);
    }
  };

  const toggleHolistic = (value: any) => {
    const current = from.getValues("holistic_discipline") || [];
    if (current.includes(value as never)) {
      from.setValue(
        "holistic_discipline",
        current.filter((v: any) => v !== value),
      );
    } else {
      from.setValue("holistic_discipline", [...current, value] as any);
    }
  };

  return (
    <div>
      <Form className="py-15" from={from} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {delivaryType ? (
              <div>
                <VideoBannerBox
                  files={files}
                  getInputProps={getInputProps}
                  img={events_all?.data?.event?.img}
                />
                {!get("img") && (
                  <ErrorInput
                    className="text-red-400 text-sm"
                    error={from?.formState?.errors?.img?.message as string}
                  />
                )}
              </div>
            ) : (
              <div>
                <ImageBannerBox
                  files={files}
                  getInputProps={getInputProps}
                  img={events_all?.data?.event?.img}
                />
                {!get("img") && (
                  <ErrorInput
                    className="text-red-400 text-sm"
                    error={from?.formState?.errors?.img?.message as string}
                  />
                )}
              </div>
            )}
            {/*  ------ Select Delivery Type --------  */}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                Select Delivery Type
              </label>
              <div className="flex gap-3">
                {delivaryOptions?.map((item) => {
                  const current = get("delivery_type");

                  return (
                    <Button
                      key={item.value}
                      type="button"
                      disabled={current !== item.value}
                      className={`font-normal transition-colors border bg-transparent text-figma-black
                                 ${item.value === current && "bg-primary text-white"}
                                 ${current !== item.value && "opacity-50 cursor-not-allowed"}
                               `}
                    >
                      <FavIcon
                        color={item.value === current ? "#fff" : undefined}
                        name={item.icon as any}
                      />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            {/* --------  Select Event Purpose --------- */}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                Select Event Purpose
              </label>
              <div className="flex gap-3">
                {purposeItem?.map((item) => (
                  <Button
                    key={item.value}
                    onClick={() => {
                      from.setValue("event_purpose", item.value);
                    }}
                    className={`font-normal transition-colors trans border bg-transparent text-figma-black ${
                      item.value == get("event_purpose") &&
                      "bg-primary text-white"
                    }`}
                    type="button"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Holistic Discipline */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-lg font-semibold">
                  Holistic Discipline
                </label>
                <button className="text-sm text-primary">
                  Select 1 or more
                </button>
              </div>
              <div>
                <div className="border p-3 flex items-center flex-wrap gap-3 rounded-md">
                  {disciplineOptions.slice(0, 10).map((item, idx) => (
                    <label key={idx} className="flex items-center gap-3">
                      <Checkbox
                        checked={get("holistic_discipline")?.includes(
                          item.value as never,
                        )}
                        onCheckedChange={() => toggleHolistic(item.value)}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                  <h5
                    onClick={() => setState("holistic", true)}
                    className="font-semibold cursor-pointer"
                  >
                    ...more
                  </h5>
                </div>

                {get("holistic_discipline")?.length == 0 && (
                  <ErrorInput
                    className="text-red-400 text-sm"
                    error={
                      from?.formState?.errors?.holistic_discipline
                        ?.message as string
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <FromInput2
              name="event_title"
              label="Event Title"
              placeholder="Enter your title"
              className="h-10"
            />

            <FromTextarea2
              name="event_description"
              label="Description"
              placeholder="Enter your description"
              className="min-h-30"
            />
            {/*  type  ------------ */}
            {get("delivery_type") === delivary_t.offline ? (
              //  ===================== offline ==========================
              <>
                <LocationDroupDown />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <MultipleDate from={from} setState={setState} />
                  <InputTime name="event_time" />
                </div>
                <PersonLimit />
                <TicketQuantity from={from} />
                <FromSelect2
                  items={durationOptions}
                  name="event_duration"
                  placeholder="-Select duration-"
                  className="rounded-md"
                />
                <AccessibilityBox
                  selAccbility={selAccbility}
                  setSelAccbility={setSelAccbility}
                />
                <FromTagInput name="tags" label="Tags" className="py-2" />
              </>
            ) : from.watch("delivery_type") === "online" ? (
              //  ============================= online =====================
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <MultipleDate from={from} setState={setState} />
                  <InputTime name="event_time" />
                </div>
                <PersonLimit />
                <TicketQuantity from={from} />
                <FromTagInput name="tags" label="Tags" className="py-2" />
              </>
            ) : (
              from.watch("delivery_type") === "ondemand" && (
                <>
                  <LocationDroupDown />
                  <div>
                    <div className="h-10 flex items-center justify-between px-2 border rounded-md">
                      <span className="flex items-center">
                        <FavIcon className="size-5" name="price22" />
                        <span className="ml-1">Price</span>
                      </span>
                      <FromInput
                        name="price"
                        className="w-[300px] h-10 bg-transparent p-0"
                        type="number"
                        placeholder="Price here"
                        err={false}
                      />
                    </div>
                    <ErrorInput
                      className="text-red-400 text-sm"
                      error={from?.formState?.errors?.price?.message as string}
                    />
                  </div>
                  <FromTagInput name="tags" label="Tags" className="py-2" />
                </>
              )
            )}

            {/* Submit Button */}
            <Button
              disabled={isLoading}
              className="w-full relative disabled:opacity-100"
            >
              <div
                className={`absolute top-0 z-0 left-0  h-full rounded-md bg-[#3990dceb]`}
                style={{
                  width: `${progress}%`,
                }}
              ></div>
              <span className="relative z-10 ">
                {isLoading ? "Waiting..." : "Submit"}
              </span>
            </Button>
          </div>
        </div>
      </Form>
      {/*  =============== Select holistic descipline Modal =================== */}
      <Modal
        open={state.holistic}
        setIsOpen={(v) => setState("holistic", v)}
        title="Select Holistic Descipline"
        className="sm:max-w-4xl"
        titleStyle="text-center"
      >
        <SearchBox
          className="w-full mx-auto"
          onChange={(value) => setSearchText(value)}
        />
        <div className="flex items-center flex-wrap gap-3 pt-5 pb-6">
          {disciplineOptions
            ?.filter((item) =>
              helpers
                .lowerCase(item?.label)
                .includes(helpers.lowerCase(searchText)),
            )
            ?.map((item, idx) => (
              <label key={idx} className="flex items-center gap-3">
                <Checkbox
                  checked={from
                    .watch("holistic_discipline")
                    ?.includes(item.value as never)}
                  onCheckedChange={() => toggleHolistic(item.value)}
                />
                <span>{item.label}</span>
              </label>
            ))}
        </div>
      </Modal>
      {/*  === date === */}
      <Modal
        open={state.isDate}
        setIsOpen={(v) => setState("isDate", v)}
        title="Create Date Slot"
        className="sm:max-w-xl"
        titleStyle="text-center"
      >
        <MultiDate
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          from={from}
          setState={setState}
        />
      </Modal>
    </div>
  );
}
//  -------------------------------------------------------------- X ----------------------------------------------------------
//  ================= image box ================
const ImageBannerBox = ({ files, getInputProps, img }: any) => {
  return (
    <Label
      htmlFor="image"
      className="border-2 p-1 cursor-pointer border-dashed border-primary rounded-lg flex flex-col items-center justify-center h-60 overflow-hidden"
    >
      {files[0]?.preview || img ? (
        <ImgBox
          src={files[0]?.preview || img}
          alt="img"
          className="w-full h-full object-cover rounded-md"
        >
          <UploadBtn />
        </ImgBox>
      ) : (
        <>
          <FavIcon name="upload2" />
          <p className="text-center mt-2 text-figma-black">
            Upload event banner image
          </p>
        </>
      )}
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
        id="image"
      />
    </Label>
  );
};
//  ================= video box ================
const VideoBannerBox = ({ files, getInputProps, img }: any) => {
  return (
    <Label
      htmlFor="image"
      className="border-2 p-1 cursor-pointer border-dashed border-primary rounded-lg flex flex-col items-center justify-center h-60 overflow-hidden"
    >
      {files[0]?.preview || img ? (
        <div className="relative w-full">
          <video
            key={files[0]?.preview || img}
            autoPlay
            loop
            playsInline
            muted
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          >
            <source src={files[0]?.preview || img} />
            Your browser does not support the video tag.
          </video>
          <UploadBtn />
        </div>
      ) : (
        <>
          <FavIcon name="upload2" />
          <p className="text-center mt-2 text-figma-black">
            Upload pre recorded video
          </p>
        </>
      )}
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
        id="image"
      />
    </Label>
  );
};

//  ------------ multiple date ---------------------
const MultipleDate = ({ from, setState }: any) => {
  const val = from.watch("event_date");
  return (
    <div className="w-full">
      <Button
        onClick={() => setState("isDate", true)}
        type="button"
        className="flex h-10 w-full  bg-transparent border text-black font-normal justify-between items-center"
      >
        <span>
          {val?.length > 0 ? `${val?.length} date slot` : "Create date slot"}
        </span>{" "}
        <ChevronRight />
      </Button>
      {val?.length === 0 && (
        <ErrorInput
          className="text-sm text-red-400"
          error={from?.formState?.errors?.event_date?.message}
        />
      )}
    </div>
  );
};
