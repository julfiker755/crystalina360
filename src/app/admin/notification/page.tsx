import NavTitle from "@/components/reuseable/nav-title";
import FavIcon from "@/icon/favIcon";

const notifications = [
  {
    id: 1,
    title: "9+ new users registered",
    description: "Tap to view new users",
    date: "05-04-2025",
    time: "05:50 PM",
    color: "border-l-blue-500",
  },
  {
    id: 2,
    title: "9+ new operator registered",
    description: "Tap to view new operators",
    date: "05-04-2025",
    time: "05:50 PM",
    color: "border-l-yellow-500",
  },
  {
    id: 3,
    title: "New event",
    description: "A new event posted. Tap to view",
    date: "05-04-2025",
    time: "05:50 PM",
    color: "border-l-red-500",
  },
];

export default function Notification() {
  return (
    <div>
      <NavTitle
        title="Notifications"
        subTitle="Manage all the notifications across your system from this section"
      />
      <div className="space-y-8 py-5">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`border-l-4 ${notification.color} border p-3 rounded-xl grid grid-cols-1 lg:grid-cols-3`}
          >
            <div className="mb-2 md:mb-0">
              <h3 className="lg:text-base xl:text-xl font-semibold  text-blacks">
                {notification.title}
              </h3>
              <p className="text-sm text-blacks">
                {notification.description}{" "}
                <span className="text-gray1 cursor-pointer">Tap to view</span>
              </p>
            </div>
            <ul className="md:left-1/2 relative space-y-2 *:text-gray1">
              <li className="flex items-center gap-1">
                <FavIcon stroke="#888888" name="calender" className="size-4" />
                <span className="text-sm text-[#888888]">
                  {notification.date}
                </span>
              </li>
              <li className="flex items-center gap-1">
                <FavIcon
                  color="#888888"
                  name="ongoing_events"
                  className="size-4"
                />
                <span className="text-sm text-[#888888]">
                  {notification.time}
                </span>
              </li>
            </ul>

            <div className="text-gray-500  items-center hidden md:flex md:justify-end">
              <FavIcon name="read" className="size-4" />
              {/* <FavIcon name="unRead" className="size-4" /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
