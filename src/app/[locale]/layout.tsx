import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./style/globals.css";
import Provider from "@/provider";
import { envs } from "@/lib";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

// Apply Montserrat font
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const metadataBase = new URL(envs.app_url as string);

export const metadata: Metadata = {
  metadataBase,
  title: "Eventi di Benessere Olistico | Esperienze e Percorsi - Olistami",
  keywords: [
    "Stay connected events",
    "Event search and filter",
    "Event types",
    "Event location",
    "Ticket booking online",
    "Smooth booking system",
    "Reliable ticket system",
    "Track bookings",
    "Event invoices",
    "Event updates",
    "Easy ticket purchase",
    "Manage event schedule",
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} className="scroll-smooth!">
      <body className={`${montserrat.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
