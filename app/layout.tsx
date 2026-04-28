import type { Metadata } from "next";
import "./globals.css";
import StarCursor from "@/components/StarCursor";

export const metadata: Metadata = {
  title: "Powerpuff Girls Trivia ⚡",
  description: "Test your Powerpuff Girls knowledge! Choose your character and play!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StarCursor />
        {children}
      </body>
    </html>
  );
}
