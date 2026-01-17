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
