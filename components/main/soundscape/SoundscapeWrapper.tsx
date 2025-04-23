"use client";

import { Play, Pause, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";
import { formatDuration } from "@/lib/utils";
import SoundscapeOptions from "./SoundscapeOptions";

const SoundscapeWrapper = ({ isOpen }: { isOpen: boolean }) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSelectSound = (src: string) => {
    setSelectedSound(src);
    setIsPlaying(true);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    const newTime = value[0];
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleVolumeChange = (value: number[]) => {
    const vol = value[0] / 100;
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      audioRef.current.muted = false;
    }
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    const newMuteState = !isMuted;
    audioRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    if (selectedSound && audioRef.current && isPlaying) {
      audioRef.current.play();
      audioRef.current.volume = volume;
    }
  }, [selectedSound, isPlaying, volume]);

  return (
    <div
      className={`relative transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute left-[-140px] bottom-[70px] min-w-[450px] max-h-[500px] rounded-3xl flex flex-col">
        <div className="bg-black py-4 px-6 rounded-t-3xl flex items-center justify-between gap-6">
          <h3 className="text-white font-bold text-xl">Sounds</h3>
          <div className="flex items-center gap-3">
            <button onClick={toggleMute} className="cursor-pointer">
              <Volume2 size={20} className="text-zinc-400 hover:text-white" />
            </button>
            <Slider
              min={0}
              max={100}
              value={[isMuted ? 0 : volume * 100]}
              onValueChange={handleVolumeChange}
              className="w-[100px] bg-white rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 bg-black/70 px-6 py-2 ">
          <SoundscapeOptions
            onSelect={handleSelectSound}
            selectedSound={selectedSound}
          />
        </div>
        <div className="bg-black py-4 px-6 rounded-b-3xl flex flex-col justify-center items-center">
          <audio ref={audioRef} src={selectedSound || undefined} />
          <button
            onClick={handlePlayPause}
            className="p-2 rounded-full bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-100 cursor-pointer"
          >
            {isPlaying ? (
              <Pause size={15} fill="#000000" className="text-black" />
            ) : (
              <Play size={15} fill="#000000" className="text-black" />
            )}
          </button>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-neutral-400 text-sm">
              {currentTime ? formatDuration(currentTime) : "0:00"}
            </span>

            <Slider
              min={0}
              max={duration}
              value={[currentTime]}
              onValueChange={handleSeek}
              className="w-[250px] bg-white rounded-full"
            />

            <span className="text-neutral-400 text-sm">
              {duration ? formatDuration(duration) : "0:00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundscapeWrapper;
