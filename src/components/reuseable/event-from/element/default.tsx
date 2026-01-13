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
  if (isDelivery === "offline") return offline_sc;
  if (isDelivery === "online") return online_sc;
  if (isDelivery === "ondemand") return demand_sc;
};

export const getDelivery = (type: any) => {
  if (type === "retreat") {
    return [{ value: "offline", label: "Offline", icon: "offline" }];
  } else {
    return [
      { value: "offline", label: "Offline", icon: "offline" },
      { value: "online", label: "Online", icon: "online" },
      { value: "ondemand", label: "On demand", icon: "ondemand" },
    ];
  }
};

export enum delivary {
  offline = "offline",
  online = "online",
  ondemand = "ondemand",
}

export const purposeItem = [
  { value: "educational", label: "Educational" },
  { value: "experimental", label: "Experiential" },
  { value: "mixed", label: "Mixed" },
];

export const durationItem = [
  {
    label: "Less than 30 minutes",
    value: "less_than_30_minutes",
  },
  { label: "30-60 minutes", value: "30_60_minutes" },
  { label: "Half day", value: "half_day" },
  { label: "One day", value: "one_day" },
  { label: "Two days", value: "two_days" },
  { label: "One week", value: "one_week" },
  {
    label: "More than one week",
    value: "more_than_one_week",
  },
];
