import ContactUs from "@/components/view/user/landing/contact-us";
import { AppAlert } from "@/components/view/user/reuse";

export default function ContactMe() {
  return (
    <div>
      <ContactUs
        title="Contact with OLISTAMI Team"
        className="mt-20 max-w-5xl"
      />
      <div className="container mb-10">
        <AppAlert />
      </div>
    </div>
  );
}
