import { demand_sc, offline_sc, online_sc } from "@/schema";

export const getDefaultValues = (isDelivery: string, isOne: boolean) => {
  if (isDelivery == "offline") {
    return {
      img: "",
      delivery_type: "offline",
      event_purpose: "educational",
      holistic_discipline: [],
      event_title: "",
      event_description: "",
      country: "",
      region: "",
      province: "",
      city: "",
      event_date: "",
      event_time: [],
      min_person: "1",
      max_person: "2",
      price: "",
      event_duration: "",
      accessibility: [],
      tags: [],
      ticket_quantity: isOne ? "2" : "200",
    };
  } else if (isDelivery == "online") {
    return {
      img: "",
      delivery_type: "offline",
      event_purpose: "educational",
      holistic_discipline: [],
      event_title: "",
      event_description: "",
      event_date: "",
      event_time: [],
      min_person: "1",
      max_person: "2",
      price: "",
      tags: [],
      ticket_quantity: isOne ? "2" : "200",
    };
  } else if (isDelivery == "ondemand") {
    return {
      img: "",
      delivery_type: "offline",
      event_purpose: "educational",
      holistic_discipline: [],
      event_title: "",
      event_description: "",
      country: "",
      region: "",
      province: "",
      city: "",
      event_date: "",
      event_time: "",
      tags: [],
    };
  }
};

export const getSchema = (isDelivery: string) => {
  return isDelivery == "offline"
    ? offline_sc
    : isDelivery == "online"
    ? online_sc
    : isDelivery === "ondemand" && demand_sc;
};
