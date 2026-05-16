import EventDetailsBox from "@/components/view/user/simple/event-details-box";
import { delivary_t, envs, parsedId } from "@/lib";
import { SlugParams } from "@/types";
import Script from "next/script";
import React from "react";


const fetchSlgEvent = async (id: any) => {
  const res = await fetch(`${envs.api_url}/events/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data?.event || {};
};

export async function generateMetadata({ params }: SlugParams): Promise<any> {
  const { slug: slugItem } = await params;
  const id = parsedId(slugItem)
  const events = await fetchSlgEvent(id);

  const { event_title: title,
    event_description,
    img, delivery_type } = events || {};

  const description = (event_description ?? "")?.slice(0, 160)


  let image;
  if (delivery_type == delivary_t.ondemand) {
    image = `${envs.app_url}/videoImg.jpg`;
  } else {
    image = `${img}`;
  }

  const url = `${envs.app_url}/events/${slugItem}`;

  const tags = title
    ?.split(/[,\s]+/)
    ?.filter((word: string) => word?.length > 2)
    ?.map((word: string) => word?.toLowerCase());

  return {
    title,
    keywords: tags?.join(", "),
    alternates: {
      canonical: url,
    },
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{
        url: image, width: 1200,
        height: 630, alt: title
      }],
      type: "website",
      siteName: "Olistami",
    },
    other: {
      facebook: ["website", url, title, description, image],
      linkedin: [url, title, description, image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function EventSingle({ params }: SlugParams) {
  const { slug: slugItem } = await params;
  const id = parsedId(slugItem)
  const events = await fetchSlgEvent(id);


  const url = `${envs.app_url}/events/${slugItem}`;
  const description = (events.event_description ?? "")?.slice(0, 155)


  let image;
  if (events.delivery_type == delivary_t.ondemand) {
    image = `${envs.app_url}/videoImg.jpg`;
  } else {
    image = `${events.img}`;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: events.event_title,
    description: description,
    image: image,
    url: url,

    organizer: events.organizer?.name
      ? {
        "@type": "Organization",
        name: events.organizer.name,
        logo: events.organizer?.img
          ? {
            "@type": "ImageObject",
            url: events.organizer.img,
          }
          : undefined,
      }
      : undefined,

    location: {
      "@type": "Place",
      name: `${events.city || ""} ${events.region || ""} ${events.province || ""} ${events.country || ""}`.trim(),
      address: {
        "@type": "PostalAddress",
        addressLocality: events.city,
        addressRegion: events.region,
        addressCountry: events.country,
      },
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",
    mainEntityOfPage: url,
    inLanguage: "en",
  };
  return (
    <>
      <Script
        id="event-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <EventDetailsBox />
    </>
  );
}
