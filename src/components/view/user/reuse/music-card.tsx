"use client";
import { useState } from "react";
import FavIcon from "@/icon/favIcon";

interface item {
  id: number;
  title: string;
  author: string;
  duration: string;
  likes: number;
  progress: number;
}

export default function MusicCard({ item }: { item: item }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-[#FBFBFB] transition-colors p-6">
      <div className="mb-2">
        <h3 className="font-medium text-xl text-foreground text-balance">
          {item.title}
        </h3>
        <p className="text-muted-foreground text-sm">{item.author}</p>
      </div>
      <div className="flex relative items-center gap-4">
        {/* Play Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`size-10  rounded-full cursor-pointer flex items-center justify-center transition-colors
            bg-primary`}
        >
          <FavIcon className="text-sm!" name="play" />
        </button>

        <div className="w-full bg-[#EBEBEB] rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full transition-all"
            style={{ width: `${item.progress}%` }}
          />
        </div>
        <div className="text-sm text-muted-foreground absolute right-2 -bottom-1">
          {item.duration}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 mt-5">
        <FavIcon className="cursor-pointer" name="cut10" />
        <FavIcon className="cursor-pointer" name="cut30" />
      </div>
    </div>
  );
}
