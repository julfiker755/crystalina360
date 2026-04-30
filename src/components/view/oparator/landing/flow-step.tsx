import register from "@/assets/oprator/register.jpg";
import event from "@/assets/oprator/event.png";
import monitor from "@/assets/oprator/monitor.png";
import Image from "next/image";
import { useTranslations } from "next-intl";

const steps = [
  {
    id: 1,
    key: "register",
    image: register,
    w: 230,
  },
  {
    id: 2,
    key: "create_event",
    image: event,
    w: 170,
  },
  {
    id: 3,
    key: "monitor_manage",
    image: monitor,
  },
];

export default function FlowStep() {
  const t = useTranslations("oprator.home.event_setp");
  return (
    <div className="container grid  grid-cols-1 gap-10 lg:grid-cols-3 pt-17">
      {steps.map((step) => (
        <div key={step.id} className="space-x-4">
          <Image
            src={step.image}
            alt="img"
            style={{
              height: "195px",
            }}
            width={step.w || 250}
            height={100}
          />
          <div className="mt-4">
            <h3 className="font-semibold text-2xl">{t(`${step.key}.title`)}</h3>
            <p className="text-sm text-figma-black">
              {t(`${step.key}.description`)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
