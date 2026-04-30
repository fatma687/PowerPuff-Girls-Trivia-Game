export type CharacterKey = "blossom" | "bubbles" | "buttercup";

/* ─────────────────────────────────────────────────────
   BLOSSOM  —  auburn hair, red bow, pink dress
───────────────────────────────────────────────────── */
function Blossom({ svgStyle }: { svgStyle?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 200" width="120" height="200" aria-label="Blossom" style={svgStyle}>
      {/* ── Long auburn hair (behind face) ── */}
      <path
        d="M 18 72 Q 4 120 8 175 Q 14 192 26 188 Q 32 160 28 110 Q 24 88 20 74 Z"
        fill="#7B1A00"
      />
      <path
        d="M 102 72 Q 116 120 112 175 Q 106 192 94 188 Q 88 160 92 110 Q 96 88 100 74 Z"
        fill="#7B1A00"
      />
      <ellipse cx="60" cy="30" rx="46" ry="24" fill="#7B1A00" />
      <ellipse cx="22" cy="68" rx="16" ry="36" fill="#7B1A00" />
      <ellipse cx="98" cy="68" rx="16" ry="36" fill="#7B1A00" />

      {/* ── Dress + white collar ── */}
      <rect x="38" y="138" width="44" height="52" fill="#FF69B4" rx="4" />
      <ellipse cx="60" cy="188" rx="30" ry="14" fill="#FF69B4" />
      <ellipse cx="60" cy="138" rx="24" ry="9" fill="white" />
      {/* Neck */}
      <rect x="50" y="122" width="20" height="20" fill="#FFDAB9" rx="5" />

      {/* ── Face ── */}
      <circle cx="60" cy="76" r="50" fill="#FFDAB9" />

      {/* ── PPG-style huge eyes ── */}
      {/* Left eye */}
      <ellipse cx="36" cy="74" rx="14" ry="18" fill="#111" />
      <ellipse cx="30" cy="66" rx="6" ry="6" fill="white" />
      {/* Right eye */}
      <ellipse cx="84" cy="74" rx="14" ry="18" fill="#111" />
      <ellipse cx="78" cy="66" rx="6" ry="6" fill="white" />

      {/* ── Rosy cheeks ── */}
      <ellipse cx="16" cy="90" rx="8" ry="6" fill="#FFB6C1" opacity="0.55" />
      <ellipse cx="104" cy="90" rx="8" ry="6" fill="#FFB6C1" opacity="0.55" />

      {/* ── Small smile ── */}
      <path d="M 46 98 Q 60 110 74 98" stroke="#CC5577" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── Hair top layer (in front of face edges) ── */}
      <ellipse cx="60" cy="28" rx="44" ry="20" fill="#7B1A00" />

      {/* ── Red bow headband ── */}
      {/* Left wing */}
      <path d="M 20 28 Q 14 14 26 8 Q 44 16 44 28 Q 34 34 20 28 Z" fill="#CC0022" />
      {/* Right wing */}
      <path d="M 100 28 Q 106 14 94 8 Q 76 16 76 28 Q 86 34 100 28 Z" fill="#CC0022" />
      {/* Bow center */}
      <ellipse cx="60" cy="23" rx="7" ry="8" fill="#FF1133" />
      <ellipse cx="60" cy="23" rx="3" ry="4" fill="#CC0022" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   BUBBLES  —  blonde pigtails, blue dress
───────────────────────────────────────────────────── */
function Bubbles({ svgStyle }: { svgStyle?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 200" width="120" height="200" aria-label="Bubbles" style={svgStyle}>
      {/* ── Pigtail puffs (behind face) ── */}
      <circle cx="8" cy="64" r="18" fill="#FFD700" />
      <circle cx="112" cy="64" r="18" fill="#FFD700" />
      {/* Hair top */}
      <ellipse cx="60" cy="30" rx="40" ry="20" fill="#FFD700" />

      {/* ── Dress + collar ── */}
      <rect x="38" y="138" width="44" height="52" fill="#5DC8F5" rx="4" />
      <ellipse cx="60" cy="188" rx="30" ry="14" fill="#5DC8F5" />
      <ellipse cx="60" cy="138" rx="24" ry="9" fill="white" />
      {/* Neck */}
      <rect x="50" y="122" width="20" height="20" fill="#FFDAB9" rx="5" />

      {/* ── Face ── */}
      <circle cx="60" cy="76" r="50" fill="#FFDAB9" />

      {/* ── Big friendly eyes ── */}
      <ellipse cx="36" cy="74" rx="15" ry="19" fill="#111" />
      <ellipse cx="30" cy="65" rx="6.5" ry="6.5" fill="white" />
      <ellipse cx="84" cy="74" rx="15" ry="19" fill="#111" />
      <ellipse cx="78" cy="65" rx="6.5" ry="6.5" fill="white" />

      {/* ── Rosy cheeks ── */}
      <ellipse cx="15" cy="90" rx="9" ry="6" fill="#FFB6C1" opacity="0.6" />
      <ellipse cx="105" cy="90" rx="9" ry="6" fill="#FFB6C1" opacity="0.6" />

      {/* ── Wide happy smile ── */}
      <path d="M 42 98 Q 60 114 78 98" stroke="#CC5577" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── Pigtail ties (blue) ── */}
      <circle cx="22" cy="56" r="5" fill="#3BA8D8" />
      <circle cx="98" cy="56" r="5" fill="#3BA8D8" />

      {/* ── Hair hairline on face top ── */}
      <ellipse cx="60" cy="28" rx="38" ry="17" fill="#FFD700" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   BUTTERCUP  —  short black hair flick, green dress
───────────────────────────────────────────────────── */
function Buttercup({ svgStyle }: { svgStyle?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 200" width="120" height="200" aria-label="Buttercup" style={svgStyle}>
      {/* ── Short black bob (behind face) ── */}
      <ellipse cx="60" cy="44" rx="46" ry="32" fill="#1a1a1a" />
      {/* Flipped ends left */}
      <path d="M 14 70 Q 6 92 16 98 Q 22 90 22 76 Z" fill="#1a1a1a" />
      {/* Flipped ends right */}
      <path d="M 106 70 Q 114 92 104 98 Q 98 90 98 76 Z" fill="#1a1a1a" />

      {/* ── Dress + collar ── */}
      <rect x="38" y="138" width="44" height="52" fill="#6DC54E" rx="4" />
      <ellipse cx="60" cy="188" rx="30" ry="14" fill="#6DC54E" />
      <ellipse cx="60" cy="138" rx="24" ry="9" fill="white" />
      {/* Neck */}
      <rect x="50" y="122" width="20" height="20" fill="#FFDAB9" rx="5" />

      {/* ── Face ── */}
      <circle cx="60" cy="76" r="50" fill="#FFDAB9" />

      {/* ── Slightly squinting tough eyes ── */}
      <ellipse cx="36" cy="76" rx="14" ry="16" fill="#111" />
      <ellipse cx="30" cy="68" rx="5.5" ry="5.5" fill="white" />
      <ellipse cx="84" cy="76" rx="14" ry="16" fill="#111" />
      <ellipse cx="78" cy="68" rx="5.5" ry="5.5" fill="white" />

      {/* ── Tough inward brows ── */}
      <path d="M 20 58 Q 32 52 46 58" stroke="#1a1a1a" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M 74 58 Q 88 52 100 58" stroke="#1a1a1a" strokeWidth="4.5" fill="none" strokeLinecap="round" />

      {/* ── Rosy cheeks (subtle) ── */}
      <ellipse cx="16" cy="90" rx="7" ry="5" fill="#FFB6C1" opacity="0.4" />
      <ellipse cx="104" cy="90" rx="7" ry="5" fill="#FFB6C1" opacity="0.4" />

      {/* ── Slight smirk ── */}
      <path d="M 46 98 Q 62 108 72 100" stroke="#CC5577" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* ── Hair top layer ── */}
      <ellipse cx="60" cy="28" rx="44" ry="20" fill="#1a1a1a" />
    </svg>
  );
}

export default function CharacterSVG({
  name,
  svgStyle,
}: {
  name: CharacterKey;
  svgStyle?: React.CSSProperties;
}) {
  if (name === "blossom") return <Blossom svgStyle={svgStyle} />;
  if (name === "bubbles") return <Bubbles svgStyle={svgStyle} />;
  return <Buttercup svgStyle={svgStyle} />;
}
