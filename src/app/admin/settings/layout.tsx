import NavTitle from "@/components/reuseable/nav-title";
import SidebarNav from "@/components/view/admin/simple/sideber-nav";
import { childrenProps } from "@/types";

export default function SettingsLayout({ children }: childrenProps) {
  return (
    <div>
      <NavTitle
        title="Settings"
        subTitle="Manage privacy policy, FAQ, admin profile etc. from this section"
      />
      <div className="flex flex-1 flex-col lg:flex-row gap-4 space-x-10">
        <div className="block w-full lg:w-[280px] lg:shrink-0 lg:sticky top-24 h-fit">
          <SidebarNav items={sidebarNavItems} defaultPath="/admin/settings" />
        </div>

        <div className="flex-1 border rounded-xl p-4">{children}</div>
      </div>
    </div>
  );
}

const sidebarNavItems = [
  {
    label: "Account",
    icon: "users",
    act_io: "users_i",
    to: "/admin/settings",
  },
  {
    label: "Change password",
    icon: "cn_pass",
    act_io: "cn_pass_ac",
    to: "/admin/settings/change-password",
  },
  {
    label: "Privacy policy",
    icon: "privacy",
    act_io: "privacy_ac",
    to: "/admin/settings/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    icon: "terms",
    act_io: "terms_ac",
    to: "/admin/settings/terms-conditions",
  },
  {
    label: "FAQ",
    icon: "faq",
    act_io: "faq_ac",
    to: "/admin/settings/faq",
  },
];
