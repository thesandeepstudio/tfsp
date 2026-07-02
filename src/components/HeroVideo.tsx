"use client";

import { useState } from "react";
import { BASE_PATH } from "@/lib/base-path";

const videos = ["/videos/hero-1.mp4", "/videos/hero-2.mp4"];

export default function HeroVideo() {
  const [index, setIndex] = useState(0);

  return (
    <video
      key={videos[index]}
      autoPlay
      muted
      playsInline
      onEnded={() => setIndex((i) => (i + 1) % videos.length)}
      className="absolute inset-0 h-full w-full object-cover grayscale"
    >
      <source src={`${BASE_PATH}${videos[index]}`} type="video/mp4" />
    </video>
  );
}
