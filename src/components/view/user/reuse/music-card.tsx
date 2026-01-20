"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import FavIcon from "@/icon/favIcon";

interface MusicCardProps {
  id: number;
  title: string;
  audio_file: string;
}

export default function MusicCard({ id, title, audio_file }: MusicCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // ================= PLAY / PAUSE =================
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Pause other music cards
      window.dispatchEvent(
        new CustomEvent("pauseAllMusicCards", { detail: id }),
      );
      audio.play();
      setIsPlaying(true);
    }
  }, [isPlaying, id]);

  // ================= PAUSE OTHER CARDS =================
  useEffect(() => {
    const handlePauseAll = (event: CustomEvent) => {
      if (event.detail !== id && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    window.addEventListener(
      "pauseAllMusicCards",
      handlePauseAll as EventListener,
    );

    return () => {
      window.removeEventListener(
        "pauseAllMusicCards",
        handlePauseAll as EventListener,
      );
    };
  }, [id]);

  // ================= AUDIO EVENTS =================
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // ================= HELPERS =================
  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // ================= SEEK =================
  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isPlaying) {
        const audio = audioRef.current;
        if (!audio || !duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const seekTime = ((e.clientX - rect.left) / rect.width) * duration;

        audio.currentTime = seekTime;
        setCurrentTime(seekTime);
      }
    },
    [isPlaying, duration],
  );

  // ================= REWIND AND FAST-FORWARD =================
  const handleRewind = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 10,
      );
    }
  }, []);

  const handleFastForward = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        duration,
        audioRef.current.currentTime + 30,
      );
    }
  }, [duration]);

  return (
    <div className="bg-[#FBFBFB] transition-colors p-6 rounded-xl">
      <div className="mb-2">
        <h3 className="font-medium text-xl text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm">OLISTAMI Podcast</p>
      </div>

      <div className="flex relative items-center gap-4">
        {/* Play Button */}
        <div
          onClick={togglePlay}
          className="w-12 h-11 rounded-full cursor-pointer flex items-center justify-center bg-primary"
        >
          {isPlaying ? (
            <FavIcon className="size-8" name="u_plase" />
          ) : (
            <FavIcon className="size-8" name="play" />
          )}
        </div>

        {/* Progress Bar */}
        <div
          onClick={handleSeek}
          className="w-full bg-[#EBEBEB] rounded-full h-2 overflow-hidden cursor-pointer"
        >
          <div
            className="bg-primary h-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time */}
        <div className="text-sm text-muted-foreground absolute right-2 -bottom-1">
          {isPlaying ? formatTime(currentTime) : formatTime(duration)}
        </div>
      </div>

      {/* Action Buttons (Rewind & Fast Forward) */}
      <div className="flex items-center space-x-3 mt-5">
        <button onClick={handleRewind}>
          <FavIcon className="cursor-pointer" name="cut10" />
        </button>

        <button onClick={handleFastForward}>
          <FavIcon className="cursor-pointer" name="cut30" />
        </button>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} preload="metadata">
        <source src={audio_file} type="audio/mpeg" />
      </audio>
    </div>
  );
}
