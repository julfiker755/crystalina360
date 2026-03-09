"use client";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { FromSelect2 } from "@/components/reuseable/from-select2";
import { FromTagInput } from "@/components/reuseable/from-tag";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import SearchBox from "@/components/reuseable/search-box";
import { SingleCalendar } from "@/components/reuseable/single-date";
import { Button, Checkbox, Label } from "@/components/ui";
import { useFileUpload } from "@/hooks/useFileUpload";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseable/from";
import Modal from "@/components/reuseable/modal";
import { useModalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { delivary_t, helpers } from "@/lib";
import { useEffect, useState } from "react";
import { UploadBtn } from "@/components/reuseable/btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSchemaEdit, getValuesOne } from "../element/default";
import TimeSelect from "../element/time-select";
import MultiDate from "../element/multi-date";
import PersonLimit from "../element/person-limit";
import { LocationDroupDown } from "../element/location";
import { AccessibilityBox } from "../element/accessibility";
import TicketQuantity from "../element/ticket-quantity";
import { useUpdateEventsMutation } from "@/redux/api/operator/opratorApi";
import { useRouter } from "next/navigation";
import {
  disciplineOptions,
  durationOptions,
  purposeItem,
} from "@/components/dummy-data";
import { ErrorInput } from "@/components/reuseable/error";
import sonner from "@/components/reuseable/sonner";
import { InputTime } from "@/components/reuseable/timeInput";
import { retreat_sc } from "@/schema";

const schema = retreat_sc.extend({
  img: retreat_sc.shape.img.optional(),
});

const initialState = {
  holistic: false,
  istime: false,
  isDate: false,
};

export default function RetreatEdit({
  msg,
  events_all,
}: {
  msg: string;
  events_all: any;
}) {
  const [searchText, setSearchText] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [state, setState] = useModalState(initialState);
  const [selAccbility, setSelAccbility] = useState<string[]>([]);
  const [isDelivery, setIsDelivery] = useState<any>("offline");
  const [selectDate, setSelectDate] = useState<any>([]);
  const defaultValues = getValuesOne(isDelivery, "200") as any;
  const defaultSchema = getSchemaEdit(isDelivery) as any;
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const from = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const id = events_all?.data?.event?.id;
  //  ================= default value set =============
  useEffect(() => {
    if (!events_all?.data?.event) return;
    const event = events_all.data.event;

    from.reset({
      delivery_type: event.delivery_type,
      event_purpose: event.event_purpose || "",
      event_title: event.event_title || "",
      event_description: event.event_description || "",
      holistic_discipline: event.holistic_discipline || [],
      event_date: event.event_date?.[0] || "",
      event_time: event.event_time?.[0] || [],
      event_duration: event.event_duration || "",
      tags: event.tags || [],
      city: event.city || "",
      province: event.province || "",
      region: event.region || "",
      country: event.country || "",
      price: event?.price?.toString() || "",
      accessibility: event.accessibility || [],
      ticket_quantity: "200",
      min_person: "1",
      max_person: "200",
    });
    setSelAccbility(event.accessibility || []);
    setSelectedTimes(event.event_time || []);
    setIsDelivery(event.delivery_type);
  }, [events_all]);

  // accept: "video/*",
  //   multiple: false
  const get = (v: any) => from.watch(v);
  const delivaryType = get("delivery_type") == delivary_t.ondemand;
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: delivaryType ? "video/*" : "image/*",
  });

  useEffect(() => {
    from.setValue("img", files[0]?.file);
    from.setValue("accessibility", selAccbility || []);
  }, [files, selAccbility]);

  const [updateEvents, { isLoading }] = useUpdateEventsMutation();

  const handleSubmit = async (values: FieldValues) => {
    const { ticket_quantity, max_person, min_person, img, ...rest } =
      values || {};
    const data = helpers.fromData({
      event_type: "retreat",
      ticket_quantity: "200",
      min_person: "1",
      max_person: "200",
      ...(img ? { img: img } : {}),
      ...rest,
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
      console.log(err);
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
            <div>
              <ImageBannerBox
                img={events_all?.data?.event?.img}
                files={files}
                getInputProps={getInputProps}
              />

              {!get("img") && (
                <ErrorInput
                  error={from?.formState?.errors?.img?.message as string}
                />
              )}
            </div>
            {/*  ------ Select Delivery Type --------  */}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                Select Delivery Type
              </label>
              <div className="flex gap-3">
                {[{ value: "offline", label: "Offline", icon: "offline" }]?.map(
                  (item) => (
                    <Button
                      key={item.value}
                      onClick={() => {
                        from.setValue("delivery_type", item.value);
                      }}
                      type="button"
                      className={`font-normal transition-colors border bg-transparent text-figma-black ${
                        item.value === get("delivery_type") &&
                        "bg-primary text-white"
                      }`}
                    >
                      <FavIcon
                        color={
                          item.value === get("delivery_type")
                            ? "#fff"
                            : undefined
                        }
                        name={item.icon as any}
                      />
                      {item.label}
                    </Button>
                  ),
                )}
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
                  {disciplineOptions?.slice(0, 10).map((item, idx) => (
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
            <LocationDroupDown />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SingleDateBox from={from} />
              <InputTime name="event_time" />
            </div>
            <PersonLimit read={true} />
            <TicketQuantity from={from} read={true} />
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
              <span className="relative z-10">
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
      {/*  =============== Select time slot Modal =================== */}
      <Modal
        open={state.istime}
        setIsOpen={(v) => setState("istime", v)}
        title="Create Time Slot"
        className="sm:max-w-xl"
        titleStyle="text-center"
      >
        <TimeSelect
          selectedTimes={selectedTimes}
          setSelectedTimes={setSelectedTimes}
          setState={setState}
          from={from}
        />
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

//  ----------------------single date --------------------
const SingleDateBox = ({ from }: any) => {
  const val = from.watch("event_date");
  return (
    <div>
      <SingleCalendar
        defaultDate={val}
        onChange={(value: any) => {
          from.setValue("event_date", helpers.formatDate(value, "YYYY-MM-DD"));
        }}
        className="h-10 text-black"
      />
      {!val && (
        <ErrorInput error={from?.formState?.errors?.event_date?.message} />
      )}
    </div>
  );
};
