import FavIcon from "@/icon/favIcon";

type DeliveryType = "offline" | "online" | "on-demand";

const deliveryTypeConfig = {
  offline: "offline",
  online: "online",
  "on-demand": "ondemand",
} as const satisfies Record<DeliveryType, string>;

export function getDeliveryType(type: DeliveryType, color?: string) {
  return (
    <FavIcon name={deliveryTypeConfig[type]} color={color} className="size-4" />
  );
}
