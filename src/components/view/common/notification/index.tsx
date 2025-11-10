import Avatars from "@/components/reuseable/avater";
import { SubTitle } from "@/components/reuseable/sub-title";

const NotificationList = [
  {
    id: "1",
    user: {
      name: "Marks",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marks",
      initials: "M",
    },
    action: "added a task",
    type: "task",
    timestamp: "09:00 AM",
    active: true,
  },
  {
    id: "2",
    user: {
      name: "Daniel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
      initials: "D",
    },
    action: "submitted a task for proof",
    type: "proof",
    timestamp: "09:00 AM",
    active: false,
  },
  {
    id: "3",
    user: {
      name: "Marks",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marks",
      initials: "M",
    },
    action: "added a task",
    type: "task",
    timestamp: "09:00 AM",
    active: true,
  },
  {
    id: "4",
    user: {
      name: "Yusuf",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yusuf",
      initials: "Y",
    },
    action: "added an account for verify",
    type: "account",
    timestamp: "09:00 AM",
    active: false,
  },
  {
    id: "5",
    user: {
      name: "Marks",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marks",
      initials: "M",
    },
    action: "added a task",
    type: "task",
    timestamp: "09:00 AM",
    active: true,
  },
  {
    id: "6",
    user: {
      name: "Yusuf",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yusuf",
      initials: "Y",
    },
    action: "added an account for verify",
    type: "account",
    timestamp: "09:00 AM",
    active: false,
  },
  {
    id: "7",
    user: {
      name: "Yusuf",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yusuf",
      initials: "Y",
    },
    action: "added an account for verify",
    type: "account",
    timestamp: "09:00 AM",
    active: false,
  },
];

export default function NotificationBox() {
  return (
    <>
      <ul className="flex items-center justify-between mt-10 md:mt-16 mb-10">
        <li>
          <SubTitle text="Notification" />
        </li>
        <li className="font-medium underline cursor-pointer text-primary">
          Read all
        </li>
      </ul>
      <div className="border p-4 rounded-xl mb-10">
        <div className="space-y-4">
          {NotificationList.map((item, index) => (
            <div
              key={index}
              className={`flex items-center ${
                item.active && "bg-[#FBFBFB]"
              }  py-2 px-2 rounded-md justify-between space-x-2`}
            >
              <div className="flex space-x-2 items-center">
                <Avatars
                  src=""
                  fallback={item.user.name}
                  alt={item.user.name}
                />
                <p
                  className={`text-article ${
                    item?.active && "text-figma-black"
                  }`}
                >
                  {item.action}
                </p>
              </div>
              <p
                className={`text-article ${item?.active && "text-figma-black"}`}
              >
                {item.timestamp}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
