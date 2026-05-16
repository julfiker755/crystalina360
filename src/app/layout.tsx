import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Importing Montserrat font
import "./style/globals.css";
import Provider from "@/provider";
import { envs } from "@/lib";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";

// Apply Montserrat font
const montserrat = Montserrat({
  variable: "--font-montserrat", // Font variable name
  subsets: ["latin"],
});

const metadataBase = new URL(envs.app_url as string);

export const metadata: Metadata = {
  metadataBase,
  title: "Eventi di Benessere Olistico | Esperienze e Percorsi - Olistami",
  keywords: [
    "Olistami",
    "Olistami Italy",
    "Best Events in Italy",
    "Italy Events",
    "Olistami Podcast",
    "Olistami Events",
    "Olistami Partnerships",
    "Olistami Blog",
    "Latest Events in Italy",
    "Upcoming Events",
    "Business Events",
    "Networking Events",
    "Wellness Events",
    "Holistic Events",
    "Professional Events",
    "One-to-One Events",
    "One-to-One Sessions",
    "Group Events",
    "Retreat Events",
    "Wellness Retreats",
    "Healing Retreats",
    "Workshops in Italy",
    "Seminars in Italy",
    "Conferences in Italy",
    "Community Events",
    "Health and Wellness Events",
    "Lifestyle Events",
    "Cultural Events in Italy",
    "Exclusive Events",
    "Event Booking Platform",
    "Italy Event Platform",
    "Olistami Community",
    "Olistami Services"
  ],
  description:
    "venti, percorsi ed esperienze di benessere olistico dal vivo, online e on- demand.Scopri proposte curate e prenota con un sistema semplice e affidabile",
  openGraph: {
    title: "Eventi di Benessere Olistico | Esperienze e Percorsi - Olistami",
    description:
      "venti, percorsi ed esperienze di benessere olistico dal vivo, online e on- demand.Scopri proposte curate e prenota con un sistema semplice e affidabile",
    url: envs.app_url,
    images: [
      {
        url: "/favImg.png",
        width: 800,
        height: 600,
        alt: "Eventi di Benessere Olistico | Esperienze e Percorsi - Olistami",
      },
    ],
    type: "website",
    siteName: "olistami",
  },
  other: {
    facebook: [
      "website",
      envs.app_url as string,
      "Eventi di Benessere Olistico | Esperienze e Percorsi - Olistami",
      "venti, percorsi ed esperienze di benessere olistico dal vivo, online e on- demand.Scopri proposte curate e prenota con un sistema semplice e affidabile",
      "/favImg.png",
    ],
    linkedin: [
      "website",
      envs.app_url as string,
      "Eventi di Benessere Olistico | Esperienze e Percorsi - Olistami",
      "venti, percorsi ed esperienze di benessere olistico dal vivo, online e on- demand.Scopri proposte curate e prenota con un sistema semplice e affidabile",
      "/favImg.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth!">
      <body className={`${montserrat.variable}`}>
        <NextIntlClientProvider>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
