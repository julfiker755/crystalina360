import {
  demand_sc,
  demand_sc2,
  event,
  offline_sc,
  offline_sc2,
  online_sc,
  online_sc2,
} from "@/schema";

export const getValuesOne = (isDelivery: string, ticket: string) => {
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
      max_person: ticket,
      price: "",
      event_duration: "less-than-30-minutes",
      accessibility: [],
      tags: [],
      ticket_quantity: ticket,
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
      max_person: ticket,
      price: "",
      tags: [],
      ticket_quantity: ticket,
      link: "",
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
    value: "less-than-30-minutes",
  },
  { label: "30-60 minutes", value: "30-60-minutes" },
  { label: "Half day", value: "half-day" },
  { label: "One day", value: "one-day" },
  { label: "Two days", value: "two-days" },
  { label: "One week", value: "one-week" },
  {
    label: "More than one week",
    value: "more-than-one-week",
  },
];

export const getValuesGroup = (isDelivery: string, ticket: string) => {
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
      event_date: [],
      event_time: "",
      min_person: "1",
      max_person: ticket,
      price: "",
      event_duration: "less-than-30-minutes",
      accessibility: [],
      tags: [],
      ticket_quantity: ticket,
    };
  } else if (isDelivery == "online") {
    return {
      img: "",
      delivery_type: "offline",
      event_purpose: "educational",
      holistic_discipline: [],
      event_title: "",
      event_description: "",
      event_date: [],
      event_time: "",
      min_person: "1",
      max_person: ticket,
      price: "",
      tags: [],
      ticket_quantity: ticket,
      link: "",
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

export const getSchema2 = (isDelivery: string) => {
  if (isDelivery === "offline") return offline_sc2;
  if (isDelivery === "online") return online_sc2;
  if (isDelivery === "ondemand") return demand_sc2;
};
