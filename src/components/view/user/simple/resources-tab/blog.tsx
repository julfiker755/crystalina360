"use client";
import { Pagination } from "@/components/reuseable/pagination";
import BlogCard from "../../reuse/blog-card";
import { dummyJson } from "../../dummy-json";
import { AppAlert } from "../../reuse";

const blogItem = [
  {
    date: "March 8, 2025",
    title: "Blog title goes here",
    description:
      "This event organize for the music lover peoples. Every members...",
    link: "Read Blog",
  },
  {
    date: "April 15, 2025",
    title: "Exploring New Genres",
    description:
      "Join us for a deep dive into the latest music genres emerging this year. It's a celebrati...",
    link: "Read Blog",
  },
  {
    date: "May 22, 2025",
    title: "Live Concert Experience",
    description:
      "Experience the thrill of live music at our annual concert featuring top artists and lo...",
    link: "Read Blog",
  },
  {
    date: "June 30, 2025",
    title: "Music & Wellness Retreat",
    description:
      "Reconnect with your inner self through a unique blend of music therapy and relaxat...",
    link: "Read Blog",
  },
  {
    date: "August 10, 2025",
    title: "Music Production Workshop",
    description:
      "Unleash your creativity in our hands-on workshop that covers everything fro...",
    link: "Read Blog",
  },
  {
    date: "September 5, 2025",
    title: "Festival of Sounds",
    description:
      "Celebrate a weekend of diverse sounds and cultures with performances from artis...",
    link: "Read Blog",
  },
];

export function Blogs() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {blogItem.map((item, index) => (
          <BlogCard key={index} item={item} />
        ))}
      </div>
      <div className="flex justify-end my-10">
        <Pagination
          onPageChange={(v: any) => console.log(v)}
          {...dummyJson.meta}
        />
      </div>
      <AppAlert className="mb-10" />
    </div>
  );
}
