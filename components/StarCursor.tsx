"use client";

import { useEffect, useRef, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export default function StarCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const posRef = useRef({ x: -200, y: -200 });
  const sparkleIdRef = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const next = { x: e.clientX, y: e.clientY };
      posRef.current = next;
      setPos(next);
    };

    // Spawn sparkles on an interval, reading pos from ref so we always get latest
    const spawnInterval = setInterval(() => {
      const { x, y } = posRef.current;
      if (x < -100) return; // cursor not on screen yet
      const id = ++sparkleIdRef.current;
      const sparkle: Sparkle = {
        id,
        x: x + (Math.random() - 0.5) * 28,
        y: y + (Math.random() - 0.5) * 28,
        size: 8 + Math.random() * 10,
        rotation: Math.random() * 360,
      };
      setSparkles((prev) => [...prev.slice(-12), sparkle]);
      // Auto-remove after animation
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 650);
    }, 80);

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearInterval(spawnInterval);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999 }}
      aria-hidden="true"
    >
      {/* ── Glittering star ── */}
      <div
        className="absolute"
        style={{
          left: pos.x - 14,
          top: pos.y - 14,
          width: 28,
          height: 28,
          fontSize: 26,
          lineHeight: "28px",
          textAlign: "center",
          animation: "glitter 0.45s ease-in-out infinite",
          filter: "drop-shadow(0 0 4px #FFD700)",
          userSelect: "none",
        }}
      >
        ⭐
      </div>

      {/* ── Sparkle trail ── */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            fontSize: s.size,
            lineHeight: `${s.size}px`,
            transform: `rotate(${s.rotation}deg)`,
            animation: "sparkle-pop 0.65s ease-out forwards",
            filter: "drop-shadow(0 0 3px #FFD700)",
            userSelect: "none",
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}
