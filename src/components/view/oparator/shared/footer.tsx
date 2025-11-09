import assets from "@/assets";
import AppStore from "@/components/reuseable/app-store/app-store";
import { Button, Input } from "@/components/ui";
import FavIcon from "@/icon/favIcon";

export default function Footer() {
  const socialMedia = [
    { name: "facebook", icon: "facebook" },
    { name: "youtube", icon: "youtube" },
    { name: "instagram", icon: "instagram" },
  ];
  return (
    <div className="bg-figma-black py-16 *:text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-50">
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

          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
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
            <h3 className="text-xl font-semibold text-white mb-3">
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
