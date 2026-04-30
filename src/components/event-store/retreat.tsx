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
import { helpers } from "@/lib";
import { useEffect, useState } from "react";
import { UploadBtn } from "@/components/reuseable/btn";
import { ImgBox } from "@/components/reuseable/Img-box";
import { zodResolver } from "@hookform/resolvers/zod";
import { getGroupSchema, getValuesGroup } from "./element/default";
import TimeSelect from "./element/time-select";
import MultiDate from "./element/multi-date";
import { ErrorInput } from "../reuseable/error";
import PersonLimit from "./element/person-limit";
import { LocationDroupDown } from "./element/location";
import { AccessibilityBox } from "./element/accessibility";
import TicketQuantity from "./element/ticket-quantity";
import EmailCollent from "./element/email-collect";
import { useStoreEventsMutation } from "@/redux/api/operator/opratorApi";
import { useRouter } from "next/navigation";
import sonner from "../reuseable/sonner";
import { disciplineOptions, durationOptions, purposeItem } from "../dummy-data";
import { InputTime } from "../reuseable/timeInput";
import { cleanObject } from "@/lib/function-utils";
import { useTranslations } from "next-intl";

const initialState = {
  holistic: false,
  istime: false,
  isDate: false,
};

export default function RetreatStore({ msg }: { msg: string }) {
  const t = useTranslations("oprator.evStoreAll.store");
  const t1 = useTranslations("common");
  const [searchText, setSearchText] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [state, setState] = useModalState(initialState);
  const [selAccbility, setSelAccbility] = useState<string[]>([]);
  const [isDelivery, setIsDelivery] = useState<any>("offline");
  const [selectDate, setSelectDate] = useState<any>([]);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [emailAll, setAllEmail] = useState<string[]>([]);
  const defaultValues = getValuesGroup("retreat") as any;
  const defaultSchema = getGroupSchema("retreat") as any;

  const from = useForm({
    resolver: zodResolver(defaultSchema),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const get = (v: any) => from.watch(v);
  const [{ files }, { getInputProps, clearFiles }] = useFileUpload({
    accept: "image/*",
  });

  useEffect(() => {
    from.setValue("img", files[0]?.file);
  }, [files]);

  const resetFrom = (deliveryType: string) => {
    const values = getValuesGroup("retreat") as any;
    from.reset(values);
    setSelAccbility([]);
    setSelectDate([]);
    setIsDelivery(deliveryType);
    setSelectedTimes([]);
    clearFiles();
  };

  const [storeEvents, { isLoading }] = useStoreEventsMutation();

  const handleSubmit = async (values: FieldValues) => {
    const valuedata = cleanObject(values);
    const data = helpers.fromData({
      event_type: "retreat",
      ...valuedata,
    });

    try {
      const res = await storeEvents({
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
        resetFrom(get("delivery_type"));
        router.back();
        sonner.success(t("event_added_success"), msg, "bottom-right");
        setProgress(0);
      }
    } catch (err: any) {
      setProgress(0);
      sonner.error("Error", err?.data?.error, "bottom-right");
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
              <ImageBannerBox files={files} getInputProps={getInputProps} />
              {!get("img") && (
                <ErrorInput
                  className="text-red-400 text-sm"
                  error={from?.formState?.errors?.img?.message as string}
                />
              )}
            </div>
            {/*  ------ Select Delivery Type --------  */}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                {t("select_delivery_type")}
              </label>
              <div className="flex gap-3">
                {[{ value: "offline", label: "Offline", icon: "offline" }]?.map(
                  (item) => (
                    <Button
                      key={item.value}
                      onClick={() => {
                        resetFrom(item.value);
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
                      {t(`delivery_type.${item.value}`)}
                    </Button>
                  ),
                )}
              </div>
            </div>
            {/* --------  Select Event Purpose --------- */}
            <div>
              <label className="block text-lg mb-2 font-semibold">
                {t("select_event_purpose")}
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
                    {t(`event_purpose.${item.value}`)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Holistic Discipline */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-lg font-semibold">
                  {t("holistic_discipline")}
                </label>
                <button className="text-sm text-primary">
                  {t("select_or_more")}
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
                      <span>{t1(`holistic.${item.key}`)}</span>
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
              label={t("event_title")}
              placeholder={t("enter_title_placeholder")}
              className="h-10"
            />

            <FromTextarea2
              name="event_description"
              label={t("description")}
              placeholder={t("description_placeholder")}
              className="min-h-30"
            />
            <LocationDroupDown />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SingleDateBox from={from} />
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
            <FromTagInput name="tags" label={t("tags")} className="py-2" />
            <EmailCollent emailAll={emailAll} setAllEmail={setAllEmail} />
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
                {isLoading ? t("btn_waiting") : t("btn_submit")}
              </span>
            </Button>
          </div>
        </div>
      </Form>
      {/*  =============== Select holistic descipline Modal =================== */}
      <Modal
        open={state.holistic}
        setIsOpen={(v) => setState("holistic", v)}
        title={t("select_holistic_descipline")}
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
                <span>{t1(`holistic.${item.key}`)}</span>
              </label>
            ))}
        </div>
      </Modal>
      {/*  =============== Select time slot Modal =================== */}
      <Modal
        open={state.istime}
        setIsOpen={(v) => setState("istime", v)}
        title={t("create_time_slot")}
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
const ImageBannerBox = ({ files, getInputProps }: any) => {
  const t = useTranslations("oprator.evStoreAll.store");
  return (
    <Label
      htmlFor="image"
      className="border-2 p-1 cursor-pointer border-dashed border-primary rounded-lg flex flex-col items-center justify-center h-60 overflow-hidden"
    >
      {files[0]?.preview ? (
        <ImgBox
          src={files[0].preview}
          alt="img"
          className="w-full h-full object-cover rounded-md"
        >
          <UploadBtn />
        </ImgBox>
      ) : (
        <>
          <FavIcon name="upload2" />
          <p className="text-center mt-2 text-figma-black">
            {t("upload_event_banner_image")}
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

//  ----------------------single date --------------------
const SingleDateBox = ({ from }: any) => {
  const val = from.watch("event_date");
  return (
    <div>
      <SingleCalendar
        onChange={(value: any) => {
          from.setValue("event_date", helpers.formatDate(value, "YYYY-MM-DD"));
        }}
        className="h-10 text-black"
      />
      {!val && (
        <ErrorInput
          className="text-red-400 text-sm"
          error={from?.formState?.errors?.event_date?.message}
        />
      )}
    </div>
  );
};
