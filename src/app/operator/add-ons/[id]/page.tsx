"use client";

import { Button } from '@/components/ui';
import {
    User,
    Building2,
    Mail,
    Link as LinkIcon,
    Globe,
    Share2,
    FileText,
    AlertCircle,
    Send,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import React, { useState, useCallback } from 'react';

// --- Types ---

interface FormData {
    fullName: string;
    companyName: string;
    email: string;
    eventLink: string;
    disciplines: string;
    websiteLink: string;
    socialLink: string;
    notes: string;
    acceptedTerms: boolean;
}

interface FormErrors {
    [key: string]: string;
}

// --- Components ---

interface FormFieldProps {
    label: string;
    name: keyof FormData;
    type?: string;
    placeholder?: string;
    icon: React.ElementType;
    value: string;
    error?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isTextArea?: boolean;
    maxLength?: number;
}

const FormField = ({
    label,
    name,
    type = 'text',
    placeholder,
    icon: Icon,
    value,
    error,
    required,
    onChange,
    isTextArea,
    maxLength
}: FormFieldProps) => {
    const baseClasses = `
    w-full px-4 py-3 bg-stone-50/50 border rounded-2xl transition-all duration-200 outline-none
    ${error ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-stone-200 focus:border-primary focus:ring-4 focus:ring-primary/5'}
    text-stone-700 placeholder:text-stone-300
  `;

    return (
        <div className="space-y-1.5">
            <label htmlFor={name} className="flex items-center gap-2 text-sm font-medium text-stone-600 ml-1">
                <Icon className="w-4 h-4 text-stone-400" />
                {label} {required && <span className="text-red-400">*</span>}
            </label>

            <div className="relative">
                {isTextArea ? (
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={3}
                        className={`${baseClasses} resize-none`}
                    />
                ) : (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={baseClasses}
                    />
                )}

                {maxLength && (
                    <div className="absolute bottom-2 right-3 text-[10px] font-mono text-stone-400">
                        {value.length}/{maxLength}
                    </div>
                )}
            </div>

            {error && (
                <p className="text-xs text-red-500 ml-1 animate-slide-down">
                    {error}
                </p>
            )}
        </div>
    );
};

// --- Main App ---

export default function App() {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        companyName: '',
        email: '',
        eventLink: '',
        disciplines: '',
        websiteLink: '',
        socialLink: '',
        notes: '',
        acceptedTerms: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = useCallback(() => {
        const newErrors: FormErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'First name and Surname is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Contact e-mail is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.eventLink.trim()) newErrors.eventLink = 'Event link on Olistami is required';
        if (!formData.disciplines.trim()) newErrors.disciplines = 'Disciplines covered by the event is required';
        if (!formData.acceptedTerms) newErrors.acceptedTerms = 'You must accept the terms and conditions';

        if (formData.notes.length > 400) {
            newErrors.notes = 'Notes cannot exceed 400 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitting(false);
            setIsSuccess(true);
        }
    };

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
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-stone-200/30 border border-stone-100 overflow-hidden">
                            <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-10">

                                {/* Section: Contact Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-px flex-1 bg-stone-100"></div>
                                        <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Contact Information</span>
                                        <div className="h-px flex-1 bg-stone-100"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            label="Full Name"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            icon={User}
                                            required
                                            error={errors.fullName}
                                        />
                                        <FormField
                                            label="Company Name"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                            icon={Building2}
                                        />
                                    </div>

                                    <FormField
                                        label="Contact Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        icon={Mail}
                                        required
                                        error={errors.email}
                                    />
                                </div>

                                {/* Section: Event Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-px flex-1 bg-stone-100"></div>
                                        <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Event Details</span>
                                        <div className="h-px flex-1 bg-stone-100"></div>
                                    </div>

                                    <FormField
                                        label="Olistami Event Link"
                                        name="eventLink"
                                        value={formData.eventLink}
                                        onChange={handleChange}
                                        placeholder="https://olistami.com/event/..."
                                        icon={LinkIcon}
                                        required
                                        error={errors.eventLink}
                                    />

                                    <FormField
                                        label="Disciplines Covered"
                                        name="disciplines"
                                        value={formData.disciplines}
                                        onChange={handleChange}
                                        placeholder="Yoga, Meditation, etc."
                                        icon={FileText}
                                        required
                                        error={errors.disciplines}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            label="Website"
                                            name="websiteLink"
                                            value={formData.websiteLink}
                                            onChange={handleChange}
                                            placeholder="https://..."
                                            icon={Globe}
                                        />
                                        <FormField
                                            label="Social Link"
                                            name="socialLink"
                                            value={formData.socialLink}
                                            onChange={handleChange}
                                            placeholder="Instagram, etc."
                                            icon={Share2}
                                        />
                                    </div>

                                    <FormField
                                        label="Additional Notes"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your requirements..."
                                        icon={FileText}
                                        isTextArea
                                        maxLength={400}
                                        error={errors.notes}
                                    />
                                </div>

                                {/* Terms */}
                                <div className="pt-4">
                                    <div className="bg-stone-50 rounded-3xl p-6 border border-stone-100">
                                        <div className="flex items-start gap-4">
                                            <div className="flex items-center h-6">
                                                <input
                                                    id="acceptedTerms"
                                                    name="acceptedTerms"
                                                    type="checkbox"
                                                    checked={formData.acceptedTerms}
                                                    onChange={handleChange}
                                                    className="w-5 h-5 text-primary border-stone-300 rounded-lg focus:ring-primary/20 cursor-pointer transition-colors"
                                                />
                                            </div>
                                            <label htmlFor="acceptedTerms" className="text-xs text-stone-500 leading-relaxed cursor-pointer select-none">
                                                I declare that I have read and accepted the general terms and conditions of contract, and I authorise Olistami as per the text reported above.
                                            </label>
                                        </div>
                                        {errors.acceptedTerms && (
                                            <p className="text-[10px] text-red-500 mt-2 ml-9 animate-slide-down">
                                                {errors.acceptedTerms}
                                            </p>
                                        )}

                                        <p className="mt-4 text-[10px] text-stone-400 italic leading-relaxed border-t border-stone-200/50 pt-4">
                                            By submitting, you authorise Olistami srl to manage the content in accordance with an obligation of means. Submission implies full acceptance of these terms.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="pt-2">
                                    <Button className="w-full h-12">Submit Request
                                        <Send className="w-5 h-5" />
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
