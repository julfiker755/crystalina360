"use client";
import { ADeletebtn, AEditbtn } from "@/components/view/admin/reuse/btn";
import useConfirmation from "@/provider/confirmation";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import AddOnCd from "@/components/view/admin/reuse/add-ons-cd";
import { addOns } from "@/components/view/user/dummy-json";
import { useModalState } from "@/hooks";
import { Button } from "@/components/ui";
import { CircleAlert, Plus } from "lucide-react";
import Modal2 from "@/components/reuseable/modal2";
import ModalHeading from "@/components/reuseable/modal-heading";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/reuseable/from";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { FromTextarea2 } from "@/components/reuseable/from-textarea2";
import FromDropdown from "@/components/reuseable/from-dropdown";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { add_on, sign_In } from "@/schema";
import FromColorPicker from "@/components/reuseable/from-color";
import { useStoreAddOnMutation } from "@/redux/api/admin/addonApi";
import FromBenefits from "@/components/reuseable/from-benefits";



const initState = {
  isStore: false,
  isUpdate: false,
};

export default function Addons() {
  const { confirm } = useConfirmation();
  const [state, setState] = useModalState(initState);

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete add-on",
      title: "You are going to delete this add-on",
      description:
        "After deleting, user's won't be able to find this add-on in your system",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <NavTitle
        title="Manage add-ons"
        subTitle="Manage all of your add-ons from this section"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:grid-cols-3 pt-8">
        {addOns.map((item, idx) => (
          <AddOnCd key={idx} {...item}>
            <div className="flex space-x-3  justify-end mt-3">
              <AEditbtn onClick={() => setState("isUpdate", true)} />
              <ADeletebtn onClick={() => handleDelete("123")} />
            </div>
          </AddOnCd>
        ))}
      </div>
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
        <AddonEditForm setState={setState} />
      </Modal2>
    </div>
  );
}

//  ===================== AddonStoreForm ==================
const AddonStoreForm = ({ setState }: any) => {
  const [storeAddOn, { isLoading }] = useStoreAddOnMutation();
  const [isItem, setIsItem] = useState<any>([]);
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
    const { primary_color, secondary_color, ...rest } = values
    const data = {
      ...rest,
      primary_color: primarycolor,
      secondary_color: secondarycolor

    }
    console.log(values)
    // const data1 = helpers.fromData(data)
    // const res = await storeAddOn(data)

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
        />
        <FromTextarea2
          name="bio"
          label="Bio"
          placeholder="Enter your bio"
          className="rounded-xl sm:min-h-30"
        />
        <div>
          <FromBenefits
            className="border-b  pb-2 px-1"
            label="Key benefits"
            onChange={(values) => {
              console.log(values)
              // setIsItem(values);
              // from.setValue("benefits", isItem);
            }}
          />
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
            defaultColor={"#6366F1"}
            name="primary_color"
            label="Primary Color"
            color={primarycolor}
            setColor={setPrimaryColor}
          />

          <FromColorPicker
            name="secondary_color"
            defaultColor={"#C6C3F6"}
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
const AddonEditForm = ({ setState }: any) => {
  const [isItem, setIsItem] = useState<any>([]);
  const from = useForm({
    resolver: zodResolver(add_on),
    defaultValues: {
      title: "",
      price: "",
      bio: "",
      benefits: [],
      primary_color: "",
      // secondery_color: ""
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
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
        />
        <FromTextarea2
          name="bio"
          label="Bio"
          placeholder="Enter your bio"
          className="rounded-xl sm:min-h-30"
        />
        <div>
          <FromDropdown
            options={isItem}
            className="border-b  pb-2 px-1"
            label="Key benefits"
            onChange={(values) => {
              setIsItem(values);
              console.log(values);
              from.setValue("benefits", isItem);
            }}
          />
          {from.watch("benefits")?.length == 0 &&
            from?.formState?.errors?.benefits && (
              <p className="text-reds justify-end flex items-center text-red-400 gap-1 text-sm">
                {from?.formState?.errors?.benefits?.message as string}
                <CircleAlert size={14} />
              </p>
            )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-10">
          <FromColorPicker defaultColor="#6366F1" label="Primary Color" />
          <FromColorPicker defaultColor="#C6C3F6" label="Secondery Color" />
        </div>
        <Button size="lg" className="w-full rounded-xl">
          Save changes
        </Button>
      </Form>
    </div>
  );
};
