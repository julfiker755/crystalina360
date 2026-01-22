"use client";
import { AEditbtn } from "@/components/view/admin/reuse/btn";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import AddOnCd from "@/components/view/admin/reuse/add-ons-cd";
import { useGlobalState, useModalState } from "@/hooks";
import { Button, Skeleton } from "@/components/ui";
import { CircleAlert, Plus } from "lucide-react";
import Modal2 from "@/components/reuseable/modal2";
import ModalHeading from "@/components/reuseable/modal-heading";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseable/from";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import FromDropdown from "@/components/reuseable/from-dropdown";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { add_on } from "@/schema";
import FromColorPicker from "@/components/reuseable/from-color";
import {
  useGetAddonQuery,
  useStoreAddOnMutation,
  useUpdateAddonMutation,
} from "@/redux/api/admin/addonApi";
import FromBenefits from "@/components/reuseable/from-benefits";
import { helpers } from "@/lib";
import sonner from "@/components/reuseable/sonner";
import { useDebounce } from "use-debounce";
import { Pagination } from "@/components/reuseable/pagination";
import { Repeat } from "@/components/reuseable/repeat";

const initState = {
  isStore: false,
  isUpdate: false,
};

const initGlobalSate = {
  page: 1,
  search: "",
};

export default function Addons() {
  const [state, setState] = useModalState(initState);
  const [global, updateGlobal] = useGlobalState(initGlobalSate);
  const [details, setIsDetails] = useState<any>({});
  const [value] = useDebounce(global.search, 1000);
  const { data: addon, isLoading } = useGetAddonQuery({
    page: global.page,
    ...(value && { search: value }),
  });

  return (
    <div>
      <NavTitle
        title="Manage add-ons"
        subTitle="Manage all of your add-ons from this section"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:grid-cols-3 pt-8">
        {isLoading ? (
          <Repeat count={10}>
            <Skeleton className="w-full h-[400px]" />
          </Repeat>
        ) : (
          addon?.data?.length > 0 &&
          addon?.data?.map((item: any, idx: any) => (
            <AddOnCd key={idx} {...item}>
              <div className="flex space-x-3  justify-end mt-3">
                <AEditbtn
                  onClick={() => {
                    setIsDetails(item);
                    setState("isUpdate", true);
                  }}
                />
              </div>
            </AddOnCd>
          ))
        )}
      </div>
      {addon?.meta?.total > 10 && (
        <ul className="flex items-center flex-wrap justify-between pt-10 pb-3">
          <li className="flex">
            Total:
            <sup className="font-medium text-2xl relative -top-3 px-2 ">
              {addon?.meta?.total}
            </sup>
            Add Ons
          </li>
          <li>
            <Pagination
              onPageChange={(v: any) => updateGlobal("page", v)}
              {...addon?.meta}
            />
          </li>
        </ul>
      )}
      {/* ====================== isStore ================== */}
      <Modal2
        open={state.isStore}
        setIsOpen={(v) => setState("isStore", v)}
        className="sm:max-w-xl"
      >
        <AddonStoreForm setState={setState} />
      </Modal2>
      {/* ====================== Addon Edit Form ================== */}
      <Modal2
        open={state.isUpdate}
        setIsOpen={(v) => setState("isUpdate", v)}
        className="sm:max-w-xl"
      >
        <AddonEditForm setState={setState} details={details} />
      </Modal2>
    </div>
  );
}

//  ===================== AddonStoreForm ==================
const AddonStoreForm = ({ setState }: any) => {
  const [storeAddOn, { isLoading }] = useStoreAddOnMutation();
  const [primarycolor, setPrimaryColor] = useState<string>("#6366F1");
  const [secondarycolor, setSecondaryColor] = useState<string>("#C6C3F6");
  const from = useForm({
    resolver: zodResolver(add_on),
    defaultValues: {
      title: "",
      price: "",
      bio: "",
      benefits: [],
      primary_color: "",
      secondary_color: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const { primary_color, secondary_color, ...rest } = values;
    const data = {
      ...rest,
      primary_color: primarycolor,
      secondary_color: secondarycolor,
    };
    const data1 = helpers.fromData(data);
    const res = await storeAddOn(data1).unwrap();
    if (res) {
      setState("isStore", false);
      sonner.success(
        "Added Successfull",
        "Add on Addded Successs",
        "bottom-right",
      );
    }
  };

  return (
    <div>
      <ModalHeading
        title="Add new add-on"
        onClose={() => setState("isStore", false)}
      />
      <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
        <FromInput2
          label="Add-on title"
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
        <FromTextarea2
          name="bio"
          label="Bio"
          placeholder="Enter your bio"
          className="rounded-xl sm:min-h-30"
        />
        <div>
          <FromBenefits label="Key benefits" name="benefits" />
          {from.watch("benefits")?.length == 0 &&
            from?.formState?.errors?.benefits && (
              <p className="text-reds justify-end flex items-center text-red-400 gap-1 text-sm">
                {from?.formState?.errors?.benefits?.message as string}
                <CircleAlert size={14} />
              </p>
            )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10">
          <FromColorPicker
            name="primary_color"
            label="Primary Color"
            color={primarycolor}
            setColor={setPrimaryColor}
          />

          <FromColorPicker
            name="secondary_color"
            label="Secondery Color"
            color={secondarycolor}
            setColor={setSecondaryColor}
          />
        </div>
        <Button disabled={isLoading} size="lg" className="w-full rounded-xl">
          Create
        </Button>
      </Form>
    </div>
  );
};
//  ===================== Edit add on details ==================
const AddonEditForm = ({ setState, details }: any) => {
  const [primarycolor, setPrimaryColor] = useState<string>("");
  const [secondarycolor, setSecondaryColor] = useState<string>("");

  const id = details?.id;

  console.log(id);

  const from = useForm({
    resolver: zodResolver(add_on),
    defaultValues: {
      title: "",
      price: "",
      bio: "",
      benefits: [],
      primary_color: "",
      secondary_color: "",
    },
  });

  useEffect(() => {
    if (!details) return;

    const benefits_id = details.benefits?.map((item: any) => item.id) || [];

    from.reset({
      title: details?.title || "",
      price: details?.price?.toString() || "",
      bio: details.bio || "",
      primary_color: details?.primary_color || "",
      secondary_color: details?.secondary_color || "",
      benefits: benefits_id,
    });
    setPrimaryColor(details?.primary_color);
    setSecondaryColor(details?.secondary_color);
  }, [details, from]);

  const [updateAddon, { isLoading }] = useUpdateAddonMutation();

  const handleSubmit = async (values: FieldValues) => {
    const { primary_color, secondary_color, ...rest } = values;
    const data1 = {
      ...rest,
      primary_color: primarycolor,
      secondary_color: secondarycolor,
    };
    const data = helpers.fromData(data1);
    const res = await updateAddon({ id, data }).unwrap();
    if (res) {
      setState("isUpdate", false);
      sonner.success(
        "Update Successfull",
        "Add on Update Successs",
        "bottom-right",
      );
    }
  };

  return (
    <div>
      <ModalHeading
        title="Edit Add-on Details"
        onClose={() => setState("isUpdate", false)}
      />
      <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
        <FromInput2
          label="Add-on title"
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
        <FromTextarea2
          name="bio"
          label="Bio"
          placeholder="Enter your bio"
          className="rounded-xl sm:min-h-30"
        />
        <div>
          <FromBenefits label="Key benefits" name="benefits" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10">
          <FromColorPicker
            name="primary_color"
            label="Primary Color"
            color={primarycolor}
            setColor={setPrimaryColor}
          />

          <FromColorPicker
            name="secondary_color"
            label="Secondery Color"
            color={secondarycolor}
            setColor={setSecondaryColor}
          />
        </div>
        <Button disabled={isLoading} size="lg" className="w-full rounded-xl">
          Save changes
        </Button>
      </Form>
    </div>
  );
};
