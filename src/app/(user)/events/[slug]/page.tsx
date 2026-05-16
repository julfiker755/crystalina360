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
    event_description: description,
    img, delivery_type } = events || {};


  let image;
  if (delivery_type == delivary_t.ondemand) {
    image = `${envs.app_url}/videoImg.jpg`;
  } else {
    image = `${img}`;
  }

  const url = `${envs.app_url}/events/${slugItem}`;

  const tags = title
    ?.split(/[,\s]+/)
    ?.filter((word: string) => word.length > 2)
    ?.map((word: string) => word.toLowerCase());

  return {
    title,
    keywords: tags?.join(", "),
    canonical: url,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 800, height: 600, alt: title }],
      type: "website",
      siteName: "Olistami",
    },
    other: {
      facebook: ["website", url, title, description, image],
      linkedin: [url, title, description, image],
    },
  };
}

export default async function Blog({ params }: SlugParams) {
  const { slug: slugItem } = await params;
  const id = parsedId(slugItem)
  const events = await fetchSlgEvent(id);

  const { event_title: title,
    event_description: description,
    img, organizer, delivery_type } = events || {};

  const url = `${envs.app_url}/events/${slugItem}`;


  let image;
  if (delivery_type == delivary_t.ondemand) {
    image = `${envs.app_url}/videoImg.jpg`;
  } else {
    image = `${img}`;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Olistami",
    headline: title,
    description: description,
    url: url,
    image: image,
    publisher: {
      "@type": "Organization",
      name: organizer?.name,
      logo: {
        "@type": "ImageObject",
        url: organizer?.img,
      },
    },
    mainEntityOfPage: url,
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
