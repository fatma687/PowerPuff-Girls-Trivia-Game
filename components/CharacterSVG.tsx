export type CharacterKey = "blossom" | "bubbles" | "buttercup";

const CHARACTER_IMAGES: Record<CharacterKey, string> = {
  blossom: "/blossom.png",
  bubbles: "/bubbles.png",
  buttercup: "/buttercup.png",
};

const CHARACTER_ALTS: Record<CharacterKey, string> = {
  blossom: "Blossom",
  bubbles: "Bubbles",
  buttercup: "Buttercup",
};

export default function CharacterSVG({
  name,
  svgStyle,
}: {
  name: CharacterKey;
  svgStyle?: React.CSSProperties;
}) {
  return (
    <img
      src={CHARACTER_IMAGES[name]}
      alt={CHARACTER_ALTS[name]}
      style={{
        width: "100%",
        height: "auto",
        maxWidth: 120,
        objectFit: "contain",
        ...svgStyle,
      }}
    />
  );
}
