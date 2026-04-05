import {
  group_demand_sc,
  group_offline_sc,
  group_online_sc,
  one2one_offline_sc,
  one2one_online_sc,
  retreat_offline_sc,
} from "@/schema";


export const getValuesOne = (type: string) => {
  if (type == "offline") {
    return {
      img: "",
      delivery_type: "offline",
      event_purpose: "educational",
      holistic_discipline: [],
      event_title: "",
      event_description: "",
      country: "Italy",
      region: "",
      province: "",
      city: "",
      event_date: "",
      event_time: [],
      min_person: '',
      max_person: '',
      price: "",
      event_duration: "less_than_30_minutes",
      accessibility: [],
      tags: [],
      ticket_quantity: '',
    };
  } else if (type === "offline_retreat") {
    return {
      img: "",
      delivery_type: "offline",
      event_purpose: "educational",
      holistic_discipline: [],
      event_title: "",
      event_description: "",
      country: "Italy",
      region: "",
      province: "",
      city: "",
      event_date: "",
      event_time: "",
      min_person: "1",
      max_person: '',
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
      event_date: "",
      event_time: [],
      min_person: "",
      max_person: '',
      price: "",
      tags: [],
      ticket_quantity: '',
    };
  } else if (type == "ondemand") {
    return {
      img: "",
      delivery_type: "ondemand",
      event_purpose: "educational",
      holistic_discipline: [],
      event_title: "",
      event_description: "",
      country: "Italy",
      region: "",
      province: "",
      city: "",
      price: '',
      tags: [],
    };
  }
};

export const getOneSchema = (type: string) => {
  if (type === "offline") return one2one_offline_sc;
  if (type === "online") return one2one_online_sc;
  if (type === "ondemand") return group_demand_sc;
};


export const getSchemaEdit = (isDelivery: string) => {
  if (isDelivery === "offline") return '';
  if (isDelivery === "online") return '';
  if (isDelivery === "ondemand") return '';
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
      country: "Italy",
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
      country: "Italy",
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
      country: "Italy",
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
