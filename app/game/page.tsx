"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import questionsData from "@/data/questions.json";
import CharacterSVG, { type CharacterKey } from "@/components/CharacterSVG";
import CandyConfetti from "@/components/CandyConfetti";
import MojoJojoOverlay from "@/components/MojoJojoOverlay";
import { useGameAudio } from "@/hooks/useGameAudio";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

const QUESTIONS = questionsData as Question[];
const OPTION_LABELS = ["A", "B", "C", "D"];

type FeedbackState = "idle" | "correct" | "wrong";

const CHARACTER_NAMES: Record<CharacterKey, string> = {
  blossom: "Blossom",
  bubbles: "Bubbles",
  buttercup: "Buttercup",
};

function ScoreScreen({
  score,
  total,
  character,
  themeColor,
  gradFrom,
  gradTo,
  onPlayAgain,
}: {
  score: number;
  total: number;
  character: CharacterKey;
  themeColor: string;
  gradFrom: string;
  gradTo: string;
  onPlayAgain: () => void;
}) {
  const pct = score / total;
  const [trophy, stars, msg] = (() => {
    if (pct === 1) return ["🏆", "⭐⭐⭐", "PERFECT! You're a true Powerpuff superfan!"];
    if (pct >= 0.77) return ["🥇", "⭐⭐✨", "Super! Almost flawless!"];
    if (pct >= 0.55) return ["🥈", "⭐✨✨", "Good job! Keep watching those reruns!"];
    if (pct >= 0.33) return ["🥉", "✨✨✨", "Not bad, but Mojo Jojo might outsmart you!"];
    return ["💢", "❓❓❓", "Even Fuzzy Lumpkins knows more! Try again!"];
  })();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${gradFrom}99 0%, #0a0015 70%)`,
      }}
    >
      <div
        className="flex flex-col items-center gap-6 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
        style={{
          background: "rgba(10,0,25,0.85)",
          border: `4px solid ${themeColor}`,
          boxShadow: `0 0 48px ${themeColor}66`,
          animation: "bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
      >
        {/* Trophy */}
        <div style={{ fontSize: 72, animation: "trophy-spin 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both" }}>
          {trophy}
        </div>

        {/* Character */}
        <div>
          <CharacterSVG name={character} />
        </div>

        {/* Stars */}
        <div style={{ fontSize: 32 }}>{stars}</div>

        {/* Score */}
        <div>
          <div
            className="font-black text-white"
            style={{ fontSize: 52, textShadow: `0 0 20px ${themeColor}` }}
          >
            {score} / {total}
          </div>
          <div className="text-white/70 font-bold text-lg mt-1">{msg}</div>
        </div>

        {/* Character name */}
        <div className="text-white/50 font-bold text-sm tracking-widest uppercase">
          Playing as {CHARACTER_NAMES[character]}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={onPlayAgain}
            className="rounded-2xl px-8 py-3 font-black text-white text-lg tracking-wide shadow-lg transition-transform active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
              border: `3px solid white`,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
          >
            ▶ Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GamePage() {
  const router = useRouter();
  const { startMusic, stopMusic, soundExplosion, soundMagic } = useGameAudio();

  // Theme from localStorage
  const [character, setCharacter] = useState<CharacterKey>("blossom");
  const [themeColor, setThemeColor] = useState("#FF69B4");
  const [gradFrom, setGradFrom] = useState("#FF69B4");
  const [gradTo, setGradTo] = useState("#C2185B");

  // Game state
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const [gameOver, setGameOver] = useState(false);
  const [musicOn, setMusicOn] = useState(true);

  useEffect(() => {
    const char = (localStorage.getItem("ppg-character") as CharacterKey) || "blossom";
    const color = localStorage.getItem("ppg-color") || "#FF69B4";
    const from = localStorage.getItem("ppg-gradFrom") || "#FF69B4";
    const to = localStorage.getItem("ppg-gradTo") || "#C2185B";
    setCharacter(char);
    setThemeColor(color);
    setGradFrom(from);
    setGradTo(to);
    startMusic();
    return () => stopMusic();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMusic = () => {
    if (musicOn) { stopMusic(); setMusicOn(false); }
    else { startMusic(); setMusicOn(true); }
  };

  const advanceQuestion = useCallback(() => {
    const next = currentQ + 1;
    if (next >= QUESTIONS.length) {
      setGameOver(true);
    } else {
      setCurrentQ(next);
      setSelected(null);
      setFeedback("idle");
    }
  }, [currentQ]);

  const handleAnswer = (index: number) => {
    if (selected !== null || feedback !== "idle") return;

    setSelected(index);
    const isCorrect = QUESTIONS[currentQ].answer === index;

    if (isCorrect) {
      setScore((s) => s + 1);
      setFeedback("correct");
      soundMagic();
    } else {
      setFeedback("wrong");
      soundExplosion();
    }

    setTimeout(() => {
      setFeedback("idle");
      advanceQuestion();
    }, 2200);
  };

  const resetGame = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setFeedback("idle");
    setGameOver(false);
    router.push("/");
  };

  if (gameOver) {
    return (
      <ScoreScreen
        score={score}
        total={QUESTIONS.length}
        character={character}
        themeColor={themeColor}
        gradFrom={gradFrom}
        gradTo={gradTo}
        onPlayAgain={resetGame}
      />
    );
  }

  const question = QUESTIONS[currentQ];
  const progress = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${gradFrom}55 0%, #0a0015 60%)`,
      }}
    >
      {/* ── Header ── */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{
          background: `linear-gradient(90deg, ${gradFrom}33, ${gradTo}33)`,
          borderBottom: `2px solid ${themeColor}55`,
        }}
      >
        {/* Back + character */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="text-white/60 hover:text-white font-bold text-sm rounded-lg px-3 py-1 transition-colors"
            style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}
          >
            ← Home
          </button>
          <div style={{ width: 36, height: 49, overflow: "hidden" }}>
            <CharacterSVG name={character} />
          </div>
          <span className="text-white font-black text-sm hidden sm:block" style={{ color: themeColor }}>
            {CHARACTER_NAMES[character]}
          </span>
        </div>

        {/* Score + music toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMusic}
            title={musicOn ? "Mute music" : "Play music"}
            className="rounded-full w-9 h-9 flex items-center justify-center text-lg transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)" }}
          >
            {musicOn ? "🎵" : "🔇"}
          </button>
          <div
            className="rounded-2xl px-4 py-2 font-black text-white text-sm"
            style={{
              background: `linear-gradient(135deg, ${gradFrom}66, ${gradTo}66)`,
              border: `2px solid ${themeColor}88`,
            }}
          >
            ⭐ {score} pts
          </div>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="h-2 w-full bg-white/10">
        <div
          className="h-full transition-all duration-500 ease-out rounded-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${gradFrom}, ${gradTo})`,
            boxShadow: `0 0 8px ${themeColor}88`,
          }}
        />
      </div>

      {/* ── Question area ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl flex flex-col gap-6">

          {/* Question counter */}
          <div className="text-center">
            <span
              className="inline-block rounded-full px-4 py-1 font-black text-sm tracking-widest text-white"
              style={{ background: `${themeColor}44`, border: `2px solid ${themeColor}88` }}
            >
              Question {currentQ + 1} of {QUESTIONS.length}
            </span>
          </div>

          {/* Question card */}
          <div
            className="rounded-3xl p-7 text-center shadow-2xl"
            style={{
              background: "rgba(10,0,25,0.75)",
              border: `3px solid ${themeColor}66`,
              boxShadow: `0 0 32px ${themeColor}33`,
              backdropFilter: "blur(8px)",
              animation: "bounce-in 0.45s cubic-bezier(0.34, 1.4, 0.64, 1) both",
            }}
            key={currentQ}  /* re-animates on question change */
          >
            <p className="text-white font-black leading-snug" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}>
              {question.question}
            </p>
          </div>

          {/* Answer buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((option, idx) => {
              const isSelected = selected === idx;
              const isCorrectAnswer = question.answer === idx;
              const showResult = selected !== null;

              let bg = "rgba(255,255,255,0.06)";
              let border = "rgba(255,255,255,0.2)";
              let textColor = "white";
              let anim = "";

              if (showResult) {
                if (isCorrectAnswer) {
                  bg = "rgba(34,197,94,0.25)";
                  border = "#22c55e";
                  anim = "correct-pulse 0.6s ease-out";
                } else if (isSelected) {
                  bg = "rgba(239,68,68,0.25)";
                  border = "#ef4444";
                  anim = "wrong-pulse 0.6s ease-out";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  className="flex items-center gap-3 rounded-2xl px-5 py-4 text-left font-bold transition-all"
                  style={{
                    background: bg,
                    border: `2.5px solid ${border}`,
                    color: textColor,
                    animation: anim,
                    transform: showResult && isCorrectAnswer ? "scale(1.02)" : "",
                    cursor: selected !== null ? "default" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (selected !== null) return;
                    (e.currentTarget as HTMLElement).style.background = `${themeColor}33`;
                    (e.currentTarget as HTMLElement).style.borderColor = themeColor;
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    if (selected !== null) return;
                    (e.currentTarget as HTMLElement).style.background = bg;
                    (e.currentTarget as HTMLElement).style.borderColor = border;
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}
                >
                  {/* Option label bubble */}
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
                    style={{
                      background: showResult && isCorrectAnswer
                        ? "#22c55e"
                        : showResult && isSelected
                          ? "#ef4444"
                          : `${themeColor}55`,
                      color: "white",
                    }}
                  >
                    {OPTION_LABELS[idx]}
                  </span>
                  <span className="leading-snug text-sm sm:text-base">{option}</span>
                  {/* Result emoji */}
                  {showResult && isCorrectAnswer && <span className="ml-auto">✅</span>}
                  {showResult && isSelected && !isCorrectAnswer && <span className="ml-auto">❌</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Feedback overlays ── */}
      {feedback === "correct" && <CandyConfetti themeColor={themeColor} />}
      {feedback === "wrong" && <MojoJojoOverlay />}
    </main>
  );
}
