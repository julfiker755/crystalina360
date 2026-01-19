"use client";
import { ImgBox } from "@/components/reuseable/Img-box";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import useConfirmation from "@/provider/confirmation";
import { Button, Skeleton } from "@/components/ui";
import { useGlobalState, useModalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import { CircleAlert, Plus } from "lucide-react";
import Modal from "@/components/reuseable/modal";
import PromoPerforChart from "@/components/view/admin/simple/promo-perfor-chart";
import { FieldValues, useForm } from "react-hook-form";
import ModalHeading from "@/components/reuseable/modal-heading";
import Form from "@/components/reuseable/from";
import { FromInput2 } from "@/components/reuseable/form-input2";
import Modal2 from "@/components/reuseable/modal2";
import { SingleCalendar } from "@/components/reuseable/single-date";
import { banner_st, banner_st_up } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import ImgUpload from "@/components/reuseable/img-upload";
import { UploadBtn } from "@/components/reuseable/btn";
import {
  useDeletePromotionMutation,
  useGetPromotionQuery,
  useSlgPromotionQuery,
  useStorePromotionMutation,
  useUpdatePromotionMutation,
} from "@/redux/api/admin/promotionApi";
import { Repeat } from "@/components/reuseable/repeat";
import { Pagination } from "@/components/reuseable/pagination";
import { useDebounce } from "use-debounce";
import { helpers } from "@/lib";
import sonner from "@/components/reuseable/sonner";

const initState = {
  isPreview: false,
  isStore: false,
  isUpdate: false,
};

const intState: any = {
  page: 1,
  search: "",
  id: "",
};

export default function Promotions() {
  const { confirm } = useConfirmation();
  const [state, setState] = useModalState(initState);
  const [global, updateGlobal] = useGlobalState(intState);
  const [details, setDetails] = useState(null);
  const [value] = useDebounce(global.search, 1000);
  const { data, isLoading } = useGetPromotionQuery({
    page: global.page,
    ...(value && { search: value }),
  });
  const [deletePromotion] = useDeletePromotionMutation();
  const { data: del } = useSlgPromotionQuery(global.id, { skip: !global?.id });

  const stash = [
    {
      icon: "running",
      title: "Currently Running Promotion",
      value: data?.currentlyRunning,
    },
    {
      icon: "total_promotion",
      title: "Total Promotions",
      value: data?.totalBanner,
    },
  ];

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Banner",
      title: "You are going to delete this banner",
      description:
        "After deleting, user's won't be able to find this banner in your system.",
    });
    if (confirmed) {
      await deletePromotion(id).unwrap();
    }
  };

  return (
    <div>
      <NavTitle
        title="Manage Promotions"
        subTitle="Manage your promotions from this section"
      />
      <SearchBox onChange={(v) => updateGlobal("search", v)} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-10">
        {stash.map((item) => (
          <div
            key={item.title}
            className="flex bg-figma-sidebar space-y-1 py-10 rounded-xl flex-col items-center"
          >
            <FavIcon name={item.icon as any} />
            <p className="text-center text-black">{item.title}</p>
            <p className="text-center font-bold text-black text-2xl lg:text-3xl">
              {item.value || 0}
            </p>
          </div>
        ))}
        <div className="flex bg-figma-sidebar py-10 rounded-xl flex-col items-center justify-center">
          <Button
            onClick={() => setState("isStore", true)}
            type="button"
            size="lg"
            className="rounded-xl"
          >
            <Plus />
            <span>Add a New banner</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        {isLoading ? (
          <Repeat count={10}>
            <Skeleton className="w-full h-63 rounded-md" />
          </Repeat>
        ) : (
          data?.promo?.data?.map((item: any) => (
            <div key={item.id}>
              <ImgBox
                src={item?.img || "/not.png"}
                className="w-full h-[250px]"
                alt={item.name}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%)",
                  }}
                  className="absolute inset-0  transition-colors"
                />
                <div>
                  <div className="absolute top-3 right-3 flex gap-2 transition-opacity [&_button]:bg-[#FFFFFF]/20 [&_button]:cursor-pointer [&_button]:grid [&_button]:place-items-center [&_button]:size-11 [&_button]:backdrop-blur-[15px] [&_button]:rounded-md">
                    <button
                      onClick={() => {
                        setState("isPreview", true);
                        updateGlobal("id", item.id);
                      }}
                      aria-label="View"
                    >
                      <FavIcon color="#fff" name="preview" />
                    </button>
                    <button
                      onClick={() => {
                        setState("isUpdate", true);
                        setDetails(item);
                      }}
                      aria-label="Edit"
                    >
                      <FavIcon color="#fff" name="pencil00" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      aria-label="Delete"
                    >
                      <FavIcon color="#ff8080" name="delete_two" />
                    </button>
                  </div>
                </div>
                <div className="absolute bottom-0 flex flex-col justify-between p-4 text-white">
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {item.name}
                    </h3>
                    <p className="text-base text-white">{item.email}</p>
                  </div>
                </div>
              </ImgBox>
            </div>
          ))
        )}
        { }
      </div>
      {data?.promo?.meta?.total > 10 && (
        <ul className="flex items-center flex-wrap justify-between py-3">
          <li className="flex">
            Total:
            <sup className="font-medium text-2xl relative -top-3 px-2">
              {data?.promo?.meta?.total}
            </sup>
            podcasts
          </li>
          <li>
            <Pagination
              onPageChange={(v: any) => updateGlobal("page", v)}
              {...data?.promo?.meta}
            />
          </li>
        </ul>
      )}
      {/* =================== is Preview ================== */}
      <Modal
        title="Promotion Details"
        open={state.isPreview}
        setIsOpen={(v) => setState("isPreview", v)}
        titleStyle="text-center"
        className="sm:max-w-3xl"
      >
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex items-center space-x-2">
              <FavIcon name="client_details" />
              <span className="text-2xl font-medium">Client Details</span>
            </div>
            <div className="flex items-center space-x-2">
              <FavIcon className="size-8" stroke="#000" name="calender" />
              <ul className="leading-4">
                <li className="font-medium leading-normal text-xl">Posted</li>
                <li>{helpers.formatDate(del?.data?.createdAt)}</li>
              </ul>
            </div>
            <div className="flex items-center space-x-2">
              <FavIcon className="size-8" stroke="#000" name="remaining" />
              <ul className="leading-4">
                <li className="font-medium leading-normal text-xl">
                  Remaining
                </li>
                <li>
                  {del?.data?.is_expire_date > 0
                    ? `${del?.data?.is_expire_date} days`
                    : del?.data?.is_expire_date || 0}
                </li>
              </ul>
            </div>
          </div>
          <ul className="leading-4">
            <li className="font-medium leading-normal text-xl">
              {del?.data?.name}
            </li>
            <li>{del?.data?.email}</li>
          </ul>
          <div>
            <h5 className="font-medium leading-normal text-xl">
              Promotion Performance
            </h5>
          </div>
          <div className="overflow-x-auto max-w-sm border rounded-md pb-5 lg:pb-0 mx-auto sm:max-w-3xl sm:overflow-visible overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300">
            <PromoPerforChart
              items={del?.data?.viewsByDate || []}
              className="h-[330px] border-none"
            />
          </div>
        </div>
      </Modal>
      {/* ================ Add new banner ================= */}
      <Modal2
        title="Add New Banner"
        open={state.isStore}
        setIsOpen={(v) => setState("isStore", v)}
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <StoreBanner setState={setState} />
      </Modal2>
      {/* ================ Update Banner ================= */}
      <Modal2
        title="Edit Banner"
        open={state.isUpdate}
        setIsOpen={(v) => setState("isUpdate", v)}
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <UpdateBanner setState={setState} details={details} />
      </Modal2>
    </div>
  );
}

//  ================ store banner ===================
const StoreBanner = ({ setState }: any) => {
  const [preview, setIsPreview] = useState("");
  const [storePromotion, { isLoading }] = useStorePromotionMutation();
  const from = useForm({
    resolver: zodResolver(banner_st),
    defaultValues: {
      client_name: "",
      client_email: "",
      promotion_link: "",
      date: "",
      banner: null,
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const data = helpers.fromData({
      name: values.client_name,
      email: values.client_email,
      promotion_link: values.promotion_link,
      expire_date: values.date,
      ...(values.banner && { img: values.banner }),
    });
    try {
      const res = await storePromotion(data).unwrap();
      if (res.status) {
        setState("isStore", false);
        from.reset();
        sonner.success(
          "Promotion created successfully",
          "New promotion has been added to your system",
          "bottom-right"
        );
      }
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div>
      <ModalHeading
        title="Add New Banner"
        onClose={() => setState("isStore", false)}
      />
      <Form className="space-y-8 pt-3" from={from} onSubmit={handleSubmit}>
        <FromInput2
          className="h-10 rounded-xl"
          name="client_name"
          label="Client Name"
          placeholder="Enter client name"
        />
        <FromInput2
          className="h-10 rounded-xl"
          name="client_email"
          label="Client Email"
          placeholder="Enter client email"
        />
        <FromInput2
          className="h-10 rounded-xl"
          name="promotion_link"
          label="Promotion Link"
          placeholder="Enter promotion link"
        />
        <div>
          <SingleCalendar
            onChange={(v: any) => {
              from.setValue("date", helpers.formatDate(v, "YYYY-MM-DD"));
            }}
            className="h-10 rounded-xl px-3! text-black!"
          />
          {from.watch("date") === "" && from?.formState?.errors?.date && (
            <p className="text-reds justify-end flex items-center text-red-400 gap-1 text-sm">
              {from?.formState?.errors?.date?.message as string}
              <CircleAlert size={14} />
            </p>
          )}
        </div>
        <div>
          <div className="border min-h-20 rounded-xl p-2 flex items-center justify-center">
            {preview ? (
              <div className="w-full relative">
                <picture>
                  <img
                    className="h-[200px] w-full! rounded-md object-cover flex flex-start overflow-hidden"
                    src={preview}
                    alt="Banner Preview"
                  />
                </picture>
                <ImgUpload
                  onFileSelect={(file) => {
                    setIsPreview(URL.createObjectURL(file));
                    from.setValue("banner", file as any);
                  }}
                >
                  <UploadBtn />
                </ImgUpload>
              </div>
            ) : (
              <ImgUpload
                onFileSelect={(file) => {
                  setIsPreview(URL.createObjectURL(file));
                  from.setValue("banner", file as any);
                }}
              >
                <Button type="button" className="bg-[#FEF6F3]">
                  {" "}
                  <FavIcon color="#99796f" name="upload2" />
                  <span className="text-primary">Upload Promotion Banner</span>
                </Button>
              </ImgUpload>
            )}
          </div>
          {from.watch("banner") === null && from?.formState?.errors?.banner && (
            <p className="text-reds flex mt-2 text-red-400 justify-end  items-center gap-1 text-sm">
              {from?.formState?.errors?.banner?.message as string}
              <CircleAlert size={14} />
            </p>
          )}
        </div>

        <Button disabled={isLoading} className="w-full" type="submit">
          Upload
        </Button>
      </Form>
    </div>
  );
};
//  ================ Update Banner ===================
const UpdateBanner = ({ setState, details }: any) => {
  const [updatePromotion, { isLoading }] = useUpdatePromotionMutation();
  const [preview, setIsPreview] = useState("");
  const from = useForm({
    resolver: zodResolver(banner_st_up),
    defaultValues: {
      client_name: "",
      client_email: "",
      promotion_link: "",
      date: "",
      banner: null,
    },
  });

  useEffect(() => {
    if (details) {
      from.reset({
        client_name: details.name,
        client_email: details.email,
        promotion_link: details.promotion_link,
        date: details.expire_date,
      });
      setIsPreview(details.banner);
    }
  }, [details]);

  const handleSubmit = async (values: FieldValues) => {
    const data = helpers.fromData({
      name: values.client_name,
      email: values.client_email,
      promotion_link: values.promotion_link,
      expire_date: values.date,
      ...(values.banner && { img: values.banner }),
    });

    try {
      const res = await updatePromotion({ id: details.id, data }).unwrap();
      if (res.status) {
        setState("isUpdate", false);
        from.reset();
        sonner.success(
          "Promotion updated successfully",
          "Promotion has been updated",
          "bottom-right"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <ModalHeading
        title="Edit Banner"
        onClose={() => setState("isUpdate", false)}
      />
      <Form className="space-y-8 pt-3" from={from} onSubmit={handleSubmit}>
        <FromInput2
          className="h-10 rounded-xl"
          name="client_name"
          label="Client Name"
          placeholder="Enter client name"
        />
        <FromInput2
          className="h-10 rounded-xl"
          name="client_email"
          label="Client Email"
          placeholder="Enter client email"
        />
        <FromInput2
          className="h-10 rounded-xl"
          name="promotion_link"
          label="Promotion Link"
          placeholder="Enter promotion link"
        />
        <div>
          <SingleCalendar
            defaultDate={details.expire_date}
            onChange={(v: any) => {
              from.setValue("date", helpers.formatDate(v, "YYYY-MM-DD"));
            }}
            className="h-10 rounded-xl px-3! text-black!"
          />
          {from.watch("date") === "" && from?.formState?.errors?.date && (
            <p className="text-reds justify-end flex items-center text-red-400 gap-1 text-sm">
              {from?.formState?.errors?.date?.message as string}
              <CircleAlert size={14} />
            </p>
          )}
        </div>
        <div>
          <div className="border min-h-20 rounded-xl p-2 flex items-center justify-center">
            <div className="w-full relative">
              <picture>
                <img
                  className="h-[200px] w-full! rounded-md object-cover flex flex-start overflow-hidden"
                  src={preview || details.img || "/not.png"}
                  alt="Banner Preview"
                />
              </picture>
              <ImgUpload
                onFileSelect={(file) => {
                  setIsPreview(URL.createObjectURL(file));
                  from.setValue("banner", file as any);
                }}
              >
                <UploadBtn />
              </ImgUpload>
            </div>
          </div>
          {from.watch("banner") === null && from?.formState?.errors?.banner && (
            <p className="text-reds flex mt-2 text-red-400 justify-end  items-center gap-1 text-sm">
              {from?.formState?.errors?.banner?.message as string}
              <CircleAlert size={14} />
            </p>
          )}
        </div>

        <Button disabled={isLoading} className="w-full" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};
