import { childrenProps } from "@/types";
import { CalendarDays } from "lucide-react";

interface addOnCdProps extends childrenProps {
  benefits: any[];
  title: any;
  price: any;
  bio: any;
  primary_color: any;
  secondary_color: any;
}

export default function AddOnCd({
  benefits,
  title,
  price,
  bio,
  primary_color,
  secondary_color,
  children,
}: addOnCdProps) {
  return (
    <>
      <div
        className="rounded-xl border-t-4 flex flex-col justify-between  bg-white px-8 pt-8 pb-6 shadow-md"
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
                <p
                  style={{
                    color: primary_color,
                  }}
                  className="text-lg font-bold"
                >
                  ${price}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">{bio}</p>
          <div className="mb-6">
            <h3
              style={{
                color: primary_color,
              }}
              className="text-sm font-semibold mb-3"
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
        </div>
        {children}
      </div>
    </>
  );
}
