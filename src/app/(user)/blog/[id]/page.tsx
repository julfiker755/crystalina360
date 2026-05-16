import SingleBlog from "@/components/view/user/landing/single-blog";
import { envs, parsedId } from "@/lib";
import { IdParams } from "@/types";
import Script from "next/script";
import React from "react";


const fetchBlog = async (id: string) => {
  const res = await fetch(`${envs.api_url}/blogs/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data?.data || {};
};


export async function generateMetadata({ params }: IdParams): Promise<any> {
  const { id: slug } = await params;
  const id = parsedId(slug)
  const blogItem = await fetchBlog(id);

  const { title, description: text, img: image } = blogItem || {};
  const description = text
    ?.replace(/<[^>]+>/g, "")
    ?.replace(/\s+/g, " ")
    ?.trim()?.slice(0, 160);

  const baseUrl = envs.app_url;
  const url = `${baseUrl}/blog/${slug}`;

  const tags = title
    ?.split(/[,\s]+/)
    ?.filter((word: string) => word.length > 2)
    ?.map((word: string) => word.toLowerCase());

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
      images: [{ url: image, width: 800, height: 600, alt: title }],
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

export default async function Blog({ params }: IdParams) {
  const { id: slug } = await params;
  const id = parsedId(slug)
  const blogItem = await fetchBlog(id);

  const {
    title, description, img: image, created_at, updated_at
  } = blogItem || {};
  const text = description?.replace(/<[^>]+>/g, "")
    ?.replace(/\s+/g, " ")
    ?.trim()?.slice(0, 160);
  const app_url = `${envs.app_url}/blog/${slug}`;
  const publisherLogo = `${envs.app_url}/google/olistami.png`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Olistami",
    headline: title,
    description: text,
    url: app_url,
    image: image,
    datePublished: new Date(created_at).toISOString(),
    dateModified: new Date(updated_at).toISOString(),
    publisher: {
      "@type": "Organization",
      name: "Olistami",
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
      },
    },
    mainEntityOfPage: app_url,
  };
  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SingleBlog />
    </>
  );
}
