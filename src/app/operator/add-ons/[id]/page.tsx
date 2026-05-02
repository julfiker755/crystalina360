"use client";
import { disciplineOptions } from "@/components/dummy-data";
import {
  Button,
  Checkbox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { addonType, helpers } from "@/lib";
import {
  useBuyPlanMutation,
  useGetEvtListQuery,
  useGetSlgAddOnQuery,
  usePaymentInitOpMutation,
  useStoreQuestionMutation,
} from "@/redux/api/operator/opratorApi";
import { AlertCircle, Check, ChevronDown, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useState, useCallback, useEffect, useRef } from "react";

interface FormData {
  first_name: string;
  surname: string;
  company_name: string;
  email: string;
  event_id: string;
  disciplines_covered: string;
  website_link: string;
  social_links: string;
  notes: string;
  sponsorship_subject?: string;
  indicate?: string;
}

interface FormErrors {
  [key: string]: string;
  terms?: any;
}

const initFrom = {
  first_name: "",
  surname: "",
  company_name: "",
  email: "",
  event_id: "",
  disciplines_covered: "",
  website_link: "",
  social_links: "",
  notes: "",
  sponsorship_subject: "",
  indicate: "",
};

export default function AddOnQuestion() {
  const t = useTranslations("oprator.question");
  const { id } = useParams();
  const { data: addson } = useGetSlgAddOnQuery(id);
  const [isloading, setIsLoading] = useState(false);
  const { id: ids, slug } = addson?.data || {};
  const [eventOptions, setEventOptions] = useState<any[]>([]);
  const [terms, setIsTerms] = useState(false);
  const { data: eventList } = useGetEvtListQuery({});
  const [storeQuestion] = useStoreQuestionMutation();
  const [formData, setFormData] = useState<FormData>(initFrom);
  const [errors, setErrors] = useState<FormErrors>({});
  const [buyPlan] = useBuyPlanMutation();
  const [paymentInitOp] = usePaymentInitOpMutation();

  const exclusiveTypes = [
    addonType.exclusivePost,
    addonType.exclusiveVideo,
    addonType.blogFeature,
    addonType.podcastSpotlight,
  ];
  const isExclusivePost = exclusiveTypes.includes(slug);
  const isPodcastSpotlight = slug === addonType.podcastSpotlight;

  const validate = useCallback(() => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = t("right.frist_name_error");
    }

    if (!formData.surname.trim()) {
      newErrors.surname = t("right.surname_error");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("right.email_error");
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t("right.email_invalid_error");
    }

    if (!formData.event_id) {
      newErrors.event_id = t("right.event_error");
    }

    if (!formData.disciplines_covered.trim()) {
      newErrors.disciplines_covered = t("right.disciplines_error");
    }
    if (isExclusivePost) {
      if (!formData.sponsorship_subject) {
        newErrors.sponsorship_subject = t("right.sponsorship_required_error");
      }
    }
    if (isPodcastSpotlight) {
      if (!formData.indicate) {
        newErrors.indicate = t("right.guest_preference_required_error");
      }
    }
    //    optional fields validation
    if (
      formData.website_link?.trim() &&
      !/^https?:\/\/\S+$/.test(formData.website_link.trim())
    ) {
      newErrors.website_link = t("right.website_link_error");
    }

    if (
      formData.social_links?.trim() &&
      !/^https?:\/\/\S+$/.test(formData.social_links.trim())
    ) {
      newErrors.social_links = t("right.social_links_error");
    }

    // 🔥 TERMS VALIDATION
    if (!terms) {
      newErrors.terms = t("right.terms_error");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, terms]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (validate()) {
      const data = helpers.fromData({
        ...formData,
        type: slug,
      });
      const res = await storeQuestion(data).unwrap();
      if (res?.status) {
        setFormData(initFrom);
        // ==== payment===
        const data = helpers.fromData({
          addson_id: ids,
        });

        const res = await buyPlan(data).unwrap();
        if (res.status) {
          const res1 = await paymentInitOp(res?.data?.invoice_no);
          window.location.href = res1?.data?.data;
        }
      }
    }
    setIsLoading(false);
  };

  // console.log(addson)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      const val =
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

      setFormData((prev) => ({
        ...prev,
        [name]: val,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors],
  );

  useEffect(() => {
    if (eventList?.data) {
      setEventOptions(
        eventList?.data?.map((item: any) => ({
          label: item.event_title,
          value: item.id?.toString(),
        })),
      );
    }
  }, [eventList]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Side: Info */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                {t("left.service_request")}
              </span>
              <h1 className="text-5xl font-light text-stone-900 leading-[1.1] tracking-tight mb-6">
                {t("left.partner_with")} <br />
                <span className="font-medium text-primary italic">
                  {t("left.olistami")}
                </span>
              </h1>
              <p className="text-lg text-stone-500 mt-5 leading-relaxed text-center">
                {t("left.text")}
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-stone-100">
                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-stone-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-800 mb-1">
                    {t("left.compulsory_fields")}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {t("left.company_fields_text")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-stone-100">
                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-stone-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-stone-800 mb-1">
                    {t("left.data_privacy")}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    {t("left.data_privacy_text")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7 animate-slide-up [animation-delay:100ms]">
            <div className="bg-white rounded-[2.5rem] shadow-stone-200/30 border border-stone-100 overflow-hidden">
              <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-10">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label={t("right.first_name")}
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder={t("right.frist_name_placeholder")}
                      required
                      error={errors.first_name}
                    />
                    <FormField
                      label={t("right.surname")}
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder={t("right.surname_placeholder")}
                      error={errors.surname}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label={t("right.company_name")}
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder={t("right.optional")}
                    />

                    <FormField
                      label={t("right.email")}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("right.email_placeholder")}
                      required
                      error={errors.email}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label={t("right.website_link")}
                      name="website_link"
                      value={formData.website_link}
                      onChange={handleChange}
                      placeholder={t("right.optional")}
                      error={errors.website_link}
                      type="url"
                    />
                    <FormField
                      label={t("right.primary_social_link")}
                      name="social_links"
                      value={formData.social_links}
                      onChange={handleChange}
                      error={errors.social_links}
                      placeholder={t("right.optional")}
                      type="url"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <FormField
                    label={t("right.olistami_event_link")}
                    name="event_id"
                    value={formData.event_id}
                    onChange={handleChange}
                    target="select"
                    options={eventOptions}
                    error={errors.event_id}
                  />

                  <FormField
                    label={t("right.disciplines_covered")}
                    name="disciplines_covered"
                    value={formData.disciplines_covered}
                    onChange={handleChange}
                    target="select"
                    options={disciplineOptions}
                    error={errors.disciplines_covered}
                  />
                  {isExclusivePost && (
                    <FormField
                      label={t("right.sponsorship_subject")}
                      name="sponsorship_subject"
                      value={formData.sponsorship_subject as any}
                      onChange={handleChange}
                      target="select"
                      options={[
                        {
                          label: t("right.myself"),
                          value: "myself",
                        },
                        {
                          label: t("right.a_specific_event"),
                          value: "A Specific Event on the Olistami Website",
                        },
                      ]}
                      error={errors.sponsorship_subject}
                    />
                  )}
                  {isPodcastSpotlight && (
                    <FormField
                      label={t("right.guest_preference")}
                      name="indicate"
                      value={formData.indicate as any}
                      onChange={handleChange}
                      target="select"
                      options={[
                        {
                          label: t("right.participate_personally"),
                          value: "Yes, I want to participate personally",
                        },
                        {
                          label: t("right.no_i_prefer_you_placeholder"),
                          value: "No, I prefer you handle it yourselves",
                        },
                      ]}
                      error={errors.indicate}
                    />
                  )}

                  <FormField
                    label={t("right.additional_notes")}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={t("right.tell_us_more")}
                    target="textarea"
                    maxLength={400}
                    error={errors.notes}
                  />
                </div>

                {/* Terms */}
                <div className="pt-4">
                  <div className="bg-stone-50 rounded-3xl p-6 border border-stone-100">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center h-6">
                        <Checkbox
                          checked={terms}
                          onCheckedChange={() => {
                            setIsTerms(!terms);
                            if (!terms) {
                              setErrors((prev) => {
                                const newErrors = { ...prev };
                                delete newErrors.terms;
                                return newErrors;
                              });
                            }
                          }}
                          className={
                            !terms && errors.terms ? "border-red-400" : ""
                          }
                        />
                      </div>

                      <label
                        className={`leading-relaxed cursor-pointer select-none ${
                          errors.terms ? "text-red-400" : "text-stone-500"
                        }`}
                      >
                        {t("right.terms_title")}{" "}
                      </label>
                    </div>
                    <p className="mt-4 text-sm text-stone-400 italic leading-relaxed border-t border-stone-200/50 pt-4">
                      {t("right.terms_text")}
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <Button disabled={isloading} className="w-full h-12">
                    {t("right.submit")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Form Field Component ---

interface FormFieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (e: any) => void;
  target?: "input" | "textarea" | "select";
  maxLength?: number;
  options?: any[];
}

const FormField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  target = "input",
  maxLength,
  options = [],
}: FormFieldProps) => {
  const t = useTranslations("oprator.question");
  const baseStyle = `
        w-full px-4 py-3 bg-stone-50/50 border rounded-2xl transition-all duration-200 outline-none
        border-stone-200 focus:border-primary/60 focus:ring-4 focus:ring-primary/5
        text-stone-700 placeholder:text-stone-300
    `;
  const popoverRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (selectedValue: string) => {
    onChange({
      target: {
        name,
        value: selectedValue,
      },
    });
    setOpen(false);
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-stone-600 ml-1">{label}</label>

      <div className="relative">
        {target === "textarea" ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={3}
            className={`${baseStyle} resize-y`}
          />
        ) : target === "input" ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={baseStyle}
          />
        ) : (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                ref={popoverRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between rounded-2xl  h-12 font-normal"
              >
                <div className="text-stone-300">
                  {selectedOption ? (
                    <span className="text-black">{selectedOption.label}</span>
                  ) : (
                    t("right.select_an_option")
                  )}
                </div>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              style={{
                width: popoverRef.current
                  ? `${popoverRef.current.offsetWidth}px`
                  : "auto",
              }}
              className="p-0 w-full"
            >
              <Command>
                <CommandList>
                  <CommandEmpty>No event found</CommandEmpty>
                  <CommandGroup>
                    {options?.map((item, idx) => (
                      <CommandItem
                        key={idx}
                        value={item.label}
                        onSelect={() => handleSelect(item.value)}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            value === item.value ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        {item.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        {maxLength && (
          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-stone-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {error && <p className="text-xs text-red-400 ml-1">{error}</p>}
    </div>
  );
};
