import NotificationBox from "@/components/view/common/notification";
import { AppAlert } from "@/components/view/user/reuse";

export default function Notification() {
  return (
    <div className="container">
      <NotificationBox />
      <AppAlert className="mb-10" />
    </div>
  );
}
