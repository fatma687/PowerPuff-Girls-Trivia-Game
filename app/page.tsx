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
      <div className="relative flex flex-col items-center gap-5 sm:gap-8 px-3 sm:px-6 py-8 sm:py-10 w-full" style={{ zIndex: 10 }}>

        {/* Title */}
        <div className="text-center">
          <div className="mb-1" style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}>⚡</div>
          <h1
            className="font-black tracking-tight text-white drop-shadow-2xl"
            style={{ fontSize: "clamp(1.5rem, 7vw, 4.5rem)", textShadow: "0 0 30px rgba(255,200,50,0.5)" }}
          >
            POWERPUFF GIRLS
          </h1>
          <h2
            className="font-black tracking-widest"
            style={{
              fontSize: "clamp(1.1rem, 5vw, 2.8rem)",
              color: "#FFD700",
              textShadow: "0 0 20px rgba(255,215,0,0.8)",
              letterSpacing: "0.15em",
            }}
          >
            TRIVIA
          </h2>
          <p className="text-white/80 mt-2 font-bold tracking-wide" style={{ fontSize: "clamp(0.8rem, 3.5vw, 1.1rem)" }}>
            ✨ Choose your character ✨
          </p>
        </div>

        {/* Character cards — always a row, fluid width */}
        <div className="flex flex-row gap-2 sm:gap-5 items-stretch justify-center w-full max-w-3xl">
          {CHARACTERS.map((char, i) => (
            <button
              key={char.key}
              onClick={() => choose(char)}
              className="relative flex flex-col items-center rounded-2xl sm:rounded-3xl select-none focus:outline-none flex-1 min-w-0"
              style={{
                background: `linear-gradient(160deg, ${char.gradFrom}, ${char.gradTo})`,
                border: `3px solid ${char.border}`,
                boxShadow: `0 6px 24px ${char.glow}, 0 2px 8px rgba(0,0,0,0.4)`,
                padding: "clamp(8px, 2vw, 24px) clamp(4px, 1.5vw, 20px)",
                gap: "clamp(4px, 1.2vw, 12px)",
                animationName: "card-float",
                animationDuration: "3s",
                animationDelay: `${i * 0.4}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.06) translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${char.glow}, 0 4px 16px rgba(0,0,0,0.5)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${char.glow}, 0 2px 8px rgba(0,0,0,0.4)`;
              }}
            >
              {/* Character illustration — scales fluidly with the card */}
              <div className="drop-shadow-xl w-full flex justify-center">
                <CharacterSVG
                  name={char.key}
                  svgStyle={{ width: "100%", height: "auto", maxWidth: 120 }}
                />
              </div>

              {/* Name */}
              <div
                className="text-white font-black tracking-wide drop-shadow-md text-center"
                style={{ fontSize: "clamp(0.75rem, 3.5vw, 1.35rem)" }}
              >
                {char.name}
              </div>

              {/* Tagline */}
              <div
                className="text-white/80 font-bold text-center leading-tight"
                style={{ fontSize: "clamp(0.6rem, 2.2vw, 0.875rem)" }}
              >
                {char.tagline}
              </div>

              {/* Play button */}
              <div
                className="rounded-full bg-white/20 text-white font-black text-center"
                style={{
                  fontSize: "clamp(0.6rem, 2.5vw, 0.875rem)",
                  padding: "clamp(2px, 0.8vw, 6px) clamp(8px, 2.5vw, 16px)",
                  letterSpacing: "0.06em",
                }}
              >
                PLAY ▶
              </div>
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <p className="text-white/40 font-medium" style={{ fontSize: "clamp(0.65rem, 2.5vw, 0.875rem)" }}>
          10 questions · Fresh trivia every game!
        </p>
      </div>
    </main>
  );
}
