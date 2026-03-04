"use client";
import { disciplineOptions } from '@/components/dummy-data';
import { Button, Checkbox, Command, CommandEmpty, CommandGroup, CommandItem, CommandList, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { addonType, helpers } from '@/lib';
import { useBuyPlanMutation, useGetEvtListQuery, useGetSlgAddOnQuery, usePaymentInitOpMutation, useStoreQuestionMutation } from '@/redux/api/operator/opratorApi';
import { AlertCircle, Check, ChevronDown, FileText } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState, useCallback, useEffect, useRef } from 'react';

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
    first_name: '',
    surname: "",
    company_name: '',
    email: '',
    event_id: '',
    disciplines_covered: '',
    website_link: '',
    social_links: '',
    notes: '',
    sponsorship_subject: '',
    indicate: '',
}


export default function AddOnQuestion() {
    const { id } = useParams()
    const { data: addson } = useGetSlgAddOnQuery(id)
    const { id: ids, slug } = addson?.data || {}
    const [eventOptions, setEventOptions] = useState<any[]>([]);
    const [terms, setIsTerms] = useState(false);
    const { data: eventList } = useGetEvtListQuery({})
    const [storeQuestion, { isLoading }] = useStoreQuestionMutation()
    const [formData, setFormData] = useState<FormData>(initFrom)
    const [errors, setErrors] = useState<FormErrors>({});
    const [buyPlan] = useBuyPlanMutation();
    const [paymentInitOp] = usePaymentInitOpMutation();

    const exclusiveTypes = [
        addonType.exclusivePost,
        addonType.exclusiveVideo,
        addonType.blogFeature,
        addonType.podcastSpotlight
    ];
    const isExclusivePost = exclusiveTypes.includes(slug);
    const isPodcastSpotlight = slug === addonType.podcastSpotlight;


    const validate = useCallback(() => {
        const newErrors: FormErrors = {};


        if (!formData.first_name.trim()) {
            newErrors.first_name = "First name is required";
        }

        if (!formData.surname.trim()) {
            newErrors.surname = "Surname is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.event_id) {
            newErrors.event_id = "Event selection is required";
        }

        if (!formData.disciplines_covered.trim()) {
            newErrors.disciplines_covered = "Disciplines covered is required";
        }
        if (isExclusivePost) {
            if (!formData.sponsorship_subject) {
                newErrors.sponsorship_subject = "Sponsorship is required";
            }
        }
        if (isPodcastSpotlight) {
            if (!formData.indicate) {
                newErrors.indicate = "Guest preference is required";
            }
        }
        //    optional fields validation
        if (formData.website_link?.trim() &&
            !/^https?:\/\/\S+$/.test(formData.website_link.trim())) {
            newErrors.website_link = "Enter a valid website URL";
        }

        if (formData.social_links?.trim() &&
            !/^https?:\/\/\S+$/.test(formData.social_links.trim())) {
            newErrors.social_links = "Enter a valid social link URL";
        }

        // 🔥 TERMS VALIDATION
        if (!terms) {
            newErrors.terms = "You must accept the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }, [formData, terms]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const data = helpers.fromData({
                ...formData,
                type: slug,
            })
            const res = await storeQuestion(data).unwrap()
            if (res?.status) {
                setFormData(initFrom)
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
    };


    // console.log(addson)



    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: val
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [errors]);



    useEffect(() => {
        if (eventList?.data) {
            setEventOptions(eventList?.data?.map((item: any) => ({
                label: item.event_title,
                value: item.id?.toString()
            })));
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
                                Service Request
                            </span>
                            <h1 className="text-5xl font-light text-stone-900 leading-[1.1] tracking-tight mb-6">
                                Partner with <br />
                                <span className="font-medium text-primary italic">Olistami</span>
                            </h1>
                            <p className="text-lg text-stone-500 mt-5 leading-relaxed text-center">
                                Please fill out the following questionnaire; the information collected will be necessary and used to forward the service request to
                                Olistami. Where an asterisk is present, the field is mandatory
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-stone-100">
                                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center shrink-0">
                                    <AlertCircle className="w-5 h-5 text-stone-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-stone-800 mb-1">Compulsory Fields</h3>
                                    <p className="text-xs text-stone-500 leading-relaxed">
                                        Fields marked with an asterisk (*) are required for processing.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-stone-100">
                                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5 text-stone-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-stone-800 mb-1">Data Privacy</h3>
                                    <p className="text-xs text-stone-500 leading-relaxed">
                                        Your data is handled securely in accordance with our general terms.
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
                                            label="First name"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            placeholder="John"
                                            required
                                            error={errors.first_name}
                                        />
                                        <FormField
                                            label="Surname"
                                            name="surname"
                                            value={formData.surname}
                                            onChange={handleChange}
                                            placeholder="Doe"
                                            error={errors.surname}
                                        />

                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            label="Company name"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                        />

                                        <FormField
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            error={errors.email}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            label="Website link"
                                            name="website_link"
                                            value={formData.website_link}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                            error={errors.website_link}
                                            type='url'
                                        />
                                        <FormField
                                            label="Primary Social Link"
                                            name="social_links"
                                            value={formData.social_links}
                                            onChange={handleChange}
                                            error={errors.social_links}
                                            placeholder="Optional"
                                            type='url'
                                        />
                                    </div>


                                </div>
                                <div className="space-y-6">
                                    <FormField
                                        label="Olistami Event Link"
                                        name="event_id"
                                        value={formData.event_id}
                                        onChange={handleChange}
                                        target='select'
                                        options={eventOptions}
                                        error={errors.event_id}
                                    />

                                    <FormField
                                        label="Disciplines Covered"
                                        name="disciplines_covered"
                                        value={formData.disciplines_covered}
                                        onChange={handleChange}
                                        target='select'
                                        options={disciplineOptions}
                                        error={errors.disciplines_covered}
                                    />
                                    {isExclusivePost && (
                                        <FormField
                                            label="Sponsorship Subject"
                                            name="sponsorship_subject"
                                            value={formData.sponsorship_subject as any}
                                            onChange={handleChange}
                                            target='select'
                                            options={[
                                                {
                                                    label: "Myself",
                                                    value: "myself",
                                                },
                                                {
                                                    label: "A Specific Event on the Olistami Website",
                                                    value: "A Specific Event on the Olistami Website",
                                                },
                                            ]}
                                            error={errors.sponsorship_subject}
                                        />
                                    )}
                                    {isPodcastSpotlight && (
                                        <FormField
                                            label="Guest Preference"
                                            name="indicate"
                                            value={formData.indicate as any}
                                            onChange={handleChange}
                                            target='select'
                                            options={[
                                                {
                                                    label: "Yes, I want to participate personally",
                                                    value: "Yes, I want to participate personally",
                                                },
                                                {
                                                    label: "No, I prefer you handle it yourselves",
                                                    value: "No, I prefer you handle it yourselves",
                                                },
                                            ]}
                                            error={errors.indicate}
                                        />
                                    )}


                                    <FormField
                                        label="Additional Notes"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your requirements (optional)"
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
                                                            setErrors(prev => {
                                                                const newErrors = { ...prev };
                                                                delete newErrors.terms;
                                                                return newErrors;
                                                            });
                                                        }
                                                    }}
                                                    className={!terms && errors.terms ? "border-red-400" : ""}
                                                />
                                            </div>

                                            <label
                                                className={`leading-relaxed cursor-pointer select-none ${errors.terms ? "text-red-400" : "text-stone-500"
                                                    }`}
                                            >
                                                I declare that I have read and accepted the general terms and conditions of contract, and I authorise Olistami as per the text reported above.
                                            </label>
                                        </div>
                                        <p className="mt-4 text-sm text-stone-400 italic leading-relaxed border-t border-stone-200/50 pt-4">
                                            By submitting, you authorise Olistami srl to manage the content in accordance with an obligation of means. Submission implies full acceptance of these terms.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="pt-2">
                                    <Button disabled={isLoading} className="w-full h-12">Submit</Button>

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
            <label className="text-sm font-medium text-stone-600 ml-1">
                {label}
            </label>

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
                                <div className='text-stone-300'>
                                    {selectedOption
                                        ? <span className='text-black'>{selectedOption.label}</span>
                                        : "Select an option"}
                                </div>
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent style={{
                            width: popoverRef.current
                                ? `${popoverRef.current.offsetWidth}px`
                                : "auto",
                        }} className="p-0 w-full">
                            <Command>
                                <CommandList>
                                    <CommandEmpty>No event found</CommandEmpty>
                                    <CommandGroup>
                                        {options?.map((item, idx) => (
                                            <CommandItem
                                                key={idx}
                                                value={item.label}
                                                onSelect={() =>
                                                    handleSelect(item.value)
                                                }
                                            >
                                                <Check
                                                    className={`mr-2 h-4 w-4 ${value === item.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
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

            {error && (
                <p className="text-xs text-red-400 ml-1">{error}</p>
            )}
        </div>
    );
};