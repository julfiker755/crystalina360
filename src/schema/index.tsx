import { z } from "zod";

//  ======= auth =========
// export const passwordChangeSchema = z
//   .object({
//     old_password: z.string().nonempty("Current Password is required"),
//     new_password: z.string().nonempty("New Password is required"),
//     c_password: z.string().nonempty("Confirm password is required"),
//   })
//   .refine((value) => value.new_password === value.c_password, {
//     path: ["c_password"],
//     message: "Passwords must be match.",
//   });

//  === sign_In ==
export const sign_In = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Invalid email address",
    }),
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
  coupon_code: z.string().nonempty("Coupon is required"),
  price: z.string().nonempty("Price is required"),
  coupon_type: z.string().nonempty("Coupon Type is required"),
  benefits: z.array(z.string()).nonempty("benefits is required"),
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

// === coupons code ===
export const banner_st = z.object({
  client_name: z.string().nonempty("Client Name is required"),
  client_email: z.string().nonempty("Client Email is required"),
  promotion_link: z.string().nonempty("Promotion Link is required"),
  date: z.string().nonempty("Date is required"),
  banner: z.any().refine((file) => file instanceof File, {
    message: "Banner is required",
  }),
});

// === addPlan ===
export const add_plan = z.object({
  title: z.string().nonempty("title is required"),
  price: z.string().nonempty("price is required"),
  services: z.array(z.string()).nonempty("benefits is required"),
});
