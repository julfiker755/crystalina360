"use client";
import { FromInput2 } from "@/components/reuseable/form-input2";
import Form from "@/components/reuseable/from";
import FromDropdown from "@/components/reuseable/from-dropdown";
import ModalHeading from "@/components/reuseable/modal-heading";
import Modal2 from "@/components/reuseable/modal2";
import NavTitle from "@/components/reuseable/nav-title";
import { Button, Skeleton } from "@/components/ui";
import { AEditbtn } from "@/components/view/admin/reuse/btn";
import PricingCd from "@/components/view/admin/reuse/pricing-cd";
import { useGetPricingQuery } from "@/redux/api/admin/pricingApi";
import { add_plan } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Plus } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useModalState } from "@/hooks";
import { useState } from "react";

const initState = {
  isStore: false,
  isUpdate: false,
};
export default function Pricing() {
  const [state, setState] = useModalState(initState);
  const { data: pricing, isLoading } = useGetPricingQuery({
    pricing_for: "operator",
  });

  console.log(pricing);

  return (
    <div>
      <NavTitle
        title="Pricing"
        subTitle="Manage pricing of subscription system os your app from this section"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {isLoading ? (
          <Skeleton className="w-full h-60" />
        ) : (
          pricing?.data?.map((item: any, idx: any) => (
            <PricingCd key={idx} {...item}>
              <div className="flex space-x-3  justify-end mt-3">
                <AEditbtn
                  onClick={() => setState("isUpdate", true)}
                  color="#fff"
                  className="bg-[#A6A996] rounded-md"
                />
              </div>
            </PricingCd>
          ))
        )}
      </div>
      <div className="flex-between justify-end mt-10">
        <Button
          onClick={() => setState("isStore", true)}
          type="button"
          size="lg"
          className="rounded-xl"
        >
          <Plus />
          Add More
        </Button>
      </div>
      {/* == Plan Store ===  */}
      <Modal2
        open={state.isStore}
        setIsOpen={(v) => setState("isStore", v)}
        className="sm:max-w-xl"
      >
        <PlanStoreForm setState={setState} />
      </Modal2>
      {/* ========= Plan Update ======== */}
      <Modal2
        open={state.isUpdate}
        setIsOpen={(v) => setState("isUpdate", v)}
        className="sm:max-w-xl"
      >
        <PlanUpdateForm setState={setState} />
      </Modal2>
    </div>
  );
}

//  ===============  Plan Store From ===============
function PlanStoreForm({ setState }: { setState: any }) {
  const [isItem, setIsItem] = useState<any>([]);
  const from = useForm({
    resolver: zodResolver(add_plan),
    defaultValues: {
      title: "",
      price: "",
      services: [],
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };
  return (
    <div>
      <ModalHeading
        title="Add plan for operators"
        onClose={() => setState("isStore", false)}
      />
      <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
        <FromInput2
          label="Title"
          name="title"
          placeholder="Enter your  title"
          className="h-10 rounded-xl"
        />
        <FromInput2
          name="price"
          label="Price"
          placeholder="Enter your price"
          className="h-10 rounded-xl"
        />
        <div>
          <FromDropdown
            options={isItem}
            className="border-b  pb-2 px-1"
            label="Key benefits"
            onChange={(values) => {
              setIsItem(values);
              console.log(values);
              from.setValue("services", isItem);
            }}
          />
          {from.watch("services")?.length == 0 &&
            from?.formState?.errors?.services && (
              <p className="text-reds justify-end flex items-center text-red-400 gap-1 text-sm">
                {from?.formState?.errors?.services?.message as string}
                <CircleAlert size={14} />
              </p>
            )}
        </div>
        <Button size="lg" className="w-full rounded-xl">
          Add
        </Button>
      </Form>
    </div>
  );
}

//  ===============  Plan Update From ===============
function PlanUpdateForm({ setState }: { setState: any }) {
  const [isItem, setIsItem] = useState<any>([]);
  const from = useForm({
    resolver: zodResolver(add_plan),
    defaultValues: {
      title: "",
      price: "",
      services: [],
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };
  return (
    <div>
      <ModalHeading
        title="Edit plan for operators"
        onClose={() => setState("isUpdate", false)}
      />
      <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
        <FromInput2
          label="Title"
          name="title"
          placeholder="Enter your  title"
          className="h-10 rounded-xl"
        />
        <FromInput2
          name="price"
          label="Price"
          placeholder="Enter your price"
          className="h-10 rounded-xl"
        />
        <div>
          <FromDropdown
            options={isItem}
            className="border-b  pb-2 px-1"
            label="Key benefits"
            onChange={(values) => {
              setIsItem(values);
              console.log(values);
              from.setValue("services", isItem);
            }}
          />
          {from.watch("services")?.length == 0 &&
            from?.formState?.errors?.services && (
              <p className="text-reds justify-end flex items-center text-red-400 gap-1 text-sm">
                {from?.formState?.errors?.services?.message as string}
                <CircleAlert size={14} />
              </p>
            )}
        </div>
        <Button size="lg" className="w-full rounded-xl">
          Add
        </Button>
      </Form>
    </div>
  );
}
