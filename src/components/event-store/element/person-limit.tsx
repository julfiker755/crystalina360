import { FromInput } from "@/components/reuseable/form-input";
import React from "react";

export default function PersonLimit({ read = false }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="h-10 flex items-center justify-between px-2 border rounded-md">
        <FromInput
          name="min_person"
          className="w-[100px] h-10 bg-transparent p-0"
          type="number"
          readOnly={read}
        />
        <span>-minimum person limit-</span>
      </div>
      <div className="h-10 flex items-center justify-between px-2 border rounded-md">
        <FromInput
          name="max_person"
          className="w-[100px] h-10 bg-transparent p-0"
          type="number"
          readOnly={read}
        />
        <span>-maximum person limit-</span>
      </div>
    </div>
  );
}
