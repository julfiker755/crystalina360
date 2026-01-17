"use client";
import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { cn } from "@/lib";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Find video inside container
    const videoEl = containerRef.current.querySelector("video");

    if (!videoEl) return;

    const player = new Plyr(videoEl, {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      settings: ["captions", "quality", "speed"],
    });

    return () => {
      player.destroy();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={cn("plyr__video-embed custom-plyr w-full", className)}
    >
      <video
        playsInline
        preload="metadata"
        poster={"/video.png"}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
