"use client";
import { Button } from "@/components/ui/button";
import FavIcon from "@/icon/favIcon";
import { Textarea } from "@/components/ui";
import { useFormFields } from "@/hooks";
import { useEffect } from "react";
import {
  useGetPrivacyQuery,
  useStorePrivacyMutation,
} from "@/redux/api/admin/privacyApi";
import { helpers } from "@/lib";
import sonner from "@/components/reuseable/sonner";

export default function DataPolicyPage() {
  const {
    formData: fromValue,
    handleChange,
    errors,
    validateFields,
    setFormData,
  } = useFormFields({
    collection: "",
    usage: "",
    protection: "",
    responsibilities: "",
  });
  const { data: privacy } = useGetPrivacyQuery({});
  const [storePrivacy, { isLoading }] = useStorePrivacyMutation();

  useEffect(() => {
    if (privacy?.data?.id) {
      setFormData({
        collection: privacy.data.data_collection,
        usage: privacy.data.data_usage,
        protection: privacy.data.data_protection,
        responsibilities: privacy.data.your_responsibility,
      });
    }
  }, [privacy]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateFields({
      collection: "Collection is required",
      usage: "Usage is required",
      protection: "Protection is required",
      responsibilities: "Responsibility is required",
    });
    if (!isValid) return;
    const data = helpers.fromData({
      data_collection: fromValue.collection,
      data_usage: fromValue.usage,
      data_protection: fromValue.protection,
      your_responsibility: fromValue.responsibilities,
    });
    const res = await storePrivacy(data).unwrap();
    if (res?.status) {
      sonner.success(
        "Privacy Policy",
        "Privacy Policy updated successfully",
        "bottom-right",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-10">
        <div className="border rounded-xl p-6">
          <TitleNav icon="events" title="Data Collection" color="white" />
          <div className="flex-1 mt-4">
            <Textarea
              value={fromValue.collection}
              onChange={(e) => handleChange("collection", e.target.value)}
              className="sm:min-h-30 resize-none rounded-xl"
              placeholder="Type here..."
            ></Textarea>
            {errors.collection && (
              <p className="text-red-500 text-right">{errors.collection}</p>
            )}
          </div>
        </div>

        <div className="border rounded-xl p-6">
          <TitleNav icon="event" title="Data Usage" color="white" />
          <div className="flex-1 mt-4">
            <Textarea
              value={fromValue.usage}
              onChange={(e) => handleChange("usage", e.target.value)}
              className="sm:min-h-30 resize-none rounded-xl"
              placeholder="Type here..."
            ></Textarea>
            {errors.usage && (
              <p className="text-red-500 text-right">{errors.usage}</p>
            )}
          </div>
        </div>
        <div className="border rounded-xl p-6">
          <TitleNav icon="producation" title="Data Protection" color="white" />
          <div className="flex-1 mt-4">
            <Textarea
              value={fromValue.protection}
              onChange={(e) => handleChange("protection", e.target.value)}
              className="sm:min-h-30 resize-none rounded-xl"
              placeholder="Type here..."
            ></Textarea>
            {errors.protection && (
              <p className="text-red-500 text-right">{errors.protection}</p>
            )}
          </div>
        </div>
        <div className="border rounded-xl p-6">
          <TitleNav icon="respon" title="Your Responsibilities" color="white" />
          <div className="flex-1 mt-4">
            <Textarea
              value={fromValue.responsibilities}
              onChange={(e) => handleChange("responsibilities", e.target.value)}
              className="sm:min-h-30 resize-none rounded-xl"
              placeholder="Type here..."
            ></Textarea>
            {errors.responsibilities && (
              <p className="text-red-500 text-right">
                {errors.responsibilities}
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-8">
          <Button disabled={isLoading} size="lg" className="rounded-2xl">
            Save changes
          </Button>
        </div>
      </div>
    </form>
  );
}

const TitleNav = ({ icon, title, color }: any) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="size-12 grid place-items-center bg-primary rounded-full">
        <FavIcon className="size-6" color={color} name={icon} />
      </div>
      <h5 className="text-xl font-medium text-black">{title}</h5>
    </div>
  );
};
