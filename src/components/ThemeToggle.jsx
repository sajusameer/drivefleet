"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } =
    useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }
      className="
        w-11 h-11
        rounded-full
        border border-white/10
        flex items-center justify-center
        hover:border-[#ea001e]
        transition
      "
    >
      {theme === "dark" ? (
        <Sun
          size={18}
          className="text-[#ea001e]"
        />
      ) : (
        <Moon
          size={18}
          className="text-[#ea001e]"
        />
      )}
    </button>
  );
}