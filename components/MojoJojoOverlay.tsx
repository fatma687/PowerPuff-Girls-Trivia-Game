"use client";

function MojoJojoSVG() {
  return (
    <svg viewBox="0 0 180 230" width="180" height="230" aria-label="Mojo Jojo angry">
      {/* Cape / body */}
      <ellipse cx="90" cy="215" rx="54" ry="20" fill="#6A0DAD" />
      <path
        d="M 36 170 Q 30 215 90 220 Q 150 215 144 170 L 128 155 Q 90 180 52 155 Z"
        fill="#6A0DAD"
      />
      {/* Collar */}
      <ellipse cx="90" cy="162" rx="32" ry="10" fill="white" />

      {/* Neck */}
      <rect x="76" y="148" width="28" height="20" fill="#6DBF4E" rx="6" />

      {/* Head */}
      <ellipse cx="90" cy="108" rx="58" ry="62" fill="#6DBF4E" />

      {/* White turban base / hat */}
      <ellipse cx="90" cy="72" rx="60" ry="28" fill="white" />
      <ellipse cx="90" cy="65" rx="55" ry="22" fill="#f0f0f0" />
      {/* Purple turban stripe */}
      <path
        d="M 30 72 Q 90 55 150 72"
        stroke="#6A0DAD"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />

      {/* Exposed BRAIN dome */}
      <ellipse cx="90" cy="40" rx="42" ry="36" fill="#FFB3C6" />
      {/* Brain wrinkles */}
      <path
        d="M 58 36 Q 68 24 78 36 Q 88 48 98 36 Q 108 24 118 36"
        stroke="#FF6B8A"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M 55 52 Q 65 40 75 52 Q 85 64 95 52 Q 105 40 115 52"
        stroke="#FF6B8A"
        strokeWidth="3"
        fill="none"
      />
      {/* Brain highlight */}
      <ellipse cx="75" cy="30" rx="10" ry="6" fill="#FFC8D8" opacity="0.6" />

      {/* Eyes — big angry white eyes */}
      <ellipse cx="68" cy="108" rx="14" ry="11" fill="white" />
      <circle cx="72" cy="108" r="7" fill="#CC0000" />
      <circle cx="74" cy="105" r="2.5" fill="#1a1a1a" />

      <ellipse cx="112" cy="108" rx="14" ry="11" fill="white" />
      <circle cx="108" cy="108" r="7" fill="#CC0000" />
      <circle cx="106" cy="105" r="2.5" fill="#1a1a1a" />

      {/* Angry eyebrows — thick, angled inward */}
      <line x1="50" y1="90" x2="78" y2="100" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
      <line x1="102" y1="100" x2="130" y2="90" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />

      {/* Nose */}
      <ellipse cx="90" cy="124" rx="9" ry="7" fill="#5AAA3E" />
      <circle cx="86" cy="125" r="2" fill="#3D8028" />
      <circle cx="94" cy="125" r="2" fill="#3D8028" />

      {/* Angry grimace / bared teeth */}
      <path
        d="M 66 142 Q 90 134 114 142"
        stroke="#1a1a1a"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Teeth */}
      <rect x="72" y="137" width="9" height="8" fill="white" rx="1.5" />
      <rect x="85" y="135" width="10" height="9" fill="white" rx="1.5" />
      <rect x="99" y="137" width="9" height="8" fill="white" rx="1.5" />

      {/* Raised fist (left) */}
      <circle cx="24" cy="150" r="16" fill="#6DBF4E" />
      <path
        d="M 10 145 Q 8 130 16 126 Q 24 122 28 130"
        stroke="#6DBF4E"
        strokeWidth="10"
        fill="#6DBF4E"
        strokeLinecap="round"
      />
      {/* Fist knuckle lines */}
      <line x1="14" y1="142" x2="34" y2="138" stroke="#5AAA3E" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="148" x2="35" y2="145" stroke="#5AAA3E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function MojoJojoOverlay() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 9000,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(3px)",
        animation: "red-flash 0.4s ease-in-out 3",
      }}
    >
      <div
        className="flex flex-col md:flex-row items-center justify-center gap-6 rounded-3xl px-8 py-8 shadow-2xl max-w-xl w-full mx-4"
        style={{
          background: "linear-gradient(135deg, #1a0000ee, #3d0000ee)",
          border: "4px solid #ef4444",
          animation: "mojo-enter 0.55s cubic-bezier(0.34, 1.2, 0.64, 1) forwards",
        }}
      >
        {/* Mojo Jojo illustration */}
        <div style={{ animation: "angry-shake 0.35s ease-in-out infinite" }}>
          <MojoJojoSVG />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
          <div
            className="font-black tracking-widest drop-shadow-lg"
            style={{ fontSize: 52, color: "#ef4444", lineHeight: 1 }}
          >
            WRONG!
          </div>
          <div className="text-white/90 font-bold text-xl leading-snug max-w-xs">
            Mojo Jojo is very disappointed in you!
          </div>
          <div className="text-white/60 text-base">
            You shall rue this day! I, Mojo Jojo, declare it!
          </div>
          <div style={{ fontSize: 36 }}>💢😤🐒</div>
        </div>
      </div>
    </div>
  );
}
