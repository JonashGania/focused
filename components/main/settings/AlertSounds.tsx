"use client";

import { Slider } from "@/components/ui/slider";
import { slugify } from "@/lib/utils";
import { usePomodoroStore } from "@/store/pomodoro-store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
      <h2 className="text-xl text-white font-bold mb-2">Alert Sounds</h2>
      <Slider
        min={0}
        max={100}
        value={[alertVolume * 100]}
        onValueChange={handleVolumeChange}
        className="w-[200px] bg-white rounded-full"
      />

      <RadioGroup
        value={alertSound}
        onValueChange={(value: string) => {
          setAlertSound(value);
          playSound(value);
        }}
        className="mt-6 grid grid-cols-2 gap-4"
      >
        {sounds.map((sound) => (
          <div key={sound} className="flex items-center gap-2">
            <RadioGroupItem
              value={slugify(sound)}
              id={slugify(sound)}
              className="border-purple-600 border-2"
            />
            <Label
              htmlFor={slugify(sound)}
              className="text-white text-lg font-semibold cursor-pointer"
            >
              {sound}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default AlertSounds;
