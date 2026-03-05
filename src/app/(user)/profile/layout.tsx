"use client";
import { AppAlert } from "@/components/view/user/reuse";
import ProfileBox from "@/components/view/user/simple/profile-box";
import { childrenProps } from "@/types";

export default function UserProfileLayout({ children }: childrenProps) {
    return (
        <div className="container py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <ProfileBox />
                <div className="col-span-1 lg:col-span-2">
                    {children}
                </div>
            </div>
            <AppAlert className="pb-10" />
        </div>
    );
}

