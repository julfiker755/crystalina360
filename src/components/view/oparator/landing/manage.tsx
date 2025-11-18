"use client";
import Image from "next/image";
import mangeImg from "@/assets/oprator/mange.jpg";
import { Button } from "@/components/ui";
import Modal2 from "@/components/reuseable/modal2";
import { toggleIsOpen } from "@/redux/features/authSlice";
import AuthModalController from "@/components/view/common/auth-controller";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AppState } from "@/redux/store";

export default function Manage() {
  const dispatch = useAppDispatch();
  const { isOpen, user } = useAppSelector((state: AppState) => state.auth);
  return (
    <div className="container pb-16">
      <div className="relative rounded-xl h-[450px] lg:h-[400px] w-full">
        <Image
          src={mangeImg}
          alt="title"
          fill
          loading="eager"
          className="object-cover z-0 rounded-xl"
        />
        <div className="absolute top-0 left-0 w-full lg:w-1/2 bottom-0 bg-white/20 backdrop-blur-[50px] rounded-l-xl rounded-r-xl lg:rounded-r-none">
          <div className="absolute top-1/2 -translate-y-1/2 px-4 lg:px-16 space-y-3 lg:space-y-4">
            <h1 className="text-left text-white">Create, manage, monitor</h1>
            <p className="text-white">
              This operator dashboard is designed to give event managers
              complete control over their activities. From creating and
              scheduling events to monitoring registrations, managing attendees,
              and tracking performance, it provides a streamlined way to handle
              everything in one place. With a clear interface and actionable
              insights, operators can ensure smooth event execution and make
              data-driven decisions for better outcomes.
            </p>
            <Button
              onClick={() => dispatch(toggleIsOpen())}
              size="lg"
              className="text-primary bg-white rounded-full"
            >
              Sign in as operator
            </Button>
          </div>
        </div>
      </div>
      {/*  ========== modal ====== */}
      <Modal2
        open={isOpen}
        setIsOpen={(v) => dispatch(toggleIsOpen(v))}
        mainStyle="!p-0"
        className="sm:max-w-xl"
      >
        <AuthModalController title="Sign up as a operator" />
      </Modal2>
    </div>
  );
}

// import { Button } from "@/components/ui";
// import business from "@/assets/user/businessImg.jpg";
// import Image from "next/image";
// import Link from "next/link";

// export default function Business() {
//   return (
//     <div className="py-10 container">
//       <h1 className="mb-10">Grow Your Business</h1>
//       <div className="container mx-auto relative rounded-xl">
//         <Image
//           src={business}
//           alt="title"
//           fill
//           loading="eager"
//           className="object-cover z-0 rounded-xl"
//         />
//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/35 rounded-xl backdrop-blur-[2px]" />

//         {/* Content */}
//         <div className="relative py-4 md:py-16 md:px-10">
//           {/* Heading */}
//           <h1 className="text-3xl text-left md:text-5xl  font-bold text-white mb-5 leading-tight">
//             Expand Your Reach, Maximize Your Impact.
//           </h1>

//           {/* Description */}
//           <p className="text-lg md:text-xl text-white/90 mb-8">
//             Our platform helps operators easily publish events, accept bookings,
//             and grow revenue. Join today and take your event business to the
//             next level.
//           </p>

//           {/* CTA Button */}
//           <Link href="/operator">
//             <Button size="lg" className="bg-[#FFF] text-primary">
//               Join as a operator
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
