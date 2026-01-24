"use client";
import { Alert, AlertTitle, Skeleton } from "@/components/ui";
import { AppAlert } from "@/components/view/user/reuse";
import AddOnCard from "@/components/view/oparator/reuse/addon-card";
import { BadgePercent, X } from "lucide-react";
import { useState } from "react";
import { useGetAddonQuery } from "@/redux/api/admin/addonApi";
import { Pagination } from "@/components/reuseable/pagination";
import { Repeat } from "@/components/reuseable/repeat";
import { useAddsonCartQuery } from "@/redux/api/operator/opratorApi";

export default function AddOnsAll() {
  const [isAlert, setIsAlert] = useState(true);
  const [page, setPage] = useState(1);
  const { data: addon, isLoading } = useGetAddonQuery({
    page: page,
  });
  const { data: myAddOn, isLoading: addOnLoading } = useAddsonCartQuery({});

  console.log(myAddOn?.data);

  return (
    <div className="py-10 container">
      <h5 className="text-center h1 pb-8">Add-ons</h5>
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

      {myAddOn?.data?.length > 0 && (
        <div className="mb-20">
          <h5 className="text-lg font-medium mb-5">Purchased add-ons</h5>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 2xl:gap-20">
            {addOnLoading ? (
              <Repeat count={10}>
                <Skeleton className="w-full h-[400px]" />
              </Repeat>
            ) : (
              myAddOn?.data?.map((item: any, index: any) => (
                <AddOnCard buy={false} item={item?.addson} key={index} />
              ))
            )}
          </div>
        </div>
      )}

      <div>
        <h5 className="text-lg font-medium mb-5">More add-ons</h5>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 2xl:gap-20">
          {isLoading ? (
            <Repeat count={10}>
              <Skeleton className="w-full h-[400px]" />
            </Repeat>
          ) : (
            addon?.data?.map((item: any, index: any) => (
              <AddOnCard item={item} key={index} />
            ))
          )}
        </div>
      </div>
      <div className="flex justify-center my-10">
        <Pagination onPageChange={(v: any) => setPage(v)} {...addon?.meta} />
      </div>
      <AppAlert />
    </div>
  );
}
