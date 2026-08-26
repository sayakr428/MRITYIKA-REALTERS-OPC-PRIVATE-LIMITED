"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SpeakerHigh,
  SpeakerSlash,
  Rewind,
  FastForward,
  CornersOut,
  CornersIn,
} from "@phosphor-icons/react/dist/ssr";
import { showcaseVideo } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function Amenities() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state with HTML video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // Handle Play / Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      // Unmute on explicit user start if volume > 0
      if (video.muted && volume > 0) {
        video.muted = false;
        setIsMuted(false);
      }
      video.play().catch(() => {});
    }
  };

  // Seek backward/forward by X seconds
  const seekRelative = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
  };

  // Seek via timeline progress bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = progressContainerRef.current;
    const video = videoRef.current;
    if (!container || !video || !duration) return;

    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = percentage * duration;
  };

  // Sound Mute / Unmute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Volume slider change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    const video = videoRef.current;
    if (video) {
      video.volume = val;
      if (val === 0) {
        video.muted = true;
        setIsMuted(true);
      } else {
        video.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Autohide controls on inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="amenities" className="bg-paper pb-16 pt-12 md:pb-24 md:pt-20">
      <div className="container-page">
        <SectionHeading
          title="Shantiban City Experience"
          body="Explore the scenic landscapes, open pathways, and serene ambiance of your future home."
        />

        {/* Main Video Player Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className="group relative mt-6 md:mt-8 overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-black/10"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={showcaseVideo.src}
            playsInline
            preload="metadata"
            onClick={togglePlay}
            className="aspect-video w-full cursor-pointer object-cover"
          />

          {/* Big Center Play / Pause Button Overlay */}
          <div
            className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              !isPlaying || showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Start video"}
              className="pointer-events-auto flex h-14 w-14 sm:h-18 sm:w-18 md:h-22 md:w-22 transform items-center justify-center rounded-full bg-green-950/85 text-gold-400 backdrop-blur-md transition-all hover:scale-110 hover:bg-green-900 focus:outline-none ring-2 ring-gold-400/60 shadow-2xl"
            >
              {isPlaying ? (
                <Pause size={28} weight="fill" className="sm:hidden" />
              ) : (
                <Play size={30} weight="fill" className="translate-x-0.5 sm:hidden" />
              )}
              {isPlaying ? (
                <Pause size={40} weight="fill" className="hidden sm:block" />
              ) : (
                <Play size={44} weight="fill" className="translate-x-0.5 hidden sm:block" />
              )}
            </button>
          </div>

          {/* Video Title Badge */}
          <div className="pointer-events-none absolute left-3 top-3 right-3 sm:left-4 sm:top-4 z-10 flex items-center justify-between">
            <span className="rounded-full bg-black/65 px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-gold-300 backdrop-blur-md border border-gold-400/30">
              {showcaseVideo.title}
            </span>
          </div>

          {/* Custom Control Bar (Bottom) */}
          <div
            className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2.5 sm:p-4 md:p-6 transition-opacity duration-300 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Timeline Progress Scrubber Bar */}
            <div
              ref={progressContainerRef}
              onClick={handleSeek}
              className="group/bar relative mb-2 sm:mb-3 h-1.5 sm:h-2 w-full cursor-pointer rounded-full bg-white/30 transition-all hover:h-2.5"
            >
              <div
                className="h-full rounded-full bg-gold-400 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="absolute top-1/2 -ml-1.5 -mt-1.5 h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-gold-300 opacity-0 transition-opacity group-hover/bar:opacity-100 shadow"
                style={{ left: `${progressPercent}%` }}
              />
            </div>

            {/* Controls Buttons & Indicators (Strict Single Row) */}
            <div className="flex items-center justify-between gap-1.5 sm:gap-3 text-white">
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* Play / Pause Toggle Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-gold-400 hover:text-green-950"
                >
                  {isPlaying ? (
                    <Pause size={16} weight="bold" className="sm:hidden" />
                  ) : (
                    <Play size={16} weight="bold" className="sm:hidden" />
                  )}
                  {isPlaying ? (
                    <Pause size={20} weight="bold" className="hidden sm:block" />
                  ) : (
                    <Play size={20} weight="bold" className="hidden sm:block" />
                  )}
                </button>

                {/* Move Back -10 Seconds Button */}
                <button
                  type="button"
                  onClick={() => seekRelative(-10)}
                  aria-label="Go back 10 seconds"
                  title="Go back 10 seconds"
                  className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <Rewind size={14} weight="bold" className="sm:hidden" />
                  <Rewind size={18} weight="bold" className="hidden sm:block" />
                </button>

                {/* Move Forward +10 Seconds Button */}
                <button
                  type="button"
                  onClick={() => seekRelative(10)}
                  aria-label="Move forward 10 seconds"
                  title="Move forward 10 seconds"
                  className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <FastForward size={14} weight="bold" className="sm:hidden" />
                  <FastForward size={18} weight="bold" className="hidden sm:block" />
                </button>

                {/* Timestamp Counter */}
                <span className="ml-0.5 text-[10px] sm:text-xs font-medium tracking-wide text-neutral-300 whitespace-nowrap">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3">
                {/* Sound & Volume Control */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    {isMuted || volume === 0 ? (
                      <>
                        <SpeakerSlash size={14} weight="bold" className="sm:hidden" />
                        <SpeakerSlash size={18} weight="bold" className="hidden sm:block" />
                      </>
                    ) : (
                      <>
                        <SpeakerHigh size={14} weight="bold" className="sm:hidden" />
                        <SpeakerHigh size={18} weight="bold" className="hidden sm:block" />
                      </>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="hidden md:block h-1.5 w-16 md:w-24 cursor-pointer accent-gold-400"
                    aria-label="Volume slider"
                  />
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Toggle Fullscreen"
                  className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  {isFullscreen ? (
                    <>
                      <CornersIn size={14} weight="bold" className="sm:hidden" />
                      <CornersIn size={18} weight="bold" className="hidden sm:block" />
                    </>
                  ) : (
                    <>
                      <CornersOut size={14} weight="bold" className="sm:hidden" />
                      <CornersOut size={18} weight="bold" className="hidden sm:block" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
