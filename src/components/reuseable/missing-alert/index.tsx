"use client"
import { Button, Checkbox, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/api/authApi'
import { cityOptions, countryOptions, genderOptions, provinceOptions, regionOptions } from '@/components/dummy-data'
import Form from "@/components/reuseable/from";
import { zodResolver } from '@hookform/resolvers/zod'
import { missing_sc } from '@/schema'
import { AlertCircle, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { FormSelDropdown } from '../from-select@1'
import { helpers } from '@/lib'


export default function MissingInfo() {
    const token = helpers.hasAuthToken()
    const [isShow, setIsShow] = useState(false)
    const { data: profile } = useGetProfileQuery({}, { skip: !token });
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

    const form = useForm({
        resolver: zodResolver(missing_sc),
        defaultValues: {
            gender: "",
            residence_city: "",
            residence_province: "",
            residence_region: "",
            residence_country: "",
            marketing_consent: null,
        },
    });


    useEffect(() => {
        if (profile?.data?.user) {
            const {
                gender,
                residence_city,
                residence_province,
                residence_region,
                residence_country,
                marketing_consent,
            } = profile.data.user || {};

            form.reset({
                residence_city: residence_city || "",
                residence_province: residence_province || "",
                residence_region: residence_region || "",
                residence_country: residence_country || "",
                marketing_consent,
                gender: gender || "",
            });

            // Check if any field is missing
            const isMissing =
                !gender ||
                !residence_city ||
                !residence_province ||
                !residence_region ||
                !residence_country

            if (isMissing && !isShow) {
                const timer = setTimeout(() => {
                    setIsShow(true);
                }, 3 * 60 * 1000); // 5 * 60 * 1000 --5 min

                return () => clearTimeout(timer);
            }
        }
    }, [profile, isShow]);


    const handleSubmit = async (values: FieldValues) => {
        const data = helpers.fromData({
            gender: values?.gender,
            residence_city: values?.residence_city,
            residence_province: values?.residence_province,
            residence_region: values?.residence_region,
            residence_country: values?.residence_country,
            marketing_consent: values?.marketing_consent,
        });
        const res = await updateProfile(data).unwrap();
        if (res.status) {
            form.reset();
            setIsShow(false)
        }
        try {
        } catch (err: any) {
            console.log("Update profile error:", err);
        }
    };



    return (
        <Dialog open={isShow} onOpenChange={setIsShow}>
            <DialogTrigger asChild />
            <DialogContent
                showCloseButton={false}
                onPointerDownOutside={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
                overlyStyle={`transition-opacity duration-200`}
                className={"sm:max-w-xl p-0 gap-0 bg-background rounded-2xl overflow-y-auto  max-h-[95vh] h-fit scrollbar-hide border-none"}
            >
                <DialogHeader className="bg-primary text-white p-4 sr-only">
                    <DialogTitle className={"text-white font-medium"}>

                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only"></DialogDescription>
                <div className='px-1 py-6'>
                    <X onClick={() => setIsShow(false)} className='absolute top-3 right-3 cursor-pointer text-black' />
                    <div className="flex items-start gap-4 mb-6">
                        <div className="shrink-0 rounded-full p-3">
                            <AlertCircle className="text-figma-primary" size={32} />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl  font-bold text-black">
                                Missing Your Information
                            </h2>
                            <p className="text-black/90 text-sm md:text-base">
                                Complete the following fields to save your account settings
                            </p>
                        </div>
                    </div>

                    <Form className="space-y-4 p-3" from={form} onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <FormSelDropdown
                                label="-Country-"
                                name="residence_country"
                                options={countryOptions}
                            />
                            <FormSelDropdown
                                label="-Region-"
                                name="residence_region"
                                options={regionOptions}
                            />
                            <FormSelDropdown
                                label="-Province-"
                                name="residence_province"
                                options={provinceOptions}
                            />

                            <FormSelDropdown
                                label="-City-"
                                name="residence_city"
                                options={cityOptions}
                            />
                            <FormSelDropdown
                                label="-gender-"
                                name="gender"
                                options={genderOptions}
                            />
                            <div className="flex items-center gap-1 ml-1">
                                <Checkbox
                                    checked={form.watch("marketing_consent") as any}
                                    onCheckedChange={(v: any) => {
                                        form.setValue("marketing_consent", v);
                                    }}
                                />
                                <h5>Marketing Consent</h5>
                            </div>
                        </div>

                        <Button disabled={isUpdating} className="w-full">
                            Save Changes
                        </Button>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
