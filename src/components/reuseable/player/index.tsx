"use client";
import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { cn } from "@/lib";

interface VideoPlayerProps {
  className?: string;
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ className, src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        autoplay: true,
        controls: [
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "fullscreen",
        ],
      });

      return () => {
        player.destroy();
      };
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={cn("plyr video-js vjs-default-skin w-full h-full", className)}
      controls
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
