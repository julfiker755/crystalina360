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

  const audioLink = custom ? audioSource : audioSource;

  const togglePlay = (e: any) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    window.dispatchEvent(new CustomEvent("pauseAllAudios", { detail: idx }));

    audio.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    const handlePauseAll = (event: CustomEvent) => {
      if (event.detail !== idx && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    window.addEventListener("pauseAllAudios", handlePauseAll as EventListener);
    return () => {
      window.removeEventListener(
        "pauseAllAudios",
        handlePauseAll as EventListener,
      );
    };
  }, [idx]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(null);
    setIsPlaying(false);
    audio.load();

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

    return () => {
      audio.removeEventListener("loadedmetadata", setMeta);
      audio.removeEventListener("canplay", setMeta);
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioLink]);

  /* ================= TIME FORMAT ================= */
  const formatTime = (t: number | null) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /* ================= PROGRESS ================= */
  const progress = duration ? (currentTime / duration) * 100 : 0;

  /* ================= SEEK ================= */
  const handleProgressBarClick = (e: React.MouseEvent) => {
    if (isPlaying) {
      if (!audioRef.current || !progressBarRef.current || !duration) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const newTime = ((e.clientX - rect.left) / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  /* ================= END ================= */
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
          className,
        )}
        onClick={handleProgressBarClick}
      >
        {/* Progress */}
        <div
          className="absolute top-0 left-0 h-full bg-[#21201f9b] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        <div className="relative flex items-center justify-between">
          {/* Play Button */}
          <Button
            onClick={togglePlay}
            variant="ghost"
            size="sm"
            type="button"
            className="h-8 w-8 p-0 cursor-pointer text-white hover:bg-transparent rounded-full mr-4"
          >
            {isPlaying ? (
              <FavIcon className="size-8 sm:size-10" name="playOn" />
            ) : (
              <FavIcon className="size-8 sm:size-10" name="playoff" />
            )}
          </Button>

          {/* Wave Icon */}
          <FavIcon className="w-full h-12" name="bers_music" />

          {/* Time */}
          <span className="text-sm text-secondery-figma select-none ml-3">
            {isPlaying ? formatTime(currentTime) : formatTime(duration)}
          </span>

          {/* Audio */}
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
