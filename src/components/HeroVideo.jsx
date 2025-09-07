import { useMemo, useState } from "react";
import { extractYouTubeId } from "../utils/youtube";

const KEY = "heroVideoUrl";

export default function HeroVideo() {
  const raw = localStorage.getItem(KEY) || "";
  const videoId = useMemo(() => extractYouTubeId(raw) || "jNQXAC9IVRw", [raw]);
  const [muted, setMuted] = useState(true);

  // autoplay requires mute; loop needs playlist=id
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

  // Inline styles so nothing else can interfere
  const heroStyle = {
    position: "relative",
    width: "100%",
    height: "clamp(240px, 40vw, 700px)", // ~30% shorter than 16:9, but responsive
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
        key={src} // force reload on mute toggle
        src={src}
        title="Arazzi Hero Video"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen; clipboard-write"
        allowFullScreen
        style={iframeStyle}
      />
      <button style={btnStyle} onClick={() => setMuted(m => !m)}>
        {muted ? "Unmute" : "Mute"}
      </button>
    </section>
  );
}
