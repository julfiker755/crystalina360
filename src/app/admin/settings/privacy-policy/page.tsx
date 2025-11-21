"use client";
import { Button } from "@/components/ui/button";
import FavIcon from "@/icon/favIcon";
import { Textarea } from "@/components/ui";
import { useFormFields } from "@/hooks";
import { useEffect } from "react";

export default function DataPolicyPage() {
  const { formData, handleChange, errors, validateFields } = useFormFields({
    collection: "",
    usage: "",
    protection: "",
    responsibilities: "",
  });

  // useEffect(() => {
  //   formData.collection = "Julfiekr";
  //   formData.usage = "Julfiekr";
  //   formData.protection = "Julfiekr";
  //   formData.responsibilities = "Julfiekr";
  // }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateFields({
      collection: "Collection is required",
      usage: "Usage is required",
      protection: "Protection is required",
      responsibilities: "Responsibility is required",
    });
    if (!isValid) return;

    console.log("Saved:", formData);
  };

  return (
    <form onSubmit={handleSave}>
      <div className="space-y-10">
        <div className="border rounded-xl p-6">
          <TitleNav icon="events" title="Data Collection" color="white" />
          <div className="flex-1 mt-4">
            <Textarea
              value={formData.collection}
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
              value={formData.usage}
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
              value={formData.protection}
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
              value={formData.responsibilities}
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
          <Button size="lg" className="rounded-2xl">
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
      <h4 className="text-xl font-medium text-black">{title}</h4>
    </div>
  );
};
