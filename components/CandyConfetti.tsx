"use client";

import { useMemo } from "react";

const CANDIES = ["🍭", "🍬", "🍫", "🍩", "🧁", "🍰", "🌟", "⭐", "🎉", "🎊"];

interface ConfettiPiece {
  id: number;
  emoji: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  spin: number;
  swayR: number;
  swayL: number;
}

interface Props {
  themeColor: string;
}

export default function CandyConfetti({ themeColor }: Props) {
  const pieces = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        emoji: CANDIES[i % CANDIES.length],
        x: Math.random() * 100,
        size: 20 + Math.random() * 22,
        duration: 1.4 + Math.random() * 1,
        delay: Math.random() * 0.6,
        spin: 360 + Math.random() * 720,
        swayR: 15 + Math.random() * 25,
        swayL: -(15 + Math.random() * 25),
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9000 }}
    >
      {/* Confetti pieces */}
      {pieces.map((p) => (
        <div
          key={p.id}
          className="fixed top-0 select-none"
          style={{
            left: `${p.x}%`,
            fontSize: p.size,
            lineHeight: 1,
            animationName: "confetti-fall, confetti-sway",
            animationDuration: `${p.duration}s, ${p.duration * 0.6}s`,
            animationDelay: `${p.delay}s, ${p.delay}s`,
            animationTimingFunction: "ease-in, ease-in-out",
            animationIterationCount: "1, infinite",
            animationFillMode: "forwards, none",
            "--spin": `${p.spin}deg`,
            "--sway-r": `${p.swayR}px`,
            "--sway-l": `${p.swayL}px`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </div>
      ))}

      {/* ✅ CORRECT banner */}
      <div
        className="relative flex flex-col items-center justify-center gap-3 rounded-3xl px-12 py-8 shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${themeColor}ee, ${themeColor}bb)`,
          border: "4px solid white",
          animation: "correct-banner 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          backdropFilter: "blur(6px)",
        }}
      >
        <div style={{ fontSize: 64 }}>🎉</div>
        <div
          className="text-white font-black tracking-widest drop-shadow-lg"
          style={{ fontSize: 40 }}
        >
          CORRECT!
        </div>
        <div className="text-white/90 font-bold text-lg">+1 point</div>
      </div>
    </div>
  );
}
