import { cn } from "@/lib/utils";

interface AppStoreProps {
  className?: string;
  titleStyle?: string;
  mainStyle?: string;
}

const AppStore = ({ className, titleStyle, mainStyle }: AppStoreProps) => {
  return (
    <div className={className}>
      <h3 className={cn("font-semibold text-white text-lg mb-2", titleStyle)}>
        Download Our App
      </h3>
      <div className={cn("flex gap-3 items-start", mainStyle)}>
        <a
          href="https://play.google.com/store/games?hl=en&pli=1"
          target="_blank"
        >
          <div className="bg-[#FFFFFF]/20 flex items-center h-14 px-5 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M18.63 16.565L24.03 13.8072C24.99 13.4474 24.99 12.0085 24.03 11.5289L18.63 8.89089L14.79 12.728L18.63 16.565ZM18.63 16.565L3.27001 24.2379M18.63 16.565L14.79 12.7267M14.79 12.7267L18.63 8.88962L2.55 0.855763C1.71 0.496039 0.75 1.09558 0.75 2.05485V23.3985C0.75 24.3578 1.71 25.0772 2.55 24.5976L3.27001 24.2379M14.79 12.7267L3.27001 24.2379M14.79 12.7267L3.26998 1.21629"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <h1 className="text-lg font-bold text-white ml-2">Play Store</h1>
          </div>
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank">
          <div className="bg-[#FFFFFF]/20 flex items-center h-14 px-5 rounded-lg">
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.66667 18.3333L9.14133 15.68M11.008 12.3173L14.3333 6.33333M6.33333 15.6667H13M16.8667 15.6667H19.6667M18.3333 18.3333L14.9867 12.3093M13.004 8.74L11.6707 6.33333M1 13C1 14.5759 1.31039 16.1363 1.91345 17.5922C2.5165 19.0481 3.40042 20.371 4.51472 21.4853C5.62902 22.5996 6.95189 23.4835 8.4078 24.0866C9.86371 24.6896 11.4241 25 13 25C14.5759 25 16.1363 24.6896 17.5922 24.0866C19.0481 23.4835 20.371 22.5996 21.4853 21.4853C22.5996 20.371 23.4835 19.0481 24.0866 17.5922C24.6896 16.1363 25 14.5759 25 13C25 11.4241 24.6896 9.86371 24.0866 8.4078C23.4835 6.95189 22.5996 5.62902 21.4853 4.51472C20.371 3.40042 19.0481 2.5165 17.5922 1.91345C16.1363 1.31039 14.5759 1 13 1C11.4241 1 9.86371 1.31039 8.4078 1.91345C6.95189 2.5165 5.62902 3.40042 4.51472 4.51472C3.40042 5.62902 2.5165 6.95189 1.91345 8.4078C1.31039 9.86371 1 11.4241 1 13Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h1 className="text-lg font-bold text-white ml-2">App Store</h1>
          </div>
        </a>
      </div>
    </div>
  );
};

export default AppStore;
