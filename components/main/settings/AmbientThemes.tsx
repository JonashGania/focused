import Image from "next/image";
import { themes } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import { slugify } from "@/lib/utils";
import { motion } from "motion/react";
import { Check, Palette } from "lucide-react";

const AmbientThemes = () => {
  const backgroundTheme = useThemeStore((state) => state.backgroundTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const handleSelectTheme = (name: string) => {
    const themeName = slugify(name);
    setTheme(themeName);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-green-500/20 rounded-md">
          <Palette size={20} className="text-green-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Ambient Themes</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4">
        {themes.map((theme) => {
          const isSelected = backgroundTheme === slugify(theme.name);

          return (
            <label key={theme.name} className="flex flex-col">
              <input
                type="radio"
                name="theme"
                value={theme.image}
                onClick={() => handleSelectTheme(theme.name)}
                className="sr-only"
              />
              <div className="relative">
                <Image
                  src={theme.image}
                  alt={theme.name.toLowerCase()}
                  width={150}
                  height={100}
                  className={`object-cover place-self-center aspect-video rounded-lg ring-3 transition-all w-auto h-auto ${
                    isSelected ? " ring-indigo-500/60 " : "ring-transparent"
                  }`}
                />

                {isSelected && (
                  <div className="absolute top-1 right-1">
                    <div className="size-5 bg-indigo-500 flex items-center justify-center rounded-full">
                      <Check strokeWidth={3} size={15} className="text-white" />
                    </div>
                  </div>
                )}
              </div>

              <motion.div
                className="mt-3 text-center"
                animate={isSelected ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <h4
                  className={`font-semibold transition-colors duration-200 text-sm ${
                    isSelected ? "text-indigo-600" : "text-gray-300"
                  }`}
                >
                  {theme.name}
                </h4>
              </motion.div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default AmbientThemes;
