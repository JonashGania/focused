import Image from "next/image";
import { themes } from "@/lib/utils";
import { useThemeStore } from "@/store/theme-store";
import { slugify } from "@/lib/utils";

const AmbientThemes = () => {
  const backgroundTheme = useThemeStore((state) => state.backgroundTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const handleSelectTheme = (name: string) => {
    const themeName = slugify(name);
    setTheme(themeName);
  };

  return (
    <div className="mt-8">
      <h1 className="text-3xl text-white font-bold">Ambient Themes</h1>
      <div className="grid grid-cols-2 gap-4 my-4">
        {themes.map((theme) => (
          <label key={theme.name} className="flex flex-col">
            <input
              type="radio"
              name="theme"
              value={theme.image}
              onClick={() => handleSelectTheme(theme.name)}
              className="sr-only"
            />
            <Image
              src={theme.image}
              alt={theme.name.toLowerCase()}
              width={150}
              height={100}
              className={`object-cover place-self-center aspect-video rounded-lg ring-3 transition-all w-auto h-auto ${
                backgroundTheme === slugify(theme.name)
                  ? " ring-purple-500 "
                  : "ring-transparent"
              }`}
            />
            <h4 className="text-gray-200 text-sm font-medium pt-2 leading-5 text-center">
              {theme.name}
            </h4>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AmbientThemes;
