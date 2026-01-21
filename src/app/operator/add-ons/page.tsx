"use client";
import { Alert, AlertTitle } from "@/components/ui";
import { addOns } from "@/components/view/user/dummy-json";
import { AppAlert } from "@/components/view/user/reuse";
import AddOnCard from "@/components/view/oparator/reuse/addon-card";
import { BadgePercent, X } from "lucide-react";
import { useState } from "react";

export default function AddOnsAll() {
  const [isAlert, setIsAlert] = useState(true);
  return (
    <div className="py-10 container">
      <h1 className="text-center pb-8">Add on services</h1>

      {isAlert && (
        <div className="pb-8">
          <Alert
            style={{
              background: "linear-gradient(90deg, #7A42E7 0%, #5752E6 100%)",
            }}
            className="text-center mx-auto border-none py-5 relative animate-in"
          >
            <button>
              <X
                size={16}
                className="absolute z-10 top-2 right-3 text-white  cursor-pointer"
                onClick={() => setIsAlert(false)}
              />
            </button>
            <AlertTitle className="text-white  flex  justify-center mt-3 lg:mt-0">
              <span className="mr-1 lg:mr-3">
                {" "}
                <BadgePercent size={20} />
              </span>
              Automatic 5% discount at checkout when purchasing two or more
              add-ons
            </AlertTitle>
          </Alert>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 2xl:gap-20">
        {addOns.map((item, index) => (
          <AddOnCard item={item} key={index} />
        ))}
      </div>
      <AppAlert />
    </div>
  );
}
