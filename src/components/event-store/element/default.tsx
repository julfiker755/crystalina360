import {
  demand_sc,
  demand_sc2,
  demand_sc_edit,
  offline_sc,
  offline_sc2,
  offline_sc_edit,
  online_sc,
  online_sc2,
  online_sc_edit,
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
      delivery_type: "online",
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
      delivery_type: "ondemand",
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
export const getSchemaEdit = (isDelivery: string) => {
  if (isDelivery === "offline") return offline_sc_edit;
  if (isDelivery === "online") return online_sc_edit;
  if (isDelivery === "ondemand") return demand_sc_edit;
};

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
      delivery_type: "online",
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
      delivery_type: "ondemand",
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
