"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetPricingQuery } from "@/redux/api/admin/pricingApi";
import { useGetProfileQuery } from "@/redux/api/authApi";
import {
  useBuyPlanMutation,
  usePaymentInitOpMutation,
} from "@/redux/api/operator/opratorApi";
import { helpers } from "@/lib";
import { useTranslations } from "next-intl";



export default function PricingBox({ order }: { order?: string }) {
  const t = useTranslations("oprator.home.navber");
  const [isTab, setIsTab] = useState("MONTH");
  const { data: pricing } = useGetPricingQuery({
    pricing_for: "operator",
  });
  const [buyPlan, { isLoading }] = useBuyPlanMutation();
  const pro_item = pricing?.data?.find((item: any) => item.interval === isTab);
  const { data: profile } = useGetProfileQuery({});
  const [paymentInitOp] = usePaymentInitOpMutation();
  const bugPlanSubmit = async (id: string) => {
    const data = helpers.fromData({
      plan_id: id,
    });
    const res = await buyPlan(data).unwrap();
    if (res.status) {
      const res1 = await paymentInitOp(res?.data?.invoice_no);
      window.location.href = res1?.data?.data;
      // window.open(res1?.data?.data);
      // useOpenPopup(res1?.data?.data, "PayPal Payment", 600, 600);
    }
  };

  const Ids = profile?.data?.user?.subscribed_plans?.id;


  const freePlan = {
    id: "basic",
    title: t("pricing_box.sub_title"),
    price: "0.00",
    description: t("pricing_box.benefits_you_will_get"),
    service: [
      t("pricing_box.freeOptions.0"),
      t("pricing_box.freeOptions.1"),
      t("pricing_box.freeOptions.2"),
      t("pricing_box.freeOptions.3"),
      t("pricing_box.freeOptions.4"),
      t("pricing_box.freeOptions.5"),
      t("pricing_box.freeOptions.6")
    ],
  };


  return (
    <div className="pb-16">
      <div className="text-center container mb-12">
        <h1>{t("pricing_box.title")}</h1>

        <div className="flex justify-center mt-5 mx-auto space-x-3 bg-figma-gray1 w-fit rounded-full">
          <button
            onClick={() => setIsTab("MONTH")}
            className={`py-2 px-7 ${isTab == "MONTH" && "bg-figma-primary  text-white!"
              } rounded-full text-figma-black cursor-pointer`}
          >
            {t("pricing_box.monthly")}
          </button>
          <button
            onClick={() => setIsTab("YEAR")}
            className={`py-2 px-7 ${isTab === "YEAR" && "bg-figma-primary  text-white!"
              } rounded-full text-figma-black cursor-pointer`}
          >
            {t("pricing_box.annual")}
          </button>
        </div>
      </div>
      <div className="relative">
        {isTab === "MONTH" ? (
          <div className="grid md:grid-cols-2 gap-6 mb-12 w-11/12 lg:max-w-4xl mx-auto">
            {/*  ===================== free plan =============== */}
            <div
              className={`rounded-2xl p-8  flex flex-col relative bg-[#EDEDED]`}
            >
              <h2 className="text-2xl text-figma-black font-bold mb-4 text-center">
                {freePlan.title}
              </h2>
              <div className="text-center mb-8">
                <span className="text-3xl lg:text-4xl font-bold">
                  €{freePlan?.price || 0}
                </span>
              </div>
              <div>

                <p className={`text-xl mb-2 font-semibold text-figma-black`}>
                  {t("pricing_box.benefits_you_will_get")}
                </p>
                <ul className="space-y-2 mb-7">
                  {freePlan?.service?.map((item: any) => (
                    <li key={item} className="flex items-start gap-3">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <FreeButton status={profile?.status} Ids={Ids} />
            </div>
            {/* ================ paid plan ==================== */}
            <div
              className={`rounded-2xl p-8  flex flex-col relative bg-[#EDEDED]`}
            >
              <h2 className="text-2xl text-figma-black font-bold mb-4 text-center">
                {pro_item?.title}
              </h2>
              <div className="text-center mb-8">
                <span className="text-3xl lg:text-4xl font-bold">
                  €{pro_item?.price}
                </span>
              </div>
              <div>
                <p className={`text-xl mb-2 font-semibold text-figma-black`}>
                  {t("pricing_box.benefits_you_will_get")}
                </p>
                <ul className="space-y-2 mb-7">
                  {pro_item?.service?.map((item: any) => (
                    <li key={item} className="flex items-start gap-3">
                      <span>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <PaidButton
                isLoading={isLoading}
                status={profile?.status}
                Ids={Ids}
                onClick={() => bugPlanSubmit(pro_item.id)}
              />
            </div>
          </div>
        ) : (
          isTab === "YEAR" && (
            <div className="grid md:grid-cols-2 gap-6 mb-12 w-11/12 lg:max-w-4xl mx-auto">
              {/*  ================= free plan ================ */}
              <div
                className={`rounded-2xl p-8  flex flex-col relative bg-[#EDEDED]`}
              >
                <h2 className="text-2xl text-figma-black font-bold mb-4 text-center">
                  {freePlan.title}
                </h2>
                <div className="text-center mb-8">
                  <span className="text-3xl lg:text-4xl font-bold">
                    €{freePlan?.price || 0}
                  </span>
                </div>
                <div>
                  <p className={`text-xl mb-2 font-semibold text-figma-black`}>
                    {t("pricing_box.benefits_you_will_get")}
                  </p>
                  <ul className="space-y-2 mb-7">
                    {freePlan?.service?.map((item: any) => (
                      <li key={item} className="flex items-start gap-3">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <FreeButton status={profile?.status} Ids={Ids} />
              </div>
              {/* ===============  paid plan ================== */}
              <div
                className={`rounded-2xl p-8  flex flex-col relative bg-[#EDEDED]`}
              >
                <h2 className="text-2xl text-figma-black font-bold mb-4 text-center">
                  {pro_item?.title}
                </h2>
                <div className="text-center mb-8">
                  <span className="text-3xl lg:text-4xl font-bold">
                    €{pro_item?.price}
                  </span>
                </div>
                <div>
                  <p className={`text-xl mb-2 font-semibold text-figma-black`}>
                    {t("pricing_box.benefits_you_will_get")}
                  </p>
                  <ul className="space-y-2 mb-7">
                    {pro_item?.service?.map((item: any) => (
                      <li key={item} className="flex items-start gap-3">
                        <span>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <PaidButton
                  isLoading={isLoading}
                  status={profile?.status}
                  Ids={Ids}
                  onClick={() => bugPlanSubmit(pro_item.id)}
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

const FreeButton = ({ status, Ids }: any) => {
  const t = useTranslations("oprator.home.navber");
  return (
    status &&
    (Ids ? (
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
        <Button
          variant="primary"
          disabled={true}
          className="w-fit px-10! disabled:opacity-100 cursor-default border-5 pricingShadow bg-[#D9D9D9] text-white border-white py-6! rounded-full"
        >
          {t("pricing_box.purchase_plan")}
        </Button>
      </div>
    ) : (
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
        <Button
          variant="primary"
          className="w-fit px-10! cursor-default border-5 pricingShadow border-white py-6! rounded-full"
        >
          {t("pricing_box.purchase_plan")}
        </Button>
      </div>
    ))
  );
};
const PaidButton = ({ status, Ids, isLoading, onClick }: any) => {
  const t = useTranslations("oprator.home.navber");
  return (
    status &&
    (Ids ? (
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
        <Button
          variant="primary"
          disabled={true}
          className="w-fit px-10! disabled:opacity-100 cursor-default border-5 pricingShadow bg-[#D9D9D9] text-white border-white py-6! rounded-full"
        >
          {t("pricing_box.purchase_plan")}
        </Button>
      </div>
    ) : (
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
        <Button
          disabled={isLoading}
          onClick={onClick}
          variant="primary"
          className="w-fit px-10! cursor-default border-5 pricingShadow border-white py-6! rounded-full"
        >
          {t("pricing_box.purchase_plan")}
        </Button>
      </div>
    ))
  );
};
