"use client";
import {
  BadgeShow,
  InputShow,
  TextAreaShow,
} from "@/components/reuseable/input-show";
import { SubTitle } from "@/components/reuseable/sub-title";
import TabBox from "@/components/reuseable/tab-box";
import UpdatePassword from "@/components/reuseable/update-password";
import { Button, TabsContent } from "@/components/ui";
import { useGetProfileQuery } from "@/redux/api/authApi";
import FavIcon from "@/icon/favIcon";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useConnectPaypalMutation } from "@/redux/api/operator/opratorApi";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export default function Profile() {
  const { data: profile } = useGetProfileQuery({});
  const {
    name,
    email,
    bio,
    skills,
    residence_city,
    residence_province,
    residence_region,
    residence_country,
    gender,
    sdi_code,
    code_fiscal,
    province_code,
    vat_number,
    company,
    marketing_consent,
  } = profile?.data?.user || {};
  const [connectPaypal, { isLoading: paypalLoading }] =
    useConnectPaypalMutation();

  const collectPaypal = async () => {
    const res = await connectPaypal({}).unwrap();
    if (res.status) {
      window.location.href = res?.data;
    }
  };

  return (
    <div>
      <div className="p-4 rounded-md space-y-6 h-full *:text-figma-black">
        <SubTitle className="text-figma-black" text="Profile" />
        <TabBox
          defaultValue="overview"
          tabItem={["Overview", "Change password"]}
          className="justify-start w-fit"
          tabStyle="border-b  border-transparent data-[state=active]:border-primary!  data-[state=active]:border-b!  data-[state=active]:text-primary"
        >
          <TabsContent value="overview" className="p-0">
            <div className="space-y-7 pt-4 relative">
              <Link
                className="absolute  -top-10 right-0"
                href={`/operator/profile/update`}
              >
                <Button>
                  {" "}
                  <FavIcon color="#fff" name="edit2" />
                  Edit profile
                </Button>
              </Link>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <InputShow label="Your full name" value={name || "N/A"} />
                <InputShow label="Email" value={email || "N/A"} />
                <InputShow label="City" value={residence_city || "N/A"} />
                <InputShow
                  label="Province"
                  value={residence_province || "N/A"}
                />
                <InputShow label="Region" value={residence_region || "N/A"} />
                <InputShow label="Country" value={residence_country || "N/A"} />
                <InputShow label="Gender" value={gender || "N/A"} />
                <InputShow label="Sdi Code" value={sdi_code || "N/A"} />
                <InputShow label="Code Fiscal" value={code_fiscal || "N/A"} />
                <InputShow
                  label="Province Code"
                  value={province_code || "N/A"}
                />
                <InputShow label="Vat Number" value={vat_number || "N/A"} />
                {vat_number?.length > 0 && (
                  <>
                    <InputShow
                      label="Company Name"
                      value={company?.company_name || "N/A"}
                    />
                    <InputShow
                      label="Cmpany Address"
                      value={company?.company_address || "N/A"}
                    />
                    <InputShow
                      label="Company Postal Code"
                      value={company?.company_postal_code || "N/A"}
                    />
                    <InputShow
                      label="Company City"
                      value={company?.company_city || "N/A"}
                    />
                    <InputShow
                      label="Company Province Code"
                      value={company?.company_province_code || "N/A"}
                    />
                  </>
                )}
                <div className="lg:col-span-2">
                  <TextAreaShow label="Your bio" value={bio || "N/A"} />
                </div>
                <div className="lg:col-span-2">
                  <BadgeShow label="Your skills" items={skills || []} />
                </div>
                <div className="bg-gray-50/50 col-span-2 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <label
                        htmlFor="marketing"
                        className="font-bold text-figma-black"
                      >
                        Marketing Consent
                      </label>
                      <p className="text-sm text-gray-500">
                        Receive updates about new features, promotions, and
                        personalized recommendations.
                      </p>
                    </div>
                    <Switch id="airplane-mode" checked={marketing_consent} />
                  </div>
                </div>
              </div>

              <div className="border p-3 rounded-md flex-col lg:flex-row lg:flex items-center justify-center gap-10">
                <div>
                  To collect and receive revenue generated from events, you will
                  need to connect your PayPal account to the system. This will
                  allow payments to be processed and transferred to you smoothly
                  and securely
                </div>
                {/* PayPal connected */}
                {profile?.data?.user?.paypal_merchant_id?.length > 0 ? (
                  <Button
                    disabled
                    className="bg-white border disabled:opacity-80 border-primary/20 text-black font-medium mt-5 lg:mt-0"
                  >
                    <Image
                      src={"/paypal.svg"}
                      width={20}
                      height={20}
                      alt="img"
                    />
                    PayPal Connected
                  </Button>
                ) : (
                  <Button
                    disabled={paypalLoading}
                    onClick={() => collectPaypal()}
                    className="bg-white border border-primary/20 text-black font-medium mt-5 lg:mt-0"
                  >
                    <Image
                      src={"/paypal.svg"}
                      width={20}
                      height={20}
                      alt="img"
                    />
                    {paypalLoading
                      ? "Connecting your Paypal"
                      : "Connect your Paypal account"}
                    <ArrowRight className="text-[#2790C3]" />
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="change-password" className="space-y-6">
            <div className="pt-5">
              <UpdatePassword
                btnStyle="flex w-fit justify-end"
                className="space-y-8"
              />
            </div>
          </TabsContent>
        </TabBox>
      </div>
    </div>
  );
}
