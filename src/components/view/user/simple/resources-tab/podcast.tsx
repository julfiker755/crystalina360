"use client";
import React, { useState } from "react";
import { AppAlert } from "../../reuse";
import { ImgBox } from "@/components/reuseable/Img-box";
import MusicCard from "../../reuse/music-card";
import { useGetPodcastQuery } from "@/redux/api/admin/podcastApi";
import { Repeat } from "@/components/reuseable/repeat";
import { Skeleton } from "@/components/ui";
import { Pagination } from "@/components/reuseable/pagination";

export function Podcast() {
  const [page, setIsPate] = useState(1);
  const { data: padcast, isLoading } = useGetPodcastQuery({ page });
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 bg-[#FFFAF9]  p-4 lg:p-10 rounded-lg">
        {/* Podcast Image */}
        <div>
          <ImgBox
            src={"/podcast.jpg"}
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
            music at our annual concert featuring top artists and Join us
            for a deep dive into the latest music genres emerging this year.
            It's a celebrati..This event organize for the music lover peoples.
          </p>
        </div>
      </div>
      <div className="space-y-8 pt-8">
        {isLoading ? (
          <Repeat count={10}>
            <Skeleton className="w-full h-40" />
          </Repeat>
        ) : (
          padcast?.data?.map((item: any) => (
            <MusicCard key={item.id} {...item} />
          ))
        )}
        <div className="flex justify-center my-10">
          <Pagination
            onPageChange={(v: any) => setIsPate(v)}
            {...padcast?.meta}
          />
        </div>
      </div>
      <AppAlert />
    </div>
  );
}
