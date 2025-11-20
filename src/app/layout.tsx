import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Importing Montserrat font
import "./style/globals.css";
import Provider from "@/provider";
import { envs } from "@/lib";

// Apply Montserrat font
const montserrat = Montserrat({
  variable: "--font-montserrat", // Font variable name
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plan Your Next Experience",
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
    "Stay connected to the events that matter most to you. Easily search and filter by type, location, or price range. Book tickets in seconds with a smooth, reliable system. Track your bookings, invoices, and event updates effortlessly.",
  openGraph: {
    title: "Plan Your Next Experience",
    description:
      "Stay connected to the events that matter most to you. Easily search and filter by type, location, or price range. Book tickets in seconds with a smooth, reliable system. Track your bookings, invoices, and event updates effortlessly.",
    url: envs.app_url,
    images: [
      {
        url: "/favImg.png",
        width: 800,
        height: 600,
        alt: "Plan Your Next Experience",
      },
    ],
    type: "website",
    siteName: "olistami",
  },
  other: {
    facebook: [
      "website",
      envs.app_url as string,
      "Plan Your Next Experience",
      "Stay connected to the events that matter most to you. Easily search and filter by type, location, or price range. Book tickets in seconds with a smooth, reliable system. Track your bookings, invoices, and event updates effortlessly",
      "/favImg.png",
    ],
    linkedin: [
      "website",
      envs.app_url as string,
      "Plan Your Next Experience",
      "Stay connected to the events that matter most to you. Easily search and filter by type, location, or price range. Book tickets in seconds with a smooth, reliable system. Track your bookings, invoices, and event updates effortlessly",
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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
