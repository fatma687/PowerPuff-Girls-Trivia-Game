export type CharacterKey = "blossom" | "bubbles" | "buttercup";

/* ─────────────────────────────────────────────────────
   BLOSSOM  —  pink theme · red bow · auburn hair
───────────────────────────────────────────────────── */
function Blossom({ svgStyle }: { svgStyle?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 130 168" width="130" height="168" aria-label="Blossom" style={svgStyle}>
      <g transform="rotate(-8 65 82)">

        {/* ── Long hair strands (behind everything) ── */}
        <path d="M 20 78 Q 4 115 8 158 Q 16 172 30 167 Q 35 140 32 96 Z"
          fill="#8B2200" stroke="black" strokeWidth="1.5"/>
        <path d="M 110 78 Q 126 115 122 158 Q 114 172 100 167 Q 95 140 98 96 Z"
          fill="#8B2200" stroke="black" strokeWidth="1.5"/>
        <ellipse cx="65" cy="34" rx="46" ry="22" fill="#8B2200" stroke="black" strokeWidth="2"/>
        <ellipse cx="19" cy="72" rx="13" ry="32" fill="#8B2200" stroke="black" strokeWidth="1.5"/>
        <ellipse cx="111" cy="72" rx="13" ry="32" fill="#8B2200" stroke="black" strokeWidth="1.5"/>

        {/* ── Body / dress ── */}
        <ellipse cx="68" cy="133" rx="20" ry="25" fill="#FF69B4" stroke="black" strokeWidth="2.5"/>
        {/* Belt */}
        <ellipse cx="68" cy="126" rx="20" ry="6" fill="#E91E8C" stroke="none"/>
        {/* Neck */}
        <rect x="58" y="115" width="20" height="15" rx="5" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Left arm ── */}
        <path d="M 50 126 Q 32 118 26 129" stroke="black" strokeWidth="13" fill="none" strokeLinecap="round"/>
        <path d="M 50 126 Q 32 118 26 129" stroke="#FFDAB9" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <circle cx="23" cy="131" r="8" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Right arm raised ── */}
        <path d="M 86 126 Q 104 114 110 124" stroke="black" strokeWidth="13" fill="none" strokeLinecap="round"/>
        <path d="M 86 126 Q 104 114 110 124" stroke="#FFDAB9" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <circle cx="113" cy="126" r="8" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Leg + shoe ── */}
        <path d="M 60 156 Q 57 168 53 175" stroke="black" strokeWidth="12" fill="none" strokeLinecap="round"/>
        <path d="M 60 156 Q 57 168 53 175" stroke="#FFDAB9" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <ellipse cx="51" cy="177" rx="11" ry="6" fill="white" stroke="black" strokeWidth="2"/>

        {/* ── Side ear ── */}
        <ellipse cx="14" cy="84" rx="8" ry="10" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Face ── */}
        <circle cx="65" cy="82" r="48" fill="#FFDAB9" stroke="black" strokeWidth="3"/>

        {/* ── Red bow wings (above hair) ── */}
        <path d="M 15 28 Q 10 12 24 8 Q 44 14 46 28 Q 36 34 15 28 Z"
          fill="#CC0022" stroke="black" strokeWidth="2.5"/>
        <path d="M 115 28 Q 120 12 106 8 Q 86 14 84 28 Q 94 34 115 28 Z"
          fill="#CC0022" stroke="black" strokeWidth="2.5"/>

        {/* ── Hair on top of face (covers hair-line) ── */}
        <ellipse cx="65" cy="36" rx="44" ry="17" fill="#8B2200" stroke="black" strokeWidth="2"/>

        {/* ── Bow center knot ── */}
        <circle cx="65" cy="25" r="8" fill="#FF1133" stroke="black" strokeWidth="2.5"/>

        {/* ── EYES — large with pink iris ring ── */}
        {/* Left eye */}
        <ellipse cx="44" cy="82" rx="19" ry="21" fill="black"/>
        <ellipse cx="44" cy="82" rx="15" ry="17" fill="#CC0055"/>
        <ellipse cx="44" cy="82" rx="10" ry="12" fill="black"/>
        <ellipse cx="37" cy="75" rx="5.5" ry="6.5" fill="white"/>
        {/* Right eye */}
        <ellipse cx="83" cy="80" rx="17" ry="19" fill="black"/>
        <ellipse cx="83" cy="80" rx="13" ry="15" fill="#CC0055"/>
        <ellipse cx="83" cy="80" rx="9" ry="11" fill="black"/>
        <ellipse cx="77" cy="74" rx="5" ry="5.5" fill="white"/>

        {/* ── Blush ── */}
        <ellipse cx="23" cy="96" rx="9" ry="6" fill="#FFB6C1" opacity="0.55"/>
        <ellipse cx="106" cy="94" rx="9" ry="6" fill="#FFB6C1" opacity="0.55"/>

        {/* ── Smile ── */}
        <path d="M 47 102 Q 65 115 83 102"
          stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   BUBBLES  —  blue theme · blonde pigtails · blue eyes
───────────────────────────────────────────────────── */
function Bubbles({ svgStyle }: { svgStyle?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 130 168" width="130" height="168" aria-label="Bubbles" style={svgStyle}>
      <g transform="rotate(-8 65 80)">

        {/* ── Body — blue + white stripes ── */}
        <ellipse cx="68" cy="133" rx="20" ry="25" fill="#5DC8F5" stroke="black" strokeWidth="2.5"/>
        {/* Stripes */}
        <path d="M 49 126 Q 68 132 87 126 Q 87 136 68 142 Q 49 136 49 126 Z" fill="white" opacity="0.55"/>
        {/* Neck */}
        <rect x="58" y="115" width="20" height="16" rx="5" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Left arm ── */}
        <path d="M 50 126 Q 33 120 28 131" stroke="black" strokeWidth="13" fill="none" strokeLinecap="round"/>
        <path d="M 50 126 Q 33 120 28 131" stroke="#FFDAB9" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <circle cx="25" cy="133" r="8" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Right arm raised ── */}
        <path d="M 86 126 Q 103 114 108 124" stroke="black" strokeWidth="13" fill="none" strokeLinecap="round"/>
        <path d="M 86 126 Q 103 114 108 124" stroke="#FFDAB9" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <circle cx="111" cy="126" r="8" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Leg + shoe ── */}
        <path d="M 60 156 Q 57 168 53 175" stroke="black" strokeWidth="12" fill="none" strokeLinecap="round"/>
        <path d="M 60 156 Q 57 168 53 175" stroke="#FFDAB9" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <ellipse cx="51" cy="177" rx="11" ry="6" fill="white" stroke="black" strokeWidth="2"/>

        {/* ── Blonde pigtail puffs (behind face) ── */}
        <ellipse cx="20" cy="64" rx="17" ry="13" fill="#FFD700" stroke="black" strokeWidth="2.5"
          transform="rotate(-25 20 64)"/>
        <ellipse cx="110" cy="60" rx="17" ry="13" fill="#FFD700" stroke="black" strokeWidth="2.5"
          transform="rotate(25 110 60)"/>
        {/* Hair top */}
        <ellipse cx="65" cy="36" rx="42" ry="18" fill="#FFD700" stroke="black" strokeWidth="2"/>

        {/* ── Side ear ── */}
        <ellipse cx="14" cy="82" rx="8" ry="10" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Face ── */}
        <circle cx="65" cy="80" r="48" fill="#FFDAB9" stroke="black" strokeWidth="3"/>

        {/* ── Hairline on top of face ── */}
        <ellipse cx="65" cy="36" rx="42" ry="15" fill="#FFD700" stroke="black" strokeWidth="2"/>

        {/* ── EYES — large with blue iris ring ── */}
        {/* Left eye (bigger, front-facing) */}
        <ellipse cx="43" cy="80" rx="20" ry="22" fill="black"/>
        <ellipse cx="43" cy="80" rx="16" ry="18" fill="#00AADD"/>
        <ellipse cx="43" cy="80" rx="11" ry="13" fill="black"/>
        <ellipse cx="35" cy="72" rx="6" ry="7" fill="white"/>
        {/* Right eye */}
        <ellipse cx="83" cy="77" rx="18" ry="20" fill="black"/>
        <ellipse cx="83" cy="77" rx="14" ry="16" fill="#00AADD"/>
        <ellipse cx="83" cy="77" rx="10" ry="12" fill="black"/>
        <ellipse cx="76" cy="70" rx="5.5" ry="6" fill="white"/>

        {/* ── Rosy cheeks ── */}
        <ellipse cx="22" cy="96" rx="10" ry="7" fill="#FFB6C1" opacity="0.6"/>
        <ellipse cx="107" cy="93" rx="10" ry="7" fill="#FFB6C1" opacity="0.6"/>

        {/* ── Open happy smile ── */}
        <path d="M 44 102 Q 65 118 86 102"
          stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Pink mouth interior */}
        <path d="M 44 102 Q 65 116 86 102 Q 78 110 65 112 Q 52 110 44 102 Z"
          fill="#FF9999" opacity="0.55"/>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────
   BUTTERCUP  —  green theme · black hair dome · tough
───────────────────────────────────────────────────── */
function Buttercup({ svgStyle }: { svgStyle?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 130 168" width="130" height="168" aria-label="Buttercup" style={svgStyle}>
      <g transform="rotate(-8 65 80)">

        {/* ── Body — green ── */}
        <ellipse cx="68" cy="133" rx="20" ry="25" fill="#6DC54E" stroke="black" strokeWidth="2.5"/>
        {/* Stripe */}
        <ellipse cx="68" cy="126" rx="20" ry="6" fill="#4CAF30" stroke="none"/>
        {/* Neck */}
        <rect x="58" y="115" width="20" height="15" rx="5" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Left arm ── */}
        <path d="M 50 126 Q 33 118 27 129" stroke="black" strokeWidth="13" fill="none" strokeLinecap="round"/>
        <path d="M 50 126 Q 33 118 27 129" stroke="#FFDAB9" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <circle cx="24" cy="131" r="8" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Right arm ── */}
        <path d="M 86 126 Q 104 116 109 126" stroke="black" strokeWidth="13" fill="none" strokeLinecap="round"/>
        <path d="M 86 126 Q 104 116 109 126" stroke="#FFDAB9" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <circle cx="112" cy="128" r="8" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Leg + shoe ── */}
        <path d="M 60 156 Q 57 168 53 175" stroke="black" strokeWidth="12" fill="none" strokeLinecap="round"/>
        <path d="M 60 156 Q 57 168 53 175" stroke="#FFDAB9" strokeWidth="9" fill="none" strokeLinecap="round"/>
        <ellipse cx="51" cy="177" rx="11" ry="6" fill="white" stroke="black" strokeWidth="2"/>

        {/* ── LARGE BLACK HAIR DOME (behind face) ── */}
        {/* The hair fills the top ~55% of the head */}
        <circle cx="65" cy="56" r="50" fill="#111" stroke="black" strokeWidth="2.5"/>
        {/* Left spiky tuft */}
        <path d="M 18 62 Q 10 44 20 36 Q 28 50 26 66 Z" fill="#111" stroke="black" strokeWidth="2"/>
        {/* Right spiky tuft */}
        <path d="M 112 62 Q 120 44 110 36 Q 102 50 104 66 Z" fill="#111" stroke="black" strokeWidth="2"/>

        {/* ── Side ear ── */}
        <ellipse cx="14" cy="86" rx="8" ry="10" fill="#FFDAB9" stroke="black" strokeWidth="2"/>

        {/* ── Face ── */}
        <circle cx="65" cy="84" r="48" fill="#FFDAB9" stroke="black" strokeWidth="3"/>

        {/* ── Re-draw hair dome lower edge ON TOP of face ── */}
        {/* This clips the hair to the top of the face naturally */}
        <ellipse cx="65" cy="52" rx="50" ry="28" fill="#111" stroke="black" strokeWidth="2"/>

        {/* ── EYES — large with GREEN iris ring ── */}
        {/* Left eye — VERY large, front-facing */}
        <ellipse cx="43" cy="84" rx="22" ry="24" fill="black"/>
        <ellipse cx="43" cy="84" rx="17" ry="19" fill="#3DBF3D"/>
        <ellipse cx="43" cy="84" rx="12" ry="14" fill="black"/>
        <ellipse cx="35" cy="76" rx="6.5" ry="7.5" fill="white"/>
        {/* Right eye — slightly smaller (3/4 view) */}
        <ellipse cx="83" cy="82" rx="17" ry="19" fill="black"/>
        <ellipse cx="83" cy="82" rx="13" ry="15" fill="#3DBF3D"/>
        <ellipse cx="83" cy="82" rx="9" ry="11" fill="black"/>
        <ellipse cx="77" cy="75" rx="5" ry="6" fill="white"/>

        {/* ── Angry lightning-bolt brow (left eye) ── */}
        <path d="M 25 64 L 38 70 L 32 74 L 54 68"
          stroke="black" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Right brow (simpler angled line) */}
        <path d="M 70 64 L 94 60"
          stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/>

        {/* ── Slight smirk ── */}
        <path d="M 50 106 Q 66 116 76 108"
          stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </g>
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
