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
  benefits: z.array(z.string()).nonempty("benefits is required"),
  primary_color: z.string().optional(),
  secondery_color: z.string().optional(),
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
  services: z.array(z.string()).nonempty("benefits is required"),
});

export const audio_sc = z.object({
  title: z.string().nonempty("title is required"),
  audio: z.any().refine((file) => file instanceof File, {
    message: "Audio is required",
  }),
});

// delivery_type: "offline",
//       event_purpose: "educational",
//       holistic: [],
//       event_title: "",
//       description: "",
//       date: "",
//       timeSlot: [],
//       minilimit: 1,
//       maxlimit: 2,
//       price: "",
//       duration: "",
//       tags: [],
//       city: "",
//       province: "",
//       region: "",
//       country: "",
//       image: "",
//       tiket: isOne ? 2 : 200,

export const event = z.object({
  img: z.any().refine((file) => file instanceof File, {
    message: "image is required",
  }),
  delivery_type: z.string().nonempty("Delivery is required"),
  event_purpose: z.string().nonempty("Purpose is required"),
  holistic_discipline: z.array(z.string()).nonempty("Holistic is required"),
  event_title: z.string().nonempty("title is required"),
  event_description: z.string().nonempty("description is required"),
  event_date: z.string().nonempty("date is required"),
  event_time: z.array(z.string()).nonempty("time Slot is required"),
  min_person: z.string().optional(),
  max_person: z.string().optional(),
  price: z.string().nonempty("Price is required"),
  event_duration: z.string().nonempty("duration is required"),
  tags: z.array(z.string()).nonempty("tags is required"),
  ticket_quantity: z.string().nonempty("tiket is required"),
  accessibility: z.array(z.string()).optional(),
});

export const offline_sc = event.extend({
  city: z.string().nonempty("city is required"),
  province: z.string().nonempty("province is required"),
  region: z.string().nonempty("region is required"),
  country: z.string().nonempty("country is required"),
});
export const online_sc = event.extend({
  link: z.string().nonempty("Link is required"),
});

export const demand_sc = z.object({
  img: z.any().refine((file) => file instanceof File, {
    message: "Video is required",
  }),
  delivery_type: z.string().nonempty("Delivery is required"),
  event_purpose: z.string().nonempty("Purpose is required"),
  holistic_discipline: z.array(z.string()).nonempty("Holistic is required"),
  event_title: z.string().nonempty("title is required"),
  event_description: z.string().nonempty("description is required"),
  city: z.string().nonempty("city is required"),
  province: z.string().nonempty("province is required"),
  region: z.string().nonempty("region is required"),
  country: z.string().nonempty("country is required"),
  event_date: z.string().nonempty("date is required"),
  event_time: z.string().nonempty("time is required"),
  tags: z.array(z.string()).nonempty("tags is required"),
});
