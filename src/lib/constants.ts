export const authKey = "auth_token";
export const routeName = "/operator";

export enum roleKey {
  user = "user",
  operator = "operator",
  admin = "admin",
}

export enum copunType {
  flat = "flat",
  percentage = "percentage",
}

export enum event_t {
  onetoone = "onetoone",
  group = "group",
  retreat = "retreat",
}

export enum delivary_t {
  offline = "offline",
  online = "online",
  ondemand = "ondemand",
}

export enum newsletSts {
  userPurchase = "userPurchase",
  operatorSales = "operatorSales",
  userMetrics = "userMetrics",
  operatorMetrics = "operatorMetrics",
  userDisciplines = "userDisciplines",
  operatorDisciplines = "operatorDisciplines",
  userEvent = "userEvent",
  operatorEvent = "operatorEvent",
  purpose = "purpose",
  tags = "tags",
  locations = "locations",
  duration = "duration",
  price = "price",
  capacity = "capacity",
  accessibility = "accessibility",
  subscribed = "subscribed",
}
