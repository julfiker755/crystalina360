import { useStoreNewsletMutation } from "@/redux/api/admin/newsletterApi";
import AppStore from "@/components/reuseable/app-store/app-store";
// import sonner from "@/components/reuseable/sonner";
// import { Button, Input } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { helpers } from "@/lib";
import { useState } from "react";
import assets from "@/assets";

export default function Footer() {
  // const [email, setIsEmail] = useState("");
  // const [storeNewslet, { isLoading }] = useStoreNewsletMutation();
  const socialMedia = [
    { name: "facebook", icon: "facebook" },
    { name: "youtube", icon: "youtube" },
    { name: "instagram", icon: "instagram" },
  ];

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const data = helpers.fromData({
  //       email: email,
  //     });
  //     const res = await storeNewslet(data).unwrap();
  //     if (res.status) {
  //       setIsEmail("");
  //       sonner.success(
  //         "Subscribed!",
  //         "Your subscription was successfull",
  //         "bottom-right",
  //       );
  //     }
  //   } catch (err: any) {
  //     sonner.error("Oops!", err?.data?.message, "bottom-right");
  //     setIsEmail("");
  //   }
  // };

  return (
    <div className="bg-figma-black py-10 lg:py-16 *:text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-4">
            <div>
              <picture>
                <img src={assets.logoWhite.src} alt="logo" className="w-50" />
              </picture>
            </div>
            <div>
              <h5 className="text-xl mb-2">
                Manage your all events in one place
              </h5>
              <p>
                The operator dashboard lets event managers create, manage, and
                track events with ease, offering full control and clear insights
                for smooth execution.
              </p>
            </div>
          </div>
          {/* <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-semibold text-white mb-3 md:mb-7">
              Newsletter
            </h3>
            <div>
              <label>Email</label>
              <div className="relative mt-1">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  required={true}
                  value={email}
                  onChange={(e) => setIsEmail(e.target.value)}
                  className="w-full pl-10 border-none text-black bg-[#F4F4F4] rounded-sm"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <FavIcon name="mail" className="size-4" color="#777777" />
                </div>
              </div>
            </div>
            <Button disabled={isLoading} className="mt-3">
              Subscribe
            </Button>
          </form> */}
          <div className="lg:ml-5">
            <h3 className="text-xl font-semibold text-white mb-3">
              Quick links
            </h3>
            <ul className="space-y-1">
              <li>Home</li>
              <li>Explore</li>
              <li>Booking</li>
              <li>Contact Us</li>
              <li>Profile</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold  mb-3 text-white">
              Follow us on
            </h3>
            <div className="space-y-4">
              <ul className="flex items-center  space-x-3">
                {socialMedia &&
                  socialMedia.map((item) => (
                    <li
                      key={item.name}
                      className="bg-[#FFFFFF]/20 size-12 rounded-md grid place-items-center"
                    >
                      <FavIcon name={item.icon as any} className="size-6" />
                    </li>
                  ))}
              </ul>
              <AppStore />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
