"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type SecretAvatarProps = {
  alt: string;
  src: string;
};

export function SecretAvatar({ alt, src }: SecretAvatarProps) {
  const [clickCount, setClickCount] = useState(0);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick() {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    setClickCount((currentCount) => {
      const nextCount = currentCount + 1;

      if (nextCount >= 10) {
        window.location.assign("/vault");

        return 0;
      }

      resetTimerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 2500);

      return nextCount;
    });
  }

  return (
    <button
      type="button"
      aria-label={alt}
      onClick={handleClick}
      className="relative block aspect-square w-[min(20rem,calc(100vw-4rem))] overflow-hidden rounded-md border border-white/10 bg-[#202020] outline-none ring-[#8fe3d0] transition focus-visible:ring-2 sm:w-80"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 320px, 256px"
        priority
        className="object-cover grayscale transition duration-300 hover:grayscale-0"
      />
      <span className="sr-only">{clickCount}</span>
    </button>
  );
}

