import SingleBlog from "@/components/view/user/landing/single-blog";
import { authKey, envs } from "@/lib";
import { IdParams } from "@/types";
import { cookies } from "next/headers";
import React from "react";

export async function generateMetadata({ params }: IdParams): Promise<any> {
  const { id } = await params;
  const token = (await cookies())?.get(authKey)?.value;
  const res = await fetch(`${envs.api_url}/blogs/${id}`, {
    cache: "no-store",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  const data = await res.json();

  const { title, description: text, image } = data?.data || {};
  const description = text
    ?.replace(/<[^>]+>/g, "")
    ?.replace(/\s+/g, " ")
    ?.trim();

  const baseUrl = envs.app_url;
  const url = `${baseUrl}/blogs/${id}`;

  const tags = title
    ?.split(/[,\s]+/)
    ?.filter((word: string) => word.length > 2)
    ?.map((word: string) => word.toLowerCase());

  return {
    title,
    keywords: tags.join(", "),
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 800, height: 600, alt: title }],
      type: "website",
      siteName: "MY TSV",
    },
    other: {
      facebook: ["website", url, title, description, image],
      linkedin: [url, title, description, image],
    },
  };
}

export default async function Blog({ params }: IdParams) {
  return (
    <div>
      <SingleBlog />
    </div>
  );
}
