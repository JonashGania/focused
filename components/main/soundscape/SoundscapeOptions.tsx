import React from "react";

const sounds = [
  { name: "Rain", audioSrc: "/soundscape/rain.mp3", emoji: "🌧️" },
  { name: "Calm Nature", audioSrc: "/soundscape/calm-nature.mp3", emoji: "🍃" },
  { name: "Coffee Shop", audioSrc: "/soundscape/coffee-shop.mp3", emoji: "☕" },
  { name: "Ocean Waves", audioSrc: "/soundscape/ocean-waves.mp3", emoji: "🌊" },
  { name: "Firewood", audioSrc: "/soundscape/firewood.mp3", emoji: "🔥" },
  { name: "Heavy Rain", audioSrc: "/soundscape/heavy-rain.mp3", emoji: "⛈️" },
  {
    name: "Night Forest",
    audioSrc: "/soundscape/night-forest.mp3",
    emoji: "🌲",
  },
  {
    name: "River Flowing",
    audioSrc: "/soundscape/river-flowing.mp3",
    emoji: "🏞️",
  },
  {
    name: "Howling Winter",
    audioSrc: "/soundscape/howling-winter.mp3",
    emoji: "❄️",
  },
];

interface SoundscapeOptionsProps {
  onSelect: (src: string) => void;
  selectedSound: string | null;
}

const SoundscapeOptions = ({
  onSelect,
  selectedSound,
}: SoundscapeOptionsProps) => {
  return (
    <div className="flex flex-wrap">
      {sounds.map((sound) => {
        const isSelected = selectedSound === sound.audioSrc;

        return (
          <div
            key={sound.name}
            className="min-[75px] max-w-[unset] px-3 basis-[25%] mb-6 flex justify-center "
          >
            <button
              onClick={() => onSelect(sound.audioSrc)}
              className="text-center appearance-none flex flex-col items-center space-between cursor-pointer group"
            >
              <span
                className={`text-3xl group-hover:opacity-100 ${
                  isSelected ? "opacity-100" : "opacity-60"
                }`}
              >
                {sound.emoji}
              </span>
              <span
                className={` group-hover:text-white text-sm text-center leading-5 ${
                  isSelected ? "text-white" : "text-white/60"
                }`}
              >
                {sound.name}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SoundscapeOptions;
