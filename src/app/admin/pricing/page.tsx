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
import { useModalState } from "@/hooks";
import {
  useGetPricingQuery,
  useStorePricingMutation,
  useUpdatePricingMutation,
} from "@/redux/api/admin/pricingApi";
import { add_plan } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Plus } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { helpers } from "@/lib";
import { FromSelect2 } from "@/components/reuseable/from-select2";
import sonner from "@/components/reuseable/sonner";
import { Repeat } from "@/components/reuseable/repeat";

const initState = {
  isStore: false,
  isUpdate: false,
};
export default function Pricing() {
  const [state, setState] = useModalState(initState);
  const [details, setDetails] = useState<any>(null);
  const { data: pricing, isLoading } = useGetPricingQuery({
    pricing_for: "user",
  });

  return (
    <div>
      <NavTitle
        title="Subscription"
        subTitle="Manage pricing of subscription system os your app from this section"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {isLoading ? (
          <Repeat count={4}>
            <Skeleton className="w-full h-60" />
          </Repeat>
        ) : (
          pricing?.data?.map((item: any, idx: any) => (
            <PricingCd key={idx} {...item}>
              <div className="flex space-x-3  justify-end mt-3">
                <AEditbtn
                  onClick={() => {
                    setState("isUpdate", true);
                    setDetails(item);
                  }}
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
        <PlanUpdateForm details={details} setState={setState} />
      </Modal2>
    </div>
  );
}

//  ===============  Plan Store From ===============
function PlanStoreForm({ setState }: { setState: any }) {
  const [isItem, setIsItem] = useState<any>([]);
  const [storePricing, { isLoading }] = useStorePricingMutation();
  const from = useForm({
    resolver: zodResolver(add_plan),
    defaultValues: {
      title: "",
      price: "",
      interval: "",
      services: [],
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const data = helpers.fromData({
      pricing_for: "user",
      title: values.title,
      price: values.price,
      interval: values.interval,
      service: isItem,
    });
    try {
      const res = await storePricing(data).unwrap();
      if (res.status) {
        setState("isStore", false);
        sonner.success(
          "Plan added",
          "Plan has been added successfully",
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
        title="Add plan for users"
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
          type="number"
        />
        <FromSelect2
          name="interval"
          label="Interval"
          placeholder="Select interval"
          items={intervalItem}
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
        <Button disabled={isLoading} size="lg" className="w-full rounded-xl">
          Add
        </Button>
      </Form>
    </div>
  );
}

//  ===============  Plan Update From ===============
interface planUpateProps {
  details: any;
  setState: any;
}

function PlanUpdateForm({ setState, details }: planUpateProps) {
  const [isItem, setIsItem] = useState<any>([]);
  const [updatePricing, { isLoading }] = useUpdatePricingMutation();
  const from = useForm({
    resolver: zodResolver(add_plan),
    defaultValues: {
      title: details.title,
      price: details.price,
      interval: details.interval,
      services: [],
    },
  });

  useEffect(() => {
    from.setValue("services", isItem);
  }, [isItem, from]);

  // == set default value ==
  useEffect(() => {
    if (details) {
      from.reset({
        title: details.title,
        price: details.price,
        services: isItem,
        interval: details.interval,
      });
      setIsItem(details.service);
    }
  }, [details]);

  const handleSubmit = async (values: FieldValues) => {
    const data = helpers.fromData({
      pricing_for: "user",
      title: values.title,
      price: values.price,
      interval: values.interval,
      service: isItem,
    });

    try {
      const res = await updatePricing({ id: details.id, data }).unwrap();
      if (res.status) {
        setState("isUpdate", false);
        sonner.success(
          "Plan updated",
          "Plan has been updated successfully",
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
        title="Edit basic plan"
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
          type="number"
        />
        <FromSelect2
          name="interval"
          label="Interval"
          placeholder="Select interval"
          items={intervalItem}
        />
        <div>
          <FromDropdown
            options={isItem}
            className="border-b  pb-2 px-1"
            label="Key benefits"
            onChange={(values) => setIsItem(values)}
          />
          {from.watch("services")?.length == 0 &&
            from?.formState?.errors?.services && (
              <p className="text-reds justify-end flex items-center text-red-400 gap-1 text-sm">
                {from?.formState?.errors?.services?.message as string}
                <CircleAlert size={14} />
              </p>
            )}
        </div>
        <Button disabled={isLoading} size="lg" className="w-full rounded-xl">
          Save Changes
        </Button>
      </Form>
    </div>
  );
}

const intervalItem = [
  { value: "FREE", label: "Free" },
  { value: "MONTH", label: "Monthly" },
  { value: "YEAR", label: "Yearly" },
];
