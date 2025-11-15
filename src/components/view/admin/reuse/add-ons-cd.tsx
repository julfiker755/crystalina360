import { childrenProps } from "@/types";
import { CalendarDays } from "lucide-react";

interface addOnCdProps extends childrenProps {
  keyBenefits: any[];
  title: any;
  price: any;
  bio: any;
  primaryColor: any;
  secondaryColor: any;
}

export default function AddOnCd({
  keyBenefits,
  title,
  price,
  bio,
  primaryColor,
  secondaryColor,
  children,
}: addOnCdProps) {
  return (
    <>
      <div
        className="rounded-xl border-t-4  bg-white p-8 shadow-md"
        style={{
          borderColor: primaryColor,
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              style={{
                backgroundColor: secondaryColor,
              }}
              className="icon rounded-full"
            >
              <CalendarDays
                style={{
                  color: primaryColor,
                }}
                size={20}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{title}</p>
              <p className="text-lg font-bold text-[#E07856]">${price}</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{bio}</p>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#E07856] mb-3">
            Key benefits
          </h3>
          <ul className="space-y-2">
            {keyBenefits?.map((item: any, index: any) => (
              <li
                key={item + index}
                className="flex gap-2 text-sm text-muted-foreground"
              >
                <span className="font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        {children}
      </div>
    </>
  );
}
