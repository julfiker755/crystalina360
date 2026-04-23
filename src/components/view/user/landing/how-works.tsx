import assets from "@/assets";
import Image from "next/image";
import { useTranslations } from "next-intl";



export default function HowWorks() {
  const t = useTranslations('user.home.how_works')



  const howItem = [
    {
      id: 1,
      title: t('items.account.title'),
      text: t('items.account.text'),
      img: assets.works.account,
    },
    {
      id: 2,
      title: t('items.events.title'),
      text: t('items.events.text'),
      img: assets.works.events,
    },
    {
      id: 3,
      title: t('items.booking.title'),
      text: t('items.booking.text'),
      img: assets.works.book,
    },
    {
      id: 4,
      title: t('items.invoice.title'),
      text: t('items.invoice.text'),
      img: assets.works.get,
    },
  ];
  return (
    <div className="pt-16 container">
      <h1 className="mb-10">{t('title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {howItem.map((item, index) => (
          <div key={index} className="bg-figma-gray rounded-2xl">
            <div className="relative w-full h-56">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover rounded-t-2xl"
              />
            </div>
            <div className="p-5">
              <h2 className="text-xl font-semibold text-figma-black">
                {item.title}
              </h2>
              <p className="mt-1">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
