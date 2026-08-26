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
          className="group relative mt-8 overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-black/10"
        >
          {/* Video Element (Direct MP4 delivery from Cloudinary) */}
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
              className="pointer-events-auto flex h-16 w-16 md:h-22 md:w-22 transform items-center justify-center rounded-full bg-green-950/80 text-gold-400 backdrop-blur-md transition-all hover:scale-110 hover:bg-green-900 focus:outline-none ring-2 ring-gold-400/60 shadow-2xl"
            >
              {isPlaying ? (
                <Pause size={36} weight="fill" className="translate-x-0" />
              ) : (
                <Play size={40} weight="fill" className="translate-x-0.5" />
              )}
            </button>
          </div>

          {/* Video Title Badge */}
          <div className="pointer-events-none absolute left-4 top-4 right-4 z-10 flex items-center justify-between">
            <span className="rounded-full bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-gold-300 backdrop-blur-md border border-gold-400/30">
              {showcaseVideo.title}
            </span>
          </div>

          {/* Custom Control Bar (Bottom) */}
          <div
            className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 md:p-6 transition-opacity duration-300 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Timeline Progress Scrubber Bar */}
            <div
              ref={progressContainerRef}
              onClick={handleSeek}
              className="group/bar relative mb-3 h-2 w-full cursor-pointer rounded-full bg-white/30 transition-all hover:h-3"
            >
              <div
                className="h-full rounded-full bg-gold-400 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="absolute top-1/2 -ml-2 -mt-2 h-4 w-4 rounded-full bg-gold-300 opacity-0 transition-opacity group-hover/bar:opacity-100 shadow"
                style={{ left: `${progressPercent}%` }}
              />
            </div>

            {/* Controls Buttons & Indicators */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-white">
              <div className="flex items-center gap-2 md:gap-3">
                {/* Play / Pause Toggle Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-400 hover:text-green-950"
                >
                  {isPlaying ? <Pause size={20} weight="bold" /> : <Play size={20} weight="bold" />}
                </button>

                {/* Move Back -10 Seconds Button */}
                <button
                  type="button"
                  onClick={() => seekRelative(-10)}
                  aria-label="Go back 10 seconds"
                  title="Go back 10 seconds"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <Rewind size={18} weight="bold" />
                </button>

                {/* Move Forward +10 Seconds Button */}
                <button
                  type="button"
                  onClick={() => seekRelative(10)}
                  aria-label="Move forward 10 seconds"
                  title="Move forward 10 seconds"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <FastForward size={18} weight="bold" />
                </button>

                {/* Timestamp Counter */}
                <span className="ml-1 text-xs font-medium tracking-wide text-neutral-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sound & Volume Control */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    {isMuted || volume === 0 ? (
                      <SpeakerSlash size={18} weight="bold" />
                    ) : (
                      <SpeakerHigh size={18} weight="bold" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="h-1.5 w-16 md:w-24 cursor-pointer accent-gold-400"
                    aria-label="Volume slider"
                  />
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label="Toggle Fullscreen"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  {isFullscreen ? <CornersIn size={18} weight="bold" /> : <CornersOut size={18} weight="bold" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
