"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FavIcon from "@/icon/favIcon";
import { cn } from "@/lib";

type MusicPlayerProps = {
  audioSource: string;
  custom?: boolean;
  idx?: number;
  className?: string;
};

export function MusicPlayer({
  audioSource,
  custom = true,
  idx,
  className,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const audioLink = custom
    ? process.env.NEXT_PUBLIC_IMG_URL + audioSource
    : audioSource;

  /** 🎵 Play / Pause */
  const togglePlay = (e: any) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Pause other audio players
      window.dispatchEvent(new CustomEvent("pauseAllAudios", { detail: idx }));
      audio.play();
      setIsPlaying(true);
    }
  };

  /** 🧠 Pause other audio players */
  useEffect(() => {
    const handlePauseAll = (event: CustomEvent) => {
      if (event.detail !== idx && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentTime(0); // Reset progress for other tracks
      }
    };

    window.addEventListener("pauseAllAudios", handlePauseAll as EventListener);
    return () => {
      window.removeEventListener(
        "pauseAllAudios",
        handlePauseAll as EventListener
      );
    };
  }, [idx]);

  /** 🕒 Load duration and track progress */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Reset on new audio
    setCurrentTime(0);
    setDuration(null);

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      if (!isNaN(audio.duration)) setDuration(audio.duration);
    };

    const setMeta = () => {
      if (!isNaN(audio.duration) && audio.duration !== Infinity) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("loadedmetadata", setMeta);
    audio.addEventListener("canplay", setMeta);
    audio.addEventListener("timeupdate", updateTime);

    // Manual fallback (sometimes metadata loads late)
    setTimeout(() => {
      if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    }, 300);

    return () => {
      audio.removeEventListener("loadedmetadata", setMeta);
      audio.removeEventListener("canplay", setMeta);
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioLink]);

  /** ⏱ mm:ss formatting */
  const formatTime = (t: number | null) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /** 📈 Progress % */
  const progress = duration ? (currentTime / duration) * 100 : 0;

  /** ⏭ Seek */
  const handleProgressBarClick = (e: React.MouseEvent) => {
    if (!audioRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const newTime = ((e.clientX - rect.left) / rect.width) * (duration || 0);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  /** ⏹ When track ends */
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="w-full">
      <div
        ref={progressBarRef}
        className={cn(
          "relative w-full rounded-full bg-white px-4 py-3 overflow-hidden cursor-pointer",
          className
        )}
        onClick={handleProgressBarClick}
      >
        <div
          className="absolute top-0 left-0 h-full bg-[#343D00] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        <div className="relative flex items-center justify-between">
          <Button
            onClick={togglePlay}
            variant="ghost"
            size="sm"
            type="button"
            className="h-8 w-8 p-0 cursor-pointer text-white hover:bg-white/20 rounded-full mr-4"
          >
            {isPlaying ? (
              <FavIcon className="size-8 sm:size-10" name="playOn" />
            ) : (
              <FavIcon className="size-8 sm:size-10" name="playoff" />
            )}
          </Button>

          <FavIcon className="w-full h-12" name="bers_music" />

          <span className="text-sm text-secondery-figma select-none ml-3">
            {isPlaying ? formatTime(currentTime) : formatTime(duration)}
          </span>

          <audio ref={audioRef} preload="metadata" onEnded={handleEnded}>
            <source src={audioLink} type="audio/mpeg" />
            <source src={audioLink} type="audio/ogg" />
            Your browser does not support audio.
          </audio>
        </div>
      </div>
    </div>
  );
}
