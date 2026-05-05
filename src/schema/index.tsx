import { z } from "zod";

// ******** reuse *************
const emailField = z
  .string()
  .nonempty("L'email è obbligatoria")
  .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Indirizzo email non valido",
  });

// == contact us ==
export const contact_us = z.object({
  name: z.string().nonempty("Il nome è obbligatorio"),
  email: emailField,
  description: z.string().nonempty("La descrizione è obbligatoria"),
});


// == missing_sc ==
export const missing_sc = z.object({
  gender: z.string().nonempty("Il genere è obbligatorio"),
  residence_city: z.string().nonempty("La città è obbligatoria"),
  residence_province: z.string().nonempty("La provincia è obbligatoria"),
  residence_region: z.string().nonempty("La regione è obbligatoria"),
  residence_country: z.string().nonempty("Il paese è obbligatorio"),
  marketing_consent: z.any().optional(),
});

// === sign_In ===
export const sign_In = z.object({
  email: emailField,
  password: z
    .string()
    .nonempty("La password è obbligatoria")
    .min(6, "La password deve contenere almeno 6 caratteri"),
});

// === sign_Up ===
export const sign_Up = sign_In
  .extend({
    name: z.string().nonempty("Il nome completo è obbligatorio"),
    c_password: z
      .string()
      .nonempty("La conferma della password è obbligatoria"),
  })
  .refine((value) => value.password === value.c_password, {
    path: ["c_password"],
    message: "Le password devono coincidere",
  });

// === new_Pass ===
export const new_Pass = z
  .object({
    password: z
      .string()
      .nonempty("La password è obbligatoria")
      .min(6, "La password deve contenere almeno 6 caratteri"),
    c_password: z
      .string()
      .nonempty("La conferma della password è obbligatoria")
      .min(6, "La password deve contenere almeno 6 caratteri"),
  })
  .refine((value) => value.password === value.c_password, {
    path: ["c_password"],
    message: "Le password devono coincidere",
  });

// === change_Pass ===
export const change_Pass = z
  .object({
    current_password: z
      .string()
      .nonempty("La password attuale è obbligatoria"),
    new_password: z
      .string()
      .nonempty("La nuova password è obbligatoria"),
    c_password: z
      .string()
      .nonempty("La conferma della password è obbligatoria"),
  })
  .refine((value) => value.new_password === value.c_password, {
    path: ["c_password"],
    message: "Le password devono coincidere",
  });

// === faq ===
export const fqa_sc = z.object({
  question: z.string().nonempty("La domanda è obbligatoria"),
  answer: z.string().nonempty("La risposta è obbligatoria"),
});

// === add-ons ===
export const add_on = z.object({
  title: z.string().nonempty("Il titolo è obbligatorio"),
  price: z.string().nonempty("Il prezzo è obbligatorio"),
  bio: z.string().nonempty("La descrizione è obbligatoria"),
  benefits: z.array(z.any()).nonempty("I benefici sono obbligatori"),
  primary_color: z.string().optional(),
  secondary_color: z.string().optional(),
});

export const rejection_sc = z.object({
  message: z.string().nonempty("Il messaggio è obbligatorio"),
});

// === coupons ===
export const coupons_st = z.object({
  coupon_type: z.string().default("flat"),
  coupon_code: z.string().nonempty("Il coupon è obbligatorio"),
  price: z.string().nonempty("Il prezzo è obbligatorio"),
  date: z.string().nonempty("La data è obbligatoria"),
});

// === blog ===
export const blog_st = z.object({
  title: z.string().nonempty("Il titolo è obbligatorio"),
  description: z.string().nonempty("La descrizione è obbligatoria"),
  image: z.any().refine((file) => file instanceof File, {
    message: "L'immagine è obbligatoria",
  }),
});

export const blogUp_st = z.object({
  title: z.string().nonempty("Il titolo è obbligatorio"),
  description: z.string().nonempty("La descrizione è obbligatoria"),
  image: z.any().optional(),
});

// === banner ===
export const banner_st = z.object({
  client_name: z.string().nonempty("Il nome del cliente è obbligatorio"),
  client_email: z.string().nonempty("L'email del cliente è obbligatoria"),
  promotion_link: z
    .string()
    .nonempty("Il link promozionale è obbligatorio")
    .url("Inserisci un URL valido (es. https://example.com)"),
  date: z.string().nonempty("La data è obbligatoria"),
  banner: z.any().refine((file) => file instanceof File, {
    message: "Il banner è obbligatorio",
  }),
});

export const banner_st_up = z.object({
  client_name: z.string().nonempty("Il nome del cliente è obbligatorio"),
  client_email: z.string().nonempty("L'email del cliente è obbligatoria"),
  promotion_link: z
    .string()
    .nonempty("Il link promozionale è obbligatorio")
    .url("Inserisci un URL valido (es. https://example.com)"),
  date: z.string().nonempty("La data è obbligatoria"),
  banner: z.any().optional(),
});

// === addPlan ===
export const add_plan = z.object({
  title: z.string().nonempty("Il titolo è obbligatorio"),
  price: z.string().nonempty("Il prezzo è obbligatorio"),
  interval: z.string().nonempty("L'intervallo è obbligatorio"),
});

// === audio ===
export const audio_sc = z.object({
  title: z.string().nonempty("Il titolo è obbligatorio"),
  audio: z.any().refine((file) => file instanceof File, {
    message: "L'audio è obbligatorio",
  }),
});

// ============= event common schema ===========
export const event = z.object({
  delivery_type: z.string().nonempty("La modalità di consegna è obbligatoria"),
  event_purpose: z.string().nonempty("Lo scopo è obbligatorio"),
  holistic_discipline: z
    .array(z.string())
    .nonempty("La disciplina olistica è obbligatoria"),
  event_title: z.string().nonempty("Il titolo è obbligatorio"),
  event_description: z.string().nonempty("La descrizione è obbligatoria"),
  min_person: z.string().nonempty("Il numero minimo di persone è obbligatorio"),
  max_person: z.string().nonempty("Il numero massimo di persone è obbligatorio"),
  price: z.string().nonempty("Il prezzo è obbligatorio"),
  event_duration: z.string().optional(),
  tags: z.array(z.string()).nonempty("I tag sono obbligatori"),
  ticket_quantity: z.string().nonempty("La quantità di biglietti è obbligatoria"),
  accessibility: z.array(z.string()).optional(),
});

const eventCountry = z.object({
  city: z.string().nonempty("La città è obbligatoria"),
  province: z.string().nonempty("La provincia è obbligatoria"),
  region: z.string().nonempty("La regione è obbligatoria"),
  country: z.string().nonempty("Il paese è obbligatorio"),
});

const imgSchema = z.object({
  image: z.any().refine((file) => file instanceof File, {
    message: "L'immagine è obbligatoria",
  }),
  video: z.any().refine((file) => file instanceof File, {
    message: "Il video è obbligatorio",
  }),
});

// ====== one to one event ========
export const one2one_offline_sc = event.extend({
  ...eventCountry.shape,
  img: imgSchema.shape.image,
  event_date: z.string().nonempty("La data è obbligatoria"),
  event_time: z.array(z.string()).nonempty("La fascia oraria è obbligatoria"),
});

export const one2one_online_sc = event.extend({
  img: imgSchema.shape.image,
  event_date: z.string().nonempty("La data è obbligatoria"),
  event_time: z.array(z.string()).nonempty("La fascia oraria è obbligatoria"),
});

export const one2one_off_sc_edit = event.extend({
  ...eventCountry.shape,
  img: z.any().optional(),
  event_date: z.string().nonempty("La data è obbligatoria"),
  event_time: z.array(z.string()).nonempty("La fascia oraria è obbligatoria"),
});

export const one2one_on_sc_edit = event.extend({
  img: z.any().optional(),
  event_date: z.string().nonempty("La data è obbligatoria"),
  event_time: z.array(z.string()).nonempty("La fascia oraria è obbligatoria"),
});

// ===== groups events =====
export const group_offline_sc = event.extend({
  ...eventCountry.shape,
  img: imgSchema.shape.image,
  event_date: z.array(z.string()).nonempty("La data è obbligatoria"),
  event_time: z.string().nonempty("La fascia oraria è obbligatoria"),
});

export const group_offline_sc_edit = event.extend({
  ...eventCountry.shape,
  img: z.any().optional(),
  event_date: z.array(z.string()).nonempty("La data è obbligatoria"),
  event_time: z.string().nonempty("La fascia oraria è obbligatoria"),
});

export const group_online_sc = event.extend({
  img: imgSchema.shape.image,
  event_date: z.array(z.string()).nonempty("La data è obbligatoria"),
  event_time: z.string().nonempty("L'orario è obbligatorio"),
});

export const group_online_sc_edit = event.extend({
  img: z.any().optional(),
  event_date: z.array(z.string()).nonempty("La data è obbligatoria"),
  event_time: z.string().nonempty("L'orario è obbligatorio"),
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

// ================= retreat event ================
export const retreat_offline_sc = event.extend({
  ...eventCountry.shape,
  img: imgSchema.shape.image,
  event_date: z.string().nonempty("La data è obbligatoria"),
  event_time: z.string().nonempty("L'orario è obbligatorio"),
});

export const retreat_offline_sc_edit = event.extend({
  ...eventCountry.shape,
  img: z.any().optional(),
  event_date: z.string().nonempty("La data è obbligatoria"),
  event_time: z.string().nonempty("L'orario è obbligatorio"),
});