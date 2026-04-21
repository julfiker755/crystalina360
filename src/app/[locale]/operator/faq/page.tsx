import fqaImg from "@/assets/user/fqa.jpg";
import Image from "next/image";
import FqaBox from "@/components/view/oparator/simple/fqa-box";

export default function FAQ() {
  return (
    <div className="container pt-10 pb-20">
      <div className="container h-[200px] mx-auto relative mb-10  rounded-xl">
        <Image
          src={fqaImg}
          alt="title"
          fill
          loading="eager"
          className="object-cover z-0 rounded-xl"
        />
        {/* Dark Overlay */}
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
          }}
          className="absolute inset-0  rounded-xl"
        />
        <div className="relative h-full flex flex-col items-center justify-center">
          <h1 className="text-3xl  md:text-5xl text-center  font-bold text-white  leading-tight">
            FAQ
          </h1>
        </div>
      </div>
      <FqaBox />
    </div>
  );
}
