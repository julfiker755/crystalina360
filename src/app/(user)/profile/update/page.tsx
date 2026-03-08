"use client";
import React, { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Form from "@/components/reuseable/from";
import { helpers } from "@/lib";
import ImgUpload from "@/components/reuseable/img-upload";
import { Upload } from "lucide-react";
import Image from "next/image";
import {
  useAddCompanyMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/authApi";
import sonner from "@/components/reuseable/sonner";
import {
  cityOptions,
  countryOptions,
  genderOptions,
  provinceOptions,
  regionOptions,
} from "@/components/dummy-data";
import { BackBtn } from "@/components/reuseable/back-btn";
import { Switch } from "@/components/ui/switch";
import { FromInput } from "@/components/reuseable/form-input";
import { FormSelDropdown } from "@/components/reuseable/from-select@1";
import { Label } from "@/components/ui";

const intAva = {
  file: null,
  preview: "",
};

export default function ProfileEdit2() {
  const [avatar, setAvatar] = React.useState<any>(intAva);
  const { data: profile } = useGetProfileQuery({});
  const [addCompany] = useAddCompanyMutation();
  const {
    img,
    name,
    email,
    residence_city,
    residence_province,
    residence_region,
    residence_country,
    marketing_consent,
    gender,
    sdi_code,
    code_fiscal,
    province_code,
    vat_number,
    company,
  } = profile?.data?.user || {};
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const form = useForm({
    defaultValues: {
      img: null,
      name: "",
      email: "",
      gender: "",
      residence_city: "",
      residence_province: "",
      residence_region: "",
      residence_country: "",
      marketing_consent: "",
      sdi_code: "",
      code_fiscal: "",
      province_code: "",
      vat_number: "",
      company_name: "",
      company_address: "",
      company_postal_code: "",
      company_city: "",
      company_province_code: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: name || "",
        email: email || "",
        residence_city: residence_city || "",
        residence_province: residence_province || "",
        residence_region: residence_region || "",
        residence_country: residence_country || "",
        marketing_consent: marketing_consent || "",
        gender: gender || "",
        sdi_code: sdi_code || "",
        code_fiscal: code_fiscal || "",
        province_code: province_code || "",
        vat_number: vat_number || "",
        company_name: company?.company_name || "",
        company_address: company?.company_address || "",
        company_postal_code: company?.company_postal_code || "",
        company_city: company?.company_city || "",
        company_province_code: company?.company_province_code || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (values: FieldValues) => {
    const {
      company_name,
      company_address,
      company_postal_code,
      company_city,
      company_province_code,
      ...rest
    } = values;

    const data = helpers.fromData({
      ...rest,
      ...(avatar?.file && { img: avatar?.file }),
    });

    const companydata = helpers.fromData({
      company_name,
      company_address,
      company_postal_code,
      company_city,
      company_province_code,
    });

    const res = await updateProfile(data).unwrap();
    if (res.status) {
      form.reset();
      await addCompany(companydata).unwrap();
      sonner.success(
        "Update Successful",
        "Your profile has been updated successfully",
        "bottom-right",
      );
    }
    try {
    } catch (err: any) {
      console.log("Update profile error:", err);
    }
  };

  return (
    <Form
      className="bg-figma-gray px-4 py-1 rounded-md"
      from={form}
      onSubmit={handleSubmit}
    >
      <div className="my-5">
        <ul className="flex items-center justify-between">
          <li className="flex items-center space-x-1">
            <BackBtn
              iconStyle="w-5"
              className="bg-figma-delete size-10 2xl:size-10 rounded-md"
            />
            <h2 className="font-bold text-2xl text-center">Edit Profile</h2>
          </li>
          <li>
            {" "}
            <Button disabled={isUpdating} className="w-fit">
              Save Changes
            </Button>
          </li>
        </ul>
      </div>
      <div className="space-y-4">
        <div className="relative mx-auto size-28 rounded-md">
          <Image
            src={avatar.preview || img || "/blur.png"}
            alt={"title"}
            fill
            className={"object-cover rounded-md"}
          />
          <ImgUpload
            className="grid place-items-center shadow-md  rounded-md absolute -bottom-1 -right-1 cursor-pointer"
            onFileSelect={(file: File) => {
              setAvatar({
                ...avatar,
                file,
                preview: URL.createObjectURL(file),
              });
            }}
          >
            <div className="size-7 grid place-items-center bg-primary text-white  rounded-sm">
              <Upload className="size-4" />
            </div>
          </ImgUpload>
        </div>
        <div className="space-y-5 mt-6">
          <div className="lg:grid lg:grid-cols-2 gap-6 space-y-6 lg:space-y-0">
            <FromInput
              className="h-10"
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
            />
            <FromInput
              className="h-10"
              name="email"
              label="Email"
              placeholder="Enter your email"
              readOnly={true}
            />
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                Country
              </Label>
              <FormSelDropdown
                label="select city"
                name="residence_country"
                options={countryOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                Region
              </Label>
              <FormSelDropdown
                label="select region"
                name="residence_region"
                options={regionOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                Province
              </Label>
              <FormSelDropdown
                label="select province"
                name="residence_province"
                options={provinceOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                City
              </Label>
              <FormSelDropdown
                label="select city"
                name="residence_city"
                options={cityOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>
            <div>
              <Label className="text-blacks text-base font-medium  mb-1">
                Gender
              </Label>
              <FormSelDropdown
                label="select gender"
                name="gender"
                options={genderOptions}
                className="bg-[#F4F4F4] border-none rounded-md"
              />
            </div>
            <FromInput
              className="h-10"
              name="sdi_code"
              label="Sdi Code"
              placeholder="Enter your sdi code"
            />
            <FromInput
              className="h-10"
              name="code_fiscal"
              label="Code Fiscal"
              placeholder="Enter your code fiscal"
            />
            <FromInput
              className="h-10"
              name="province_code"
              label="Province Code"
              placeholder="Enter your province code"
            />
            <FromInput
              className="h-10"
              name="vat_number"
              label="Vat Number"
              placeholder="Enter your vat number"
            />
            {form?.watch("vat_number")?.length > 3 && (
              <>
                <FromInput
                  className="h-10"
                  name="company_name"
                  label="Company Name"
                  placeholder="Enter your company name"
                />
                <FromInput
                  className="h-10"
                  name="company_address"
                  label="Company Address"
                  placeholder="Enter your company address"
                />
                <FromInput
                  className="h-10"
                  name="company_postal_code"
                  label="Company Postal Code"
                  placeholder="Enter your code"
                />
                <FromInput
                  className="h-10"
                  name="company_city"
                  label="Company City"
                  placeholder="Enter your company city"
                />
                <FromInput
                  className="h-10"
                  name="company_province_code"
                  label="Company Province Code"
                  placeholder="Enter your code"
                />
              </>
            )}
            <div className="col-span-2 border-gray-100">
              <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="marketing"
                      className="font-bold text-figma-black"
                    >
                      Marketing Consent
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive updates about new features, promotions, and
                      personalized recommendations.
                    </p>
                  </div>
                  <Switch
                    id="airplane-mode"
                    checked={form.watch("marketing_consent") as any}
                    onCheckedChange={(v: any) => {
                      form.setValue("marketing_consent", v);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
