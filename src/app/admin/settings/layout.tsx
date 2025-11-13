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
      <div className="flex flex-1 flex-col space-y-2 md:space-x-5 overflow-hidden md:space-y-2 lg:flex-row">
        <aside className="top-0 lg:sticky">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex flex-1 flex-col h-full rounded-xl overflow-y-hidden border p-4">
          {children}
        </div>
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
