import Partners from "../simple/partners";

export default function HomeSec() {
  return (
    <div className="lg:h-[calc(100vh-80px)] flex flex-col items-center justify-between">
      <div className="mb-10 lg:mb-0 mt-14">
        <h1 className="font-semibold  lg:text-4xl">
          Your all in one event management system
        </h1>
        <p className="text-figma-black  text-center mt-2">
          Manage your all events in one place
        </p>
      </div>
      <div className="w-full relative">
        <div className="absolute lg-hidden right-0 -top-5 w-[350px] h-[300px] bg-[url('/img/h-r.png')] bg-cover bg-no-repeat z-0" />
        <div className="absolute lg-hidden left-0 -top-5 w-[350px] h-[300px] bg-[url('/img/h-l.png')] bg-cover bg-no-repeat z-0" />
        {/* Foreground layer (z-10) */}
        <div
          className="
              relative 
              homeShadow 
              w-11/12 
              max-w-4xl sm:max-w-5xl lg:max-w-6xl 2xl:max-w-7xl 
              mx-auto 
              h-[200px] lg:h-[550px]  2xl:h-[600px]
              rounded-t-xl border-4 sm:border-8 border-figma-black z-10
              bg-[url('/img/bg2.png')] bg-no-repeat 
              bg-contain lg:bg-cover 
            "
        />
        <Partners />
      </div>
    </div>
  );
}
