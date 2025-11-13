"use client";
import { Button } from "@/components/ui/button";
import FavIcon from "@/icon/favIcon";
import { Textarea } from "@/components/ui";
import { useFormFields } from "@/hooks";

export default function DataPolicyPage() {
  const { formData, handleChange } = useFormFields({
    collection: "",
    usage: "",
    protection: "",
    responsibilities: "",
  });

  const handleSave = () => {
    console.log("Saved:", formData);
  };

  return (
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
        </div>
      </div>
      <div className="border rounded-xl p-6">
        <TitleNav icon="respon" title="Your Responsibilities" color="white" />
        <div className="flex-1 mt-4">
          <Textarea
            value={formData.protection}
            onChange={(e) => handleChange("responsibilities", e.target.value)}
            className="sm:min-h-30 resize-none rounded-xl"
            placeholder="Type here..."
          ></Textarea>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-8">
        <Button size="lg" className="rounded-2xl" onClick={handleSave}>
          Save changes
        </Button>
      </div>
    </div>
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
