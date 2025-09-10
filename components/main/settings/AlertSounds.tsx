"use client";

import { Slider } from "@/components/ui/slider";
import { slugify } from "@/lib/utils";
import { usePomodoroStore } from "@/store/pomodoro-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Volume2, Play } from "lucide-react";
import { useState } from "react";

const sounds = [
  "Shine",
  "Announcement",
  "Cartoon",
  "Frog",
  "Fade Out",
  "Harp",
  "Level Up",
  "Marimba Bloop",
];

const AlertSounds = () => {
  const alertSound = usePomodoroStore((state) => state.alertSound);
  const alertVolume = usePomodoroStore((state) => state.alertVolume);
  const setAlertSound = usePomodoroStore((state) => state.setAlertSound);
  const setAlertVolume = usePomodoroStore((state) => state.setAlertVolume);
  const [selectedSound, setSelectedSound] = useState(alertSound);

  const handleVolumeChange = (value: number[]) => {
    const vol = value[0] / 100;
    setAlertVolume(vol);
  };

  const playSound = (value: string) => {
    const audio = new Audio(`/alerts/${value}.mp3`);
    audio.volume = alertVolume;
    audio.play();
  };

  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-blue-500/20 rounded-md">
          <Volume2 size={20} className="text-blue-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Alert Sounds</h2>
      </div>
      <span className="text-sm text-gray-200 font-medium">Volume</span>
      <Slider
        min={0}
        max={100}
        value={[alertVolume * 100]}
        onValueChange={handleVolumeChange}
        className="w-full bg-purple-500 rounded-full mt-2"
      />

      <RadioGroup
        value={alertSound}
        onValueChange={(value: string) => {
          setAlertSound(value);
          playSound(value);
        }}
        className="mt-6 flex flex-col gap-4"
      >
        {sounds.map((sound) => {
          const isSelected = selectedSound === slugify(sound);

          return (
            <div
              key={sound}
              onClick={() => setSelectedSound(slugify(sound))}
              className={`flex items-center gap-2  p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer  ${
                isSelected
                  ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/25"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <RadioGroupItem
                value={slugify(sound)}
                id={slugify(sound)}
                className="border-purple-600 border-2 "
              />
              <Label
                htmlFor={slugify(sound)}
                className=" cursor-pointer flex items-center justify-between flex-1"
              >
                <span className="text-white text-base font-medium">
                  {sound}
                </span>
                <div className="size-8 rounded-md bg-white/15 flex justify-center items-center">
                  <Play size={18} className="text-gray-200" />
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default AlertSounds;
