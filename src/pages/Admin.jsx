import { useState } from "react";
import { extractYouTubeId } from "../utils/youtube";

const KEY = "heroVideoUrl";

export default function Admin() {
  const [url, setUrl] = useState(localStorage.getItem(KEY) || "");
  const videoId = extractYouTubeId(url);

  const applyHero = () => {
    localStorage.setItem(KEY, url.trim());
    // redirect to home with a full refresh
    window.location.href = "/";
  };

  return (
    <main className="container" style={{ padding: "28px 0" }}>
      <h1 style={{ fontSize: "clamp(28px,4vw,48px)" }}>Admin</h1>

      <section className="card" style={{ marginTop: 16, maxWidth: 640 }}>
        <h2 className="display" style={{ fontSize: 24, margin: "0 0 12px" }}>
          Hero Video
        </h2>

        <label
          style={{
            display: "block",
            fontSize: 14,
            opacity: 0.85,
            marginBottom: 6,
          }}
        >
          YouTube URL or 11-char ID
        </label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtu.be/XXXXXXX or the ID"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #333",
            background: "#111",
            color: "#fff",
          }}
        />

        <p style={{ marginTop: 8, fontSize: 13, opacity: 0.8 }}>
          Parsed ID: <code>{videoId || "—"}</code>
        </p>

        <div className="aspect-video" style={{ marginTop: 12 }}>
          {videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}`}
              title="Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div style={{ display: "grid", placeItems: "center" }}>
              Enter a valid URL/ID to preview
            </div>
          )}
        </div>

        {/* ✅ This button block is now correctly inside the <section> */}
        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={applyHero} disabled={!videoId}>
            Update Hero
          </button>
        </div>
      </section>
    </main>
  );
}
