import React from "react";
import { AppAlert } from "../../reuse";
import { ImgBox } from "@/components/reuseable/Img-box";
import { RandomImg } from "@/lib";
import MusicCard from "../../reuse/music-card";

const musicItem = [
  {
    id: 1,
    title: "Mental Health & Wellness Journey",
    author: "by Mindful Voices",
    duration: "1:32:15",
    likes: 245,
    progress: 20,
  },
  {
    id: 2,
    title: "Understanding Anxiety Disorders",
    author: "by Dr. Sarah Johnson",
    duration: "45:30",
    likes: 187,
    progress: 75,
  },
  {
    id: 3,
    title: "Coping Strategies for Stress",
    author: "by Wellness Today",
    duration: "38:45",
    likes: 312,
    progress: 90,
  },
];

export function Podcast() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 bg-[#FFFAF9]  p-4 lg:p-10 rounded-lg">
        {/* Podcast Image */}
        <div>
          <ImgBox
            src={RandomImg()}
            className="w-full lg:w-55 h-55 rounded-lg bg-muted overflow-hidden"
            alt="The OLISTAMI Podcast"
          />
        </div>

        {/* Podcast Info */}
        <div className="flex-1">
          <h2 className="text-foreground text-2xl mb-3">
            The OLISTAMI Podcast
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl text-balance">
            Reconnect with your inner self through a unique blend of music
            therapy and relaxant Celebrate a weekend of diverse sounds and
            cultures with performances from artis Experience the thrill of live
            music at our annual concert featuring top artists and......Join us
            for a deep dive into the latest music genres emerging this year.
            It's a celebrati..This event organize for the music lover peoples.
          </p>
        </div>
      </div>
      <div className="space-y-8 pt-8">
        {musicItem.map((item) => (
          <MusicCard key={item.id} item={item} />
        ))}
      </div>
      <AppAlert />
    </div>
  );
}
