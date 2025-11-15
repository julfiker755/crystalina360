"use client";
import { ADeletebtn, AEditbtn } from "@/components/view/admin/reuse/btn";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { FromSelect2 } from "@/components/reuseable/from-select2";
import ModalHeading from "@/components/reuseable/modal-heading";
import { SingleCalendar } from "@/components/reuseable/single-date";
import CouponCad from "@/components/view/admin/reuse/coupon-card";
import { couponsItem } from "@/components/view/user/dummy-json";
import useConfirmation from "@/provider/confirmation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import Modal2 from "@/components/reuseable/modal2";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import Form from "@/components/reuseable/from";
import { Button } from "@/components/ui";
import { useModalState } from "@/hooks";
import { CircleAlert, Plus } from "lucide-react";
import { helpers } from "@/lib";
import { coupons_st } from "@/schema";

const initState = {
  isStore: false,
  isUpdate: false,
};

export default function Coupons() {
  const { confirm } = useConfirmation();
  const [state, setState] = useModalState(initState);

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Coupon",
      title: "You are going to delete this coupon",
      description:
        "After deleting, user's won't be able to find this coupon in your system.",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <NavTitle
        title="Manage Coupons"
        subTitle="Manage all the offers and  coupons of your system from this section"
      />
      <div className="flex-between gap-10">
        <SearchBox onChange={(e) => console.log(e)} />
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
          {couponsItem.map((item, idx) => (
            <CouponCad key={idx} {...item}>
              <div className="flex space-x-3  justify-end mt-3">
                <AEditbtn onClick={() => setState("isUpdate", true)} />
                <ADeletebtn onClick={() => handleDelete("1234")} />
              </div>
            </CouponCad>
          ))}
        </div>
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
        <CouponUpdate setState={setState} />
      </Modal2>
    </div>
  );
}

//  ===================== CouponStore ==================
const CouponStore = ({ setState }: any) => {
  const from = useForm({
    resolver: zodResolver(coupons_st),
    defaultValues: {
      coupon_code: "",
      coupon_type: "flat",
      price: "",
      date: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
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
        >
          <span className="text-figma-a_gray text-sm absolute top-1/2 -translate-y-1/2 right-4">
            {`/${helpers.capitalize(from.watch("coupon_type"))}`}
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
              from.setValue("date", v?.toString());
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
        <Button size="lg" className="w-full rounded-xl">
          Create
        </Button>
      </Form>
    </div>
  );
};
//   ================ Coupon Update ================
const CouponUpdate = ({ setState }: any) => {
  const from = useForm({
    // resolver: zodResolver(sign_In),
    defaultValues: {
      coupon_code: "",
      coupon_type: "flat",
      price: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };

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
            {`/${helpers.capitalize(from.watch("coupon_type"))}`}
          </span>
        </div>
        <FromInput2
          className="h-10 rounded-xl"
          name="coupon_code"
          label="Coupon Code"
          placeholder="Enter your Coupon code"
        />
        <SingleCalendar className="h-10 rounded-xl px-3! text-black!" />
        <Button size="lg" className="w-full rounded-xl">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};
