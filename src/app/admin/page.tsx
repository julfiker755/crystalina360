import NavTitle from "@/components/reuseable/nav-title";
import PreferencesChart from "@/components/view/admin/simple/preferences-chart";
import StatisticsChart from "@/components/view/admin/simple/statistics-chart";
import FavIcon from "@/icon/favIcon";

const totalStash = [
  {
    title: "Total user",
    value: 1200,
    icon: "users",
  },
  {
    title: "Total operators",
    value: 300,
    icon: "operators",
  },
  {
    title: "Ticket sold",
    value: 17000,
    icon: "t_ticket",
  },
  {
    title: "Total revenue",
    value: 35000,
    icon: "doller",
  },
];

export default function RootPage() {
  return (
    <div>
      <NavTitle
        title="Dashboard"
        subTitle="Your overall dashboard overview. See the statistics, analytics and manage them"
      />
      <div className="bg-figma-sidebar p-5 rounded-xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6 ">
          <div className="col-span-1 lg:col-span-2 p-4 relative">
            <ul className="lg:absolute bottom-0 left-0">
              <li className="font-semibold text-[28px]">Hello Abid!</li>
              <li className="text-figma-a_gray">
                Track and manage your application from here.
              </li>
            </ul>
          </div>
          {totalStash.map((item, index) => (
            <ul key={index} className="bg-white p-4  rounded-xl">
              <li className="size-[50px]  grid rounded-xl place-items-center  bg-primary">
                <FavIcon
                  color={item.icon == "t_ticket" ? "" : "#fff"}
                  name={item.icon as any}
                />
              </li>
              <li className="text-figma-a_gray mt-2">{item.title}</li>
              <li className="font-bold text-xl leading-9 lg:text-[28px]">
                {item.value}
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className="my-8 space-y-8">
        <div>
          <h2 className="text-2xl font-medium mb-3">
            User and operator registration statistics
          </h2>
          <StatisticsChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-medium mb-3">Recent activities</h2>
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-3">
              Event posting preferences
            </h2>
            <PreferencesChart />
          </div>
        </div>
      </div>
    </div>
  );
}
