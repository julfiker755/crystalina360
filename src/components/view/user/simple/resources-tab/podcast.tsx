"use client";
import React, { useState } from "react";
import { AppAlert } from "../../reuse";
import { ImgBox } from "@/components/reuseable/Img-box";
import MusicCard from "../../reuse/music-card";
import { useGetPodcastQuery } from "@/redux/api/admin/podcastApi";
import { Repeat } from "@/components/reuseable/repeat";
import { Button, Skeleton } from "@/components/ui";
import { Pagination } from "@/components/reuseable/pagination";
import { useTranslations } from "next-intl";
import FavIcon from "@/icon/favIcon";

export function Podcast() {
  const t = useTranslations("user.home.podcast");
  const [page, setIsPate] = useState(1);
  const { data: padcast, isLoading } = useGetPodcastQuery({ page });
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-6 bg-[#FFFAF9]  p-4 lg:p-10 rounded-lg">
        {/* Podcast Image */}
        <div>
          <ImgBox
            src={"/podcast.png"}
            className="w-full lg:w-55 h-55 rounded-lg bg-muted overflow-hidden"
            alt="The OLISTAMI Podcast"
          />
        </div>

        {/* Podcast Info */}
        <div className="flex-1">
          <h2 className="text-foreground text-2xl mb-3">{t("title")}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-2xl text-balance">
            {t("description")}
          </p>
          <div className="space-x-2">
            <a href="https://podcasts.apple.com/it/podcast/olistoria-storiepratiche-e-scienze-dal-mondo-olistico/id1835702572" target="_blank">
              <Button className="bg-[#A345DA] rounded-sm">
                <FavIcon className="size-5" name="apple_padcast" />{t("apple_podcast")}
              </Button>

            </a>
            <a href="https://open.spotify.com/show/0G0eJbQ4pLxpvcIrSWXiSh" target="_blank">
              <Button className="bg-[#242938] rounded-sm">
                <FavIcon className="size-5" name="spotify_padcast" />{t("spotify")}
              </Button>
            </a>
          </div>
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
