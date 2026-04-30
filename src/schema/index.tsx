import { z } from "zod";

// ******** reuse *************
const emailField = z
  .string()
  .nonempty("Email is required")
  .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Invalid email address",
  });

// == contact us==
export const contact_us = z.object({
  name: z.string().nonempty("Name is required"),
  email: emailField,
  description: z.string().nonempty("Description is required"),
});
// == contact us==

export const missing_sc = z.object({
  gender: z.string().nonempty("Gender is required"),
  residence_city: z.string().nonempty("City is required"),
  residence_province: z.string().nonempty("Province is required"),
  residence_region: z.string().nonempty("Region is required"),
  residence_country: z.string().nonempty("Country is required"),
  marketing_consent: z.any().optional(),
});
//  === sign_In ==
export const sign_In = z.object({
  email: emailField,
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

//  === sign_Up  ===
export const sign_Up = sign_In
  .extend({
    name: z.string().nonempty("Full Name is required"),
    c_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((value) => value.password === value.c_password, {
    path: ["c_password"],
    message: "Passwords must be match.",
  });

// === new_Pass ===
export const new_Pass = z
  .object({
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    c_password: z
      .string()
      .nonempty("Confirm Password is required")
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((value) => value.password === value.c_password, {
    path: ["c_password"],
    message: "Passwords must be match.",
  });

// === change_Pass ===
export const change_Pass = z
  .object({
    current_password: z.string().nonempty("Current Password is required"),
    new_password: z.string().nonempty("New Password is required"),
    c_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((value) => value.new_password === value.c_password, {
    path: ["c_password"],
    message: "Passwords must be match.",
  });
// === fqa_sc ===

export const fqa_sc = z.object({
  question: z.string().nonempty("Question is required"),
  answer: z.string().nonempty("Answer is required"),
});

// === add-ons ===
export const add_on = z.object({
  title: z.string().nonempty("title is required"),
  price: z.string().nonempty("price is required"),
  bio: z.string().nonempty("bio is required"),
  benefits: z.array(z.any()).nonempty("benefits is required"),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
});
export const rejection_sc = z.object({
  message: z.string().nonempty("Message is required"),
});

// === coupons===
export const coupons_st = z.object({
  coupon_type: z.string().default("flat"),
  coupon_code: z.string().nonempty("Coupon is required"),
  price: z.string().nonempty("Price is required"),
  date: z.string().nonempty("Date is required"),
});

// === coupons code ===
export const blog_st = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  image: z.any().refine((file) => file instanceof File, {
    message: "Image is required",
  }),
});
export const blogUp_st = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  image: z.any().optional(),
});

// === coupons code ===
export const banner_st = z.object({
  client_name: z.string().nonempty("Client Name is required"),
  client_email: z.string().nonempty("Client Email is required"),
  promotion_link: z
    .string()
    .nonempty("Promotion Link is required")
    .url("Please enter a valid URL (e.g. https://example.com)"),
  date: z.string().nonempty("Date is required"),
  banner: z.any().refine((file) => file instanceof File, {
    message: "Banner is required",
  }),
});
export const banner_st_up = z.object({
  client_name: z.string().nonempty("Client Name is required"),
  client_email: z.string().nonempty("Client Email is required"),
  promotion_link: z
    .string()
    .nonempty("Promotion Link is required")
    .url("Please enter a valid URL (e.g. https://example.com)"),
  date: z.string().nonempty("Date is required"),
  banner: z.any().optional(),
});

// === addPlan ===
export const add_plan = z.object({
  title: z.string().nonempty("title is required"),
  price: z.string().nonempty("price is required"),
  interval: z.string().nonempty("interval is required"),
});

export const audio_sc = z.object({
  title: z.string().nonempty("title is required"),
  audio: z.any().refine((file) => file instanceof File, {
    message: "Audio is required",
  }),
});

//  ============= event common schema ===========
export const event = z.object({
  delivery_type: z.string().nonempty("velivery is required"),
  event_purpose: z.string().nonempty("purpose is required"),
  holistic_discipline: z.array(z.string()).nonempty("holistic is required"),
  event_title: z.string().nonempty("title is required"),
  event_description: z.string().nonempty("description is required"),
  min_person: z.string().nonempty("Minimum persons is required"),
  max_person: z.string().nonempty("Maximum persons is required"),
  price: z.string().nonempty("Price is required"),
  event_duration: z.string().optional(),
  tags: z.array(z.string()).nonempty("tags is required"),
  ticket_quantity: z.string().nonempty("tiket is required"),
  accessibility: z.array(z.string()).optional(),
});

const eventCountry = z.object({
  city: z.string().nonempty("city is required"),
  province: z.string().nonempty("province is required"),
  region: z.string().nonempty("region is required"),
  country: z.string().nonempty("country is required"),
});

const imgSchema = z.object({
  image: z.any().refine((file) => file instanceof File, {
    message: "image is required",
  }),
  video: z.any().refine((file) => file instanceof File, {
    message: "Video is required",
  }),
});

//  ====== one to one event ========
export const one2one_offline_sc = event.extend({
  ...eventCountry.shape,
  img: imgSchema.shape.image,
  event_date: z.string().nonempty("time is required"),
  event_time: z.array(z.string()).nonempty("time slot is required"),
});

export const one2one_online_sc = event.extend({
  img: imgSchema.shape.image,
  event_date: z.string().nonempty("time is required"),
  event_time: z.array(z.string()).nonempty("time slot is required"),
});
export const one2one_off_sc_edit = event.extend({
  ...eventCountry.shape,
  img: z.any().optional(),
  event_date: z.string().nonempty("time is required"),
  event_time: z.array(z.string()).nonempty("time slot is required"),
});

export const one2one_on_sc_edit = event.extend({
  img: z.any().optional(),
  event_date: z.string().nonempty("time is required"),
  event_time: z.array(z.string()).nonempty("time slot is required"),
});

// =====  groups events =====
export const group_offline_sc = event.extend({
  ...eventCountry.shape,
  img: imgSchema.shape.image,
  event_date: z.array(z.string()).nonempty("date is required"),
  event_time: z.string().nonempty("time slot is required"),
});
export const group_offline_sc_edit = event.extend({
  ...eventCountry.shape,
  img: z.any().optional(),
  event_date: z.array(z.string()).nonempty("date is required"),
  event_time: z.string().nonempty("time slot is required"),
});

export const group_online_sc = event.extend({
  img: imgSchema.shape.image,
  event_date: z.array(z.string()).nonempty("date slot is required"),
  event_time: z.string().nonempty("time is required"),
});
export const group_online_sc_edit = event.extend({
  img: z.any().optional(),
  event_date: z.array(z.string()).nonempty("date slot is required"),
  event_time: z.string().nonempty("time is required"),
});

const group_demand = event.omit({
  min_person: true,
  max_person: true,
  event_duration: true,
  ticket_quantity: true,
  accessibility: true,
});

export const group_demand_sc = group_demand.extend({
  ...eventCountry.shape,
  img: imgSchema.shape.video,
});
export const group_demand_sc_edit = group_demand.extend({
  ...eventCountry.shape,
  img: z.any().optional(),
});

//  ================= retreat event ================
export const retreat_offline_sc = event.extend({
  ...eventCountry.shape,
  img: imgSchema.shape.image,
  event_date: z.string().nonempty("date is required"),
  event_time: z.string().nonempty("time is required"),
});
export const retreat_offline_sc_edit = event.extend({
  ...eventCountry.shape,
  img: z.any().optional(),
  event_date: z.string().nonempty("date is required"),
  event_time: z.string().nonempty("time is required"),
});
