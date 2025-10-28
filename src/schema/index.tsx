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

// loginSchema
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

export const sign_Up = sign_In
  .extend({
    name: z.string().nonempty("Full Name is required"),
    c_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((value) => value.password === value.c_password, {
    path: ["c_password"],
    message: "Passwords must be match.",
  });

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
