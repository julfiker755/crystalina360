import {
  demand_sc,
  demand_sc2,
  demand_sc_edit,
  group_demand_sc,
  group_offline_sc,
  group_online_sc,
  offline_sc,
  offline_sc2,
  offline_sc_edit,
  online_sc,
  online_sc2,
  online_sc_edit,
  retreat_offline_sc,
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
      event_duration: "less_than_30_minutes",
      accessibility: [],
      tags: [],
      ticket_quantity: ticket,
    };
  } else if (isDelivery === "offline_retreat") {
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
      min_person: "1",
      max_person: ticket,
      price: "",
      event_duration: "less_than_30_minutes",
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

//  ================ group events ================
export const getValuesGroup = (type: string) => {
  if (type == "offline") {
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
      min_person: "",
      max_person: "",
      price: "",
      event_duration: "less_than_30_minutes",
      accessibility: [],
      tags: [],
      ticket_quantity: '',
    };
  } else if (type == "online") {
    return {
      img: "",
      delivery_type: "online",
      event_purpose: "educational",
      holistic_discipline: [],
      event_title: "",
      event_description: "",
      event_date: [],
      event_time: "",
      min_person: "",
      max_person: '',
      price: "",
      tags: [],
      ticket_quantity: ''
    };
  } else if (type == "ondemand") {
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
      price: "",
      tags: [],
    };
  } else if (type == "retreat") {
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
      min_person: "",
      max_person: "",
      price: "",
      event_duration: "less_than_30_minutes",
      accessibility: [],
      tags: [],
      ticket_quantity: '',
    }
  }
};

export const getGroupSchema = (type: string) => {
  if (type === "offline") return group_offline_sc;
  if (type === "online") return group_online_sc;
  if (type === "ondemand") return group_demand_sc;
  if (type === "retreat") return retreat_offline_sc;
};


//  ================ retreat events ================
