"use client";

import { useEffect, useState } from "react";

const CANDY_EMOJIS = ["🍭", "🍬", "🍫", "🍩", "🧁", "🍰", "🍡", "🍮", "🎂"];

interface CandyPiece {
  id: number;
  emoji: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
}

export default function FloatingCandy() {
  const [pieces, setPieces] = useState<CandyPiece[]>([]);

  useEffect(() => {
    const generated: CandyPiece[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: CANDY_EMOJIS[i % CANDY_EMOJIS.length],
      x: 2 + Math.random() * 96,           // % across screen
      size: 18 + Math.random() * 22,        // px
      duration: 6 + Math.random() * 8,      // seconds per loop
      delay: -(Math.random() * 12),         // negative = already mid-flight
      sway: (Math.random() - 0.5) * 80,    // px horizontal drift
    }));
    setPieces(generated);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 select-none"
          style={{
            left: `${p.x}%`,
            fontSize: p.size,
            lineHeight: 1,
            animationName: "float-candy",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationFillMode: "both",
            "--sway": `${p.sway}px`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
