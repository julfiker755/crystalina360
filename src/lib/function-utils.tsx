import FavIcon from "@/icon/favIcon";
import { delivary_t } from "./constants";

type DeliveryType = "offline" | "online" | "ondemand";

const deliveryTypeConfig = {
  offline: delivary_t.offline,
  online: delivary_t.online,
  ondemand: delivary_t.ondemand,
} as const satisfies Record<DeliveryType, string>;

export function getDeliveryIcon(type: DeliveryType, color?: string) {
  return (
    <FavIcon name={deliveryTypeConfig[type]} color={color} className="size-4" />
  );
}

export type BillingInterval = "MONTH" | "YEAR";

export const getInterval: Record<any, string> = {
  MONTH: "Month",
  YEAR: "Year",
};

export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== null && value !== undefined) {
      result[key as keyof T] = value;
    }
  }
  return result;
}
