"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CharacterSVG, { type CharacterKey } from "@/components/CharacterSVG";
import CandyConfetti from "@/components/CandyConfetti";
import MojoJojoOverlay from "@/components/MojoJojoOverlay";
import { useGameAudio } from "@/hooks/useGameAudio";

/* ── Types ── */
interface Question {
  question: string;
  options: string[];
  answer: number;       // index into options[]
  category: string;
  difficulty: string;
}

interface TriviaAPIResult {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
}

const OPTION_LABELS = ["A", "B", "C", "D"];
type FeedbackState = "idle" | "correct" | "wrong";

const CHARACTER_NAMES: Record<CharacterKey, string> = {
  blossom: "Blossom",
  bubbles: "Bubbles",
  buttercup: "Buttercup",
};

/* ── Decode HTML entities returned by the API (e.g. &amp; &#039;) ── */
function decodeHTML(str: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

/* ── Shuffle array (Fisher-Yates) ── */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Transform raw API results → our Question format ── */
function transformQuestions(results: TriviaAPIResult[]): Question[] {
  return results.map((r) => {
    const correct = decodeHTML(r.correct_answer);
    const options = shuffle([
      correct,
      ...r.incorrect_answers.map(decodeHTML),
    ]);
    return {
      question: decodeHTML(r.question),
      options,
      answer: options.indexOf(correct),
      category: r.category,
      difficulty: r.difficulty,
    };
  });
}

/* ══════════════════════════════════════════
   SCORE SCREEN
══════════════════════════════════════════ */
function ScoreScreen({
  score, total, character, themeColor, gradFrom, gradTo, onPlayAgain,
}: {
  score: number; total: number; character: CharacterKey;
  themeColor: string; gradFrom: string; gradTo: string;
  onPlayAgain: () => void;
}) {
  const pct = score / total;
  const [trophy, stars, msg] = (() => {
    if (pct === 1)    return ["🏆", "⭐⭐⭐", "PERFECT! You're a true trivia champion!"];
    if (pct >= 0.77)  return ["🥇", "⭐⭐✨", "Super! Almost flawless!"];
    if (pct >= 0.55)  return ["🥈", "⭐✨✨", "Good job! Keep it up!"];
    if (pct >= 0.33)  return ["🥉", "✨✨✨", "Not bad — Mojo Jojo might still outsmart you!"];
    return              ["💢", "❓❓❓", "Even Fuzzy Lumpkins knows more! Try again!"];
  })();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: `radial-gradient(ellipse at 50% 30%, ${gradFrom}99 0%, #0a0015 70%)` }}>
      <div className="flex flex-col items-center gap-6 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
        style={{
          background: "rgba(10,0,25,0.85)",
          border: `4px solid ${themeColor}`,
          boxShadow: `0 0 48px ${themeColor}66`,
          animation: "bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}>
        <div style={{ fontSize: 72, animation: "trophy-spin 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both" }}>
          {trophy}
        </div>
        <CharacterSVG name={character} />
        <div style={{ fontSize: 32 }}>{stars}</div>
        <div>
          <div className="font-black text-white" style={{ fontSize: 52, textShadow: `0 0 20px ${themeColor}` }}>
            {score} / {total}
          </div>
          <div className="text-white/70 font-bold text-lg mt-1">{msg}</div>
        </div>
        <div className="text-white/50 font-bold text-sm tracking-widest uppercase">
          Playing as {CHARACTER_NAMES[character]}
        </div>
        <button
          onClick={onPlayAgain}
          className="rounded-2xl px-8 py-3 font-black text-white text-lg tracking-wide shadow-lg"
          style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`, border: "3px solid white" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
        >
          ▶ Play Again
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════════ */
function LoadingScreen({ themeColor, gradFrom }: { themeColor: string; gradFrom: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: `radial-gradient(ellipse at 50% 30%, ${gradFrom}55 0%, #0a0015 70%)` }}>
      <div style={{ fontSize: 64, animation: "glitter 0.6s ease-in-out infinite" }}>⚡</div>
      <div className="font-black text-white text-2xl tracking-widest" style={{ color: themeColor }}>
        Loading Questions…
      </div>
      <div className="flex gap-2">
        {["🍭", "🍬", "🍫"].map((c, i) => (
          <span key={i} style={{ fontSize: 28, animation: `float-candy 1.2s ${i * 0.3}s ease-in-out infinite` }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ERROR SCREEN
══════════════════════════════════════════ */
function ErrorScreen({ onRetry, themeColor }: { onRetry: () => void; themeColor: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #3d0000 0%, #0a0015 70%)" }}>
      <div style={{ fontSize: 72 }}>😤</div>
      <div className="font-black text-white text-2xl text-center">
        Mojo Jojo blocked the trivia feed!
      </div>
      <div className="text-white/60 text-center">Could not load questions. Check your connection.</div>
      <button
        onClick={onRetry}
        className="rounded-2xl px-8 py-3 font-black text-white text-lg"
        style={{ background: `linear-gradient(135deg, ${themeColor}, #C2185B)`, border: "3px solid white" }}
      >
        Try Again
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN GAME PAGE
══════════════════════════════════════════ */
export default function GamePage() {
  const router = useRouter();
  const { startMusic, stopMusic, soundExplosion, soundMagic } = useGameAudio();

  // Theme
  const [character, setCharacter] = useState<CharacterKey>("blossom");
  const [themeColor, setThemeColor]   = useState("#FF69B4");
  const [gradFrom, setGradFrom]       = useState("#FF69B4");
  const [gradTo, setGradTo]           = useState("#C2185B");

  // Questions from API
  const [questions, setQuestions]     = useState<Question[]>([]);
  const [loading, setLoading]         = useState(true);
  const [apiError, setApiError]       = useState(false);

  // Game state
  const [currentQ, setCurrentQ]   = useState(0);
  const [score, setScore]         = useState(0);
  const [selected, setSelected]   = useState<number | null>(null);
  const [feedback, setFeedback]   = useState<FeedbackState>("idle");
  const [gameOver, setGameOver]   = useState(false);
  const [musicOn, setMusicOn]     = useState(true);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setApiError(false);
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data.response_code !== 0) throw new Error("Bad response code");
      setQuestions(transformQuestions(data.results));
    } catch {
      setApiError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const char  = (localStorage.getItem("ppg-character") as CharacterKey) || "blossom";
    const color = localStorage.getItem("ppg-color")    || "#FF69B4";
    const from  = localStorage.getItem("ppg-gradFrom") || "#FF69B4";
    const to    = localStorage.getItem("ppg-gradTo")   || "#C2185B";
    setCharacter(char);
    setThemeColor(color);
    setGradFrom(from);
    setGradTo(to);
    startMusic();
    fetchQuestions();
    return () => stopMusic();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMusic = () => {
    if (musicOn) { stopMusic(); setMusicOn(false); }
    else         { startMusic(); setMusicOn(true); }
  };

  const advanceQuestion = useCallback(() => {
    const next = currentQ + 1;
    if (next >= questions.length) {
      setGameOver(true);
    } else {
      setCurrentQ(next);
      setSelected(null);
      setFeedback("idle");
    }
  }, [currentQ, questions.length]);

  const handleAnswer = (index: number) => {
    if (selected !== null || feedback !== "idle") return;
    setSelected(index);
    const isCorrect = questions[currentQ].answer === index;
    if (isCorrect) { setScore((s) => s + 1); setFeedback("correct"); soundMagic(); }
    else           { setFeedback("wrong"); soundExplosion(); }
    setTimeout(() => { setFeedback("idle"); advanceQuestion(); }, 2200);
  };

  const resetGame = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setFeedback("idle");
    setGameOver(false);
    router.push("/");
  };

  /* ── Render states ── */
  if (loading) return <LoadingScreen themeColor={themeColor} gradFrom={gradFrom} />;
  if (apiError) return <ErrorScreen themeColor={themeColor} onRetry={() => { fetchQuestions(); }} />;
  if (gameOver) return (
    <ScoreScreen score={score} total={questions.length} character={character}
      themeColor={themeColor} gradFrom={gradFrom} gradTo={gradTo} onPlayAgain={resetGame} />
  );

  const question = questions[currentQ];
  const progress = (currentQ / questions.length) * 100;

  return (
    <main className="min-h-screen flex flex-col"
      style={{ background: `radial-gradient(ellipse at 50% 0%, ${gradFrom}55 0%, #0a0015 60%)` }}>

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4"
        style={{ background: `linear-gradient(90deg, ${gradFrom}33, ${gradTo}33)`, borderBottom: `2px solid ${themeColor}55` }}>

        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/")}
            className="text-white/60 hover:text-white font-bold text-sm rounded-lg px-3 py-1 transition-colors"
            style={{ border: "1.5px solid rgba(255,255,255,0.2)" }}>
            ← Home
          </button>
          <div style={{ width: 36, height: 49, overflow: "hidden" }}>
            <CharacterSVG name={character} />
          </div>
          <span className="text-white font-black text-sm hidden sm:block" style={{ color: themeColor }}>
            {CHARACTER_NAMES[character]}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleMusic} title={musicOn ? "Mute" : "Unmute"}
            className="rounded-full w-9 h-9 flex items-center justify-center text-lg"
            style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
            {musicOn ? "🎵" : "🔇"}
          </button>
          <div className="rounded-2xl px-4 py-2 font-black text-white text-sm"
            style={{ background: `linear-gradient(135deg, ${gradFrom}66, ${gradTo}66)`, border: `2px solid ${themeColor}88` }}>
            ⭐ {score} pts
          </div>
        </div>
      </header>

      {/* ── Progress bar ── */}
      <div className="h-2 w-full bg-white/10">
        <div className="h-full transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${gradFrom}, ${gradTo})`, boxShadow: `0 0 8px ${themeColor}88` }} />
      </div>

      {/* ── Question area ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl flex flex-col gap-6">

          {/* Counter + category */}
          <div className="text-center flex flex-col gap-1">
            <span className="inline-block rounded-full px-4 py-1 font-black text-sm tracking-widest text-white"
              style={{ background: `${themeColor}44`, border: `2px solid ${themeColor}88` }}>
              Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-white/40 text-xs font-bold uppercase tracking-wider">
              {question.category} · {question.difficulty}
            </span>
          </div>

          {/* Question card */}
          <div key={currentQ} className="rounded-3xl p-7 text-center shadow-2xl"
            style={{
              background: "rgba(10,0,25,0.75)",
              border: `3px solid ${themeColor}66`,
              boxShadow: `0 0 32px ${themeColor}33`,
              backdropFilter: "blur(8px)",
              animation: "bounce-in 0.45s cubic-bezier(0.34, 1.4, 0.64, 1) both",
            }}>
            <p className="text-white font-black leading-snug" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}>
              {question.question}
            </p>
          </div>

          {/* Answer buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((option, idx) => {
              const isSelected      = selected === idx;
              const isCorrectAnswer = question.answer === idx;
              const showResult      = selected !== null;

              const bg     = showResult && isCorrectAnswer ? "rgba(34,197,94,0.25)"
                           : showResult && isSelected      ? "rgba(239,68,68,0.25)"
                           : "rgba(255,255,255,0.06)";
              const border = showResult && isCorrectAnswer ? "#22c55e"
                           : showResult && isSelected      ? "#ef4444"
                           : "rgba(255,255,255,0.2)";
              const anim   = showResult && isCorrectAnswer ? "correct-pulse 0.6s ease-out"
                           : showResult && isSelected      ? "wrong-pulse 0.6s ease-out"
                           : "";

              return (
                <button key={idx} onClick={() => handleAnswer(idx)} disabled={selected !== null}
                  className="flex items-center gap-3 rounded-2xl px-5 py-4 text-left font-bold transition-all"
                  style={{ background: bg, border: `2.5px solid ${border}`, color: "white", animation: anim,
                    transform: showResult && isCorrectAnswer ? "scale(1.02)" : "",
                    cursor: selected !== null ? "default" : undefined }}
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
                  }}>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ background: showResult && isCorrectAnswer ? "#22c55e" : showResult && isSelected ? "#ef4444" : `${themeColor}55`, color: "white" }}>
                    {OPTION_LABELS[idx]}
                  </span>
                  <span className="leading-snug text-sm sm:text-base">{option}</span>
                  {showResult && isCorrectAnswer && <span className="ml-auto">✅</span>}
                  {showResult && isSelected && !isCorrectAnswer && <span className="ml-auto">❌</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {feedback === "correct" && <CandyConfetti themeColor={themeColor} />}
      {feedback === "wrong"   && <MojoJojoOverlay />}
    </main>
  );
}
