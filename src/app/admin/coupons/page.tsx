"use client";
import { ADeletebtn, AEditbtn } from "@/components/view/admin/reuse/btn";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { FromSelect2 } from "@/components/reuseable/from-select2";
import ModalHeading from "@/components/reuseable/modal-heading";
import { SingleCalendar } from "@/components/reuseable/single-date";
import CouponCad from "@/components/view/admin/reuse/coupon-card";
import useConfirmation from "@/provider/confirmation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import Modal2 from "@/components/reuseable/modal2";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import Form from "@/components/reuseable/from";
import { Button, Skeleton } from "@/components/ui";
import { useGlobalState, useModalState } from "@/hooks";
import { CircleAlert, Plus } from "lucide-react";
import {
  useDeleteCouponMutation,
  useGetCouponQuery,
  useStoreCouponMutation,
  useUpdateCouponMutation,
} from "@/redux/api/admin/couponApi";
import { Pagination } from "@/components/reuseable/pagination";
import { useDebounce } from "use-debounce";
import { copunType, helpers } from "@/lib";
import { coupons_st } from "@/schema";
import { Repeat } from "@/components/reuseable/repeat";
import sonner from "@/components/reuseable/sonner";
import { useEffect, useState } from "react";

const initState = {
  isStore: false,
  isUpdate: false,
};

const initGlobal = {
  page: 1,
  search: "",
};

export default function Coupons() {
  const { confirm } = useConfirmation();
  const [state, setState] = useModalState(initState);
  const [global, updateGlobal] = useGlobalState(initGlobal);
  const [isDetails, setIsDetails] = useState<any>({});
  const [value] = useDebounce(global.search, 1000);
  const { data: coupon, isLoading } = useGetCouponQuery({
    page: global.page,
    ...(value && { search: value }),
  });
  const [deleteCoupon] = useDeleteCouponMutation();

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Coupon",
      title: "You are going to delete this coupon",
      description:
        "After deleting, user's won't be able to find this coupon in your system.",
    });
    if (confirmed) {
      await deleteCoupon(id).unwrap();
    }
  };

  return (
    <div>
      <NavTitle
        title="Manage Coupons"
        subTitle="Manage all the offers and  coupons of your system from this section"
      />
      <div className="flex-between gap-10">
        <SearchBox onChange={(v: any) => updateGlobal("search", v)} />
        <Button
          onClick={() => setState("isStore", true)}
          type="button"
          size="lg"
          className="rounded-xl"
        >
          <Plus />
          <span className="hidden md:block">Add more</span>
        </Button>
      </div>

      <div className="pt-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2  xl:grid-cols-3">
          {isLoading ? (
            <Repeat count={10}>
              <Skeleton className="w-full h-45" />
            </Repeat>
          ) : (
            coupon?.data?.map((item: any, idx: any) => (
              <CouponCad key={idx} {...item}>
                <div className="flex space-x-3  justify-end mt-3">
                  <AEditbtn
                    onClick={() => {
                      setState("isUpdate", true);
                      setIsDetails(item);
                    }}
                  />
                  <ADeletebtn onClick={() => handleDelete(item.id)} />
                </div>
              </CouponCad>
            ))
          )}
        </div>
        {coupon?.meta?.total > coupon?.meta?.per_page && (
          <ul className="flex items-center flex-wrap justify-between py-3">
            <li className="flex">
              Total:
              <sup className="font-medium text-2xl relative -top-3 px-2 ">
                {coupon?.meta?.total || 0}
              </sup>
              Coupons
            </li>
            <li>
              <Pagination
                onPageChange={(v: any) => updateGlobal("page", v)}
                {...coupon?.meta}
              />
            </li>
          </ul>
        )}
      </div>
      {/* ====================== isStore ================== */}
      <Modal2
        open={state.isStore}
        setIsOpen={(v) => setState("isStore", v)}
        className="sm:max-w-xl"
      >
        <CouponStore setState={setState} />
      </Modal2>
      {/* ====================== isEdit ================== */}
      <Modal2
        open={state.isUpdate}
        setIsOpen={(v) => setState("isUpdate", v)}
        className="sm:max-w-xl"
      >
        <CouponUpdate isDetails={isDetails} setState={setState} />
      </Modal2>
    </div>
  );
}

//  ===================== CouponStore ==================
const CouponStore = ({ setState }: any) => {
  const [storeCoupon, { isLoading: storeLoading }] = useStoreCouponMutation();

  const from = useForm({
    resolver: zodResolver(coupons_st),
    defaultValues: {
      coupon_type: "flat",
      coupon_code: "",
      price: "",
      date: "",
    },
  });

  const type = from.watch("coupon_type") || "flat";

  const handleSubmit = async (values: FieldValues) => {
    const { date, price, coupon_type, coupon_code } = values;
    if (coupon_type === copunType.percentage && parseInt(price) > 100) {
      from.setError("price", {
        type: "manual",
        message: "Percentage value should be between 1-100",
      });
    }

    try {
      const data = helpers.fromData({
        coupon_code: coupon_code,
        price: price,
        expiry_date: date,
        coupon_type: coupon_type,
      });
      const res = await storeCoupon(data).unwrap();
      if (res.status) {
        sonner.success(
          "Coupon Added",
          "Coupon stored successfully",
          "bottom-right",
        );
        from.reset();
        setState("isStore", false);
      }
    } catch (err) {}
  };

  return (
    <div>
      <ModalHeading
        title="Create Coupon"
        onClose={() => setState("isStore", false)}
      />
      <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
        <FromSelect2
          className="h-10 rounded-xl"
          name="coupon_type"
          label="Coupon Type"
          placeholder="Enter your Coupon code"
          items={[
            { label: "Flat (Fixed amount)", value: "flat" },
            {
              label: "Percentage (A percentage amount from total price)",
              value: "percentage",
            },
          ]}
        />
        <FromInput2
          className="h-10 rounded-xl"
          name="price"
          placeholder="Enter your hare"
          type="number"
        >
          <span className="text-figma-a_gray text-sm absolute top-1/2 -translate-y-1/2 right-4">
            {`/${helpers.capitalize(type)}`}
          </span>
        </FromInput2>
        <FromInput2
          className="h-10 rounded-xl"
          name="coupon_code"
          label="Coupon Code"
          placeholder="Enter your Coupon code"
        />
        <div>
          <SingleCalendar
            onChange={(v: any) => {
              from.setValue("date", helpers.formatDate(v, "YYYY-MM-DD"));
            }}
            className="h-10 rounded-xl px-3! text-black!"
          />
          {from?.formState?.errors?.date && (
            <p className="text-reds justify-end flex items-center text-red-400 gap-1 text-sm">
              {from?.formState?.errors?.date?.message as string}
              <CircleAlert size={14} />
            </p>
          )}
        </div>
        <Button disabled={storeLoading} size="lg" className="w-full rounded-xl">
          Create
        </Button>
      </Form>
    </div>
  );
};
//   ================ Coupon Update ================
const CouponUpdate = ({ isDetails, setState }: any) => {
  const [updateCoupon, { isLoading }] = useUpdateCouponMutation();
  const from = useForm({
    resolver: zodResolver(coupons_st),
    defaultValues: {
      coupon_code: "",
      coupon_type: "flat",
      price: "",
      date: "",
    },
  });

  useEffect(() => {
    if (isDetails) {
      from.reset({
        coupon_code: isDetails.coupon_code,
        coupon_type: isDetails.coupon_type || "flat",
        price: isDetails?.price,
        date: isDetails?.expiry_date,
      });
    }
  }, [isDetails]);

  const handleSubmit = async (values: FieldValues) => {
    const { date, price, coupon_type, coupon_code } = values;
    if (coupon_type === copunType.percentage && parseInt(price) > 100) {
      from.setError("price", {
        type: "manual",
        message: "Percentage value should be between 1-100",
      });
    }

    try {
      const data = helpers.fromData({
        coupon_code: coupon_code,
        price: price,
        expiry_date: date,
        coupon_type: coupon_type,
      });
      const res = await updateCoupon({ id: isDetails.id, data: data }).unwrap();
      if (res.status) {
        sonner.success(
          "Update Added",
          "Coupon Update successfully",
          "bottom-right",
        );
        from.reset();
        setState("isUpdate", false);
      }
    } catch (err) {}
  };

  const type = from.watch("coupon_type") || "flat";

  return (
    <div>
      <ModalHeading
        title="Edit Coupon"
        onClose={() => setState("isUpdate", false)}
      />
      <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
        <FromSelect2
          className="h-10 rounded-xl"
          name="coupon_type"
          label="Coupon Type"
          placeholder="Enter your Coupon code"
          items={[
            { label: "Flat (Fixed amount)", value: "flat" },
            {
              label: "Percentage (A percentage amount from total price)",
              value: "percentage",
            },
          ]}
        />
        <div className="relative">
          <FromInput2
            className="h-10 rounded-xl"
            name="price"
            placeholder="Enter your hare"
          />
          <span className="text-figma-a_gray text-sm absolute top-1/2 -translate-y-1/2 right-4">
            {`/${helpers.capitalize(type)}`}
          </span>
        </div>
        <FromInput2
          className="h-10 rounded-xl"
          name="coupon_code"
          label="Coupon Code"
          placeholder="Enter your Coupon code"
        />
        <SingleCalendar
          defaultDate={isDetails?.expiry_date}
          className="h-10 rounded-xl px-3! text-black!"
        />
        <Button disabled={isLoading} size="lg" className="w-full rounded-xl">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};
