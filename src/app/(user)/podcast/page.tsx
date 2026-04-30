import { Podcast } from "@/components/view/user/simple/resources-tab";
import { Seo } from "@/lib";
import React from "react";

export const metadata = Seo({
  title: "The OLISTAMI Podcast",
  description:
    "Reconnect with your inner self through a unique blend of music therapy and relaxant Celebrate a weekend of diverse sounds and cultures with performances from artis Experience the thrill of live music at our annual concert featuring top artists and Join us for a deep dive into the latest music genres emerging this year. It's a celebrati..This event organize for the music lover peoples",
  url: "/podcast",
  image: "/podcast.jpg",
});

export default function PodcastPage() {
  return (
    <div className="container py-20">
      <Podcast />
    </div>
  );
}
