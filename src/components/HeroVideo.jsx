import { useMemo, useState } from "react";
import { extractYouTubeId } from "../utils/youtube";

const KEY = "heroVideoUrl";

/**
 * HeroVideo uses the provided YouTube Shorts URL as the default hero video.
 * It still allows an admin override via localStorage (key: heroVideoUrl) or
 * via environment variables (VITE_HERO_VIDEO for Vite, REACT_APP_HERO_VIDEO for CRA).
 */
const DEFAULT_URL = "https://www.youtube.com/shorts/8Umz17cqHKw"; // <- updated per user request

export default function HeroVideo() {
  // Prefer a stored admin value if present (keeps backward compatibility)
  const stored = typeof window !== "undefined" ? localStorage.getItem(KEY) || "" : "";

  // Prefer an env var if provided (Vite: import.meta.env.VITE_HERO_VIDEO, CRA: REACT_APP_HERO_VIDEO)
  const envUrl =
    (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_HERO_VIDEO) ||
    (typeof process !== "undefined" && process.env && process.env.REACT_APP_HERO_VIDEO) ||
    "";

  // Use stored -> env -> default order
  const raw = stored || envUrl || DEFAULT_URL;

  // Extract the YouTube ID (works for watch, short, and youtu.be links)
  const videoId = useMemo(() => extractYouTubeId(raw) || "jNQXAC9IVRw", [raw]);

  const [muted, setMuted] = useState(true);

  // autoplay requires mute on many browsers; loop needs playlist=id
  const params = new URLSearchParams({
    autoplay: "1",
    mute: muted ? "1" : "0",
    controls: "0",
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
    loop: "1",
    playlist: videoId,
  });
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

  // Inline styles to avoid external CSS interference
  const heroStyle = {
    position: "relative",
    width: "100%",
    height: "clamp(240px, 40vw, 700px)",
    overflow: "hidden",
    background: "#000",
  };
  const iframeStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: 0,
  };
  const btnStyle = {
    position: "absolute",
    right: 20,
    bottom: 12,
    zIndex: 10,
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: "0.9rem",
    cursor: "pointer",
  };

  return (
    <section aria-label="Hero video" style={heroStyle}>
      <iframe
        key={src} // ensure reload when mute toggles
        src={src}
        title="Arazzi Hero Video"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
        allowFullScreen
        style={iframeStyle}
      />
      <button style={btnStyle} onClick={() => setMuted((m) => !m)}>
        {muted ? "Unmute" : "Mute"}
      </button>
    </section>
  );
}