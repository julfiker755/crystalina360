"use client";
import Modal2 from "@/components/reuseable/modal2";
import { Button } from "@/components/ui";
import { CalendarDays, Lock } from "lucide-react";
import { CloseIcon } from "../../common/btn-modal";
import { useGlobalState } from "@/hooks";
import {
  useBuyPlanMutation,
  usePaymentInitOpMutation,
} from "@/redux/api/operator/opratorApi";
import sonner from "@/components/reuseable/sonner";
import FavIcon from "@/icon/favIcon";
import { addOns, helpers } from "@/lib";
import { useRouter } from "next/navigation";

interface AddOnCardProps {
  item: any;
  buy?: boolean;
  href?: string;
}

export default function AddOnCard({ item, buy = true, href = "#" }: AddOnCardProps) {
  const { id, benefits, title, price, bio, primary_color, secondary_color, slug } =
    item || {};
  const router = useRouter()
  const [global, updateGlobal] = useGlobalState({
    show: false,
    data: {} as any,
  });
  const [buyPlan, { isLoading: bugIsLoading }] = useBuyPlanMutation();
  const [paymentInitOp] = usePaymentInitOpMutation();
  const token = helpers.hasAuthToken();

  const exclusiveTypes = [
    addOns.miniPdfCourse,
    addOns.videoMasterclass
  ];
  const ispayment = exclusiveTypes.includes(slug);

  const handlePayment = async (buy_id: string) => {
    const data = helpers.fromData({
      addson_id: buy_id,
    });

    const res = await buyPlan(data).unwrap();
    if (res.status) {
      const res1 = await paymentInitOp(res?.data?.invoice_no);
      window.location.href = res1?.data?.data;
    }
    if (res.status) {
      sonner.success(
        "Payment Successful",
        "Your add-on is ready. Time to enJay!",
        "bottom-right",
      );
    }
  };

  return (
    <>
      <div
        className="rounded-xl flex flex-col justify-between border-t-4  bg-white p-8 shadow-md"
        style={{
          borderColor: primary_color,
        }}
      >
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                style={{
                  backgroundColor: secondary_color,
                }}
                className="icon rounded-full"
              >
                <CalendarDays
                  style={{
                    color: primary_color,
                  }}
                  size={20}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-lg font-bold text-[#E07856]">${price}</p>
              </div>
            </div>
            {token &&
              (buy ? (
                <Button
                  style={{
                    backgroundColor: primary_color,
                  }}
                  onClick={() => {
                    if (ispayment) {
                      handlePayment(id)
                    }
                    router.push(href)
                  }}
                  disabled={bugIsLoading}
                  className="rounded-full text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Buy now
                </Button>
              ) : (
                <Button
                  disabled={true}
                  className="rounded-full disabled:opacity-100 bg-[#009F05] text-white"
                >
                  <FavIcon className="size-5" name="check_circle" />
                  Purchased
                </Button>
              ))}
          </div>
          <p className="text-sm text-muted-foreground mb-6">{bio}</p>
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#E07856] mb-3">
              Key benefits
            </h3>
            <ul className="space-y-2">
              {benefits?.map((item: any, idx: any) => (
                <li
                  key={idx}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span className="font-bold">•</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* More details link */}
        <div className="text-right">
          <Button
            onClick={() => {
              updateGlobal("show", true);
              updateGlobal("data", item as any);
            }}
            style={{
              backgroundColor: secondary_color,
              color: primary_color,
            }}
            className="rounded-full"
          >
            More details
          </Button>
        </div>
      </div>
      {/*========= detials ======== */}
      <Modal2
        open={global.show}
        setIsOpen={(v) => updateGlobal("show", v)}
        className="sm:max-w-lg"
      >
        <CloseIcon
          className="top-3 right-4"
          onClose={() => updateGlobal("show", false)}
        />
        <h2 className="font-bold text-center mb-2">More Details</h2>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-1">
            <div
              style={{
                backgroundColor: global?.data?.secondary_color,
              }}
              className="icon rounded-full"
            >
              <CalendarDays
                style={{
                  color: global?.data?.primary_color,
                }}
                size={20}
              />
            </div>
            <p className="text-lg font-bold text-figma-black">
              {global?.data?.title}
            </p>
          </div>

          <p
            style={{
              color: global?.data?.primaryColor,
            }}
            className="text-lg font-bold"
          >
            ${global?.data?.price}
          </p>
        </div>
        <div className="my-6">
          <h3
            style={{
              color: global?.data?.primary_color,
            }}
            className="text-sm font-semibold text-[#E07856] mb-3"
          >
            Key benefits
          </h3>
          <ul className="space-y-2">
            {benefits?.map((item: any, index: any) => (
              <li
                key={item.id + index}
                className="flex gap-2 text-sm text-muted-foreground"
              >
                <span className="font-bold">•</span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
        {token && buy && (
          <Button
            style={{
              backgroundColor: global?.data?.primaryColor,
            }}
            onClick={() => router.push(href)}
            className="rounded-full w-full text-white"
          >
            <Lock className="w-4 h-4 mr-2" />
            Buy now
          </Button>
        )}
      </Modal2>
    </>
  );
}
