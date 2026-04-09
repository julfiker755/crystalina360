"use client"
import { usePurchaseStoreMutation } from '@/redux/api/user/userEventsApi';
import { usePaymentInitMutation } from "@/redux/api/user/paymetsApi";
import React, { useState } from 'react'
import { Button } from '@/components/ui';
import Link from 'next/link';

export default function OnDemand({
    id,
}: any) {
    const [paymentLoading, setIsPaymentLoading] = useState(false);
    const [purchaseStore, { isLoading: purchaseLoading }] =
        usePurchaseStoreMutation();
    const [paymentInit] = usePaymentInitMutation();
    const handlePurchase = async () => {
        setIsPaymentLoading(true);
        try {
            const data = {
                event_id: id
            };

            const res = await purchaseStore(data).unwrap();
            if (res.status) {
                const res2 = await paymentInit({
                    invoice_no: res?.data.invoice_no,
                }).unwrap();
                //  ========= link ========
                const paypalLink = res2.data?.link;
                window.location.href = paypalLink;
            }
        } finally {
            setIsPaymentLoading(false);
        }
    };
    return (
        <div className='mt-10'>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Link href={"/conversation"}>
                    <Button
                        type="button"
                        className="bg-transparent  w-full border border-[#ECE8E8] text-[#C4ACA4]"
                    >
                        Send Message
                    </Button>
                </Link>

                <Button
                    onClick={() => handlePurchase()}
                    className="w-full"
                >
                    {paymentLoading ? "Waiting for payment..." : "Purchase Now"}
                </Button>
            </div>
        </div>
    )
}
