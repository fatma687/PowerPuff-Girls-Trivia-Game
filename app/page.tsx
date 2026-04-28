"use client";

import { useRouter } from "next/navigation";
import FloatingCandy from "@/components/FloatingCandy";
import CharacterSVG, { type CharacterKey } from "@/components/CharacterSVG";
import { useGameAudio } from "@/hooks/useGameAudio";

interface Character {
  key: CharacterKey;
  name: string;
  tagline: string;
  color: string;
  gradFrom: string;
  gradTo: string;
  border: string;
  glow: string;
}

const CHARACTERS: Character[] = [
  {
    key: "blossom",
    name: "Blossom",
    tagline: "Commander & Leader",
    color: "#FF69B4",
    gradFrom: "#FF69B4",
    gradTo: "#C2185B",
    border: "#FF1493",
    glow: "rgba(255,105,180,0.55)",
  },
  {
    key: "bubbles",
    name: "Bubbles",
    tagline: "Joy & The Cute One",
    color: "#5DC8F5",
    gradFrom: "#5DC8F5",
    gradTo: "#1565C0",
    border: "#29B6F6",
    glow: "rgba(93,200,245,0.55)",
  },
  {
    key: "buttercup",
    name: "Buttercup",
    tagline: "The Toughest Fighter",
    color: "#6DC54E",
    gradFrom: "#6DC54E",
    gradTo: "#2E7D32",
    border: "#66BB6A",
    glow: "rgba(109,197,78,0.55)",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { startMusic, soundMagic } = useGameAudio();

  const choose = (char: Character) => {
    soundMagic();
    startMusic();
    localStorage.setItem("ppg-character", char.key);
    localStorage.setItem("ppg-color", char.color);
    localStorage.setItem("ppg-gradFrom", char.gradFrom);
    localStorage.setItem("ppg-gradTo", char.gradTo);
    // Small delay so the magic sound plays before navigation
    setTimeout(() => router.push("/game"), 300);
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #3d0066 0%, #1a003a 60%, #0a0015 100%)",
      }}
    >
      {/* Stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 1 + Math.random() * 3,
              height: 1 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70}%`,
              opacity: 0.3 + Math.random() * 0.7,
              animationName: "glitter",
              animationDuration: `${1.5 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 4}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>

      {/* Floating candy */}
      <FloatingCandy />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 px-4 py-10" style={{ zIndex: 10 }}>

        {/* Title */}
        <div className="text-center">
          <div className="text-5xl mb-1">⚡</div>
          <h1
            className="font-black tracking-tight text-white drop-shadow-2xl"
            style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", textShadow: "0 0 30px rgba(255,200,50,0.5)" }}
          >
            POWERPUFF GIRLS
          </h1>
          <h2
            className="font-black tracking-widest"
            style={{
              fontSize: "clamp(1.4rem, 5vw, 2.8rem)",
              color: "#FFD700",
              textShadow: "0 0 20px rgba(255,215,0,0.8)",
              letterSpacing: "0.15em",
            }}
          >
            TRIVIA
          </h2>
          <p className="text-white/80 mt-3 text-lg font-bold tracking-wide">
            ✨ Choose your character ✨
          </p>
        </div>

        {/* Character cards */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-3xl">
          {CHARACTERS.map((char, i) => (
            <button
              key={char.key}
              onClick={() => choose(char)}
              className="group relative flex flex-col items-center gap-3 rounded-3xl pt-6 pb-5 px-6 w-52 select-none focus:outline-none"
              style={{
                background: `linear-gradient(160deg, ${char.gradFrom}, ${char.gradTo})`,
                border: `4px solid ${char.border}`,
                boxShadow: `0 8px 32px ${char.glow}, 0 2px 8px rgba(0,0,0,0.4)`,
                animationName: "card-float",
                animationDuration: "3s",
                animationDelay: `${i * 0.4}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.1) translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${char.glow}, 0 4px 16px rgba(0,0,0,0.5)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${char.glow}, 0 2px 8px rgba(0,0,0,0.4)`;
              }}
            >
              {/* Character illustration */}
              <div className="drop-shadow-xl">
                <CharacterSVG name={char.key} />
              </div>

              {/* Name */}
              <div
                className="text-white font-black tracking-wide drop-shadow-md"
                style={{ fontSize: 22 }}
              >
                {char.name}
              </div>

              {/* Tagline */}
              <div className="text-white/80 text-sm font-bold text-center leading-tight">
                {char.tagline}
              </div>

              {/* Play arrow */}
              <div
                className="mt-1 rounded-full px-4 py-1 bg-white/20 text-white font-black text-sm"
                style={{ letterSpacing: "0.08em" }}
              >
                PLAY ▶
              </div>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <p className="text-white/40 text-sm font-medium mt-2">
          9 questions · Test your PPG knowledge!
        </p>
      </div>
    </main>
  );
}
