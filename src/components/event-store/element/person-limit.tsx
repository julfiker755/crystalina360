import { PersionLimit } from "@/components/reuseable/porson-limit";
import React from "react";

export default function PersonLimit() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <PersionLimit name="min_person" type="number" placeholder="Minimum" label="-minimum person limit-" />
      <PersionLimit name="max_person" type="number" placeholder="Minimum" label="-maximum person limit-" />
    </div>
  );
}
