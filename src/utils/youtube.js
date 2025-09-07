// Extract a YouTube video ID from a raw ID or many URL shapes
export function extractYouTubeId(input = "") {
  const s = String(input).trim();

  // raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;

  try {
    const u = new URL(s);

    // normalize host (strip www., m.)
    const host = u.hostname.replace(/^www\./, "").replace(/^m\./, "");

    // youtu.be/<id>
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    // youtube.com/watch?v=<id>
    if (host.endsWith("youtube.com") && u.searchParams.has("v")) {
      const id = u.searchParams.get("v");
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    // youtube.com/embed/<id>
    // youtube.com/shorts/<id>
    // youtube.com/live/<id>
    const parts = u.pathname.split("/").filter(Boolean);
    const known = ["embed", "shorts", "live", "v"];
    const idx = parts.findIndex((p) => known.includes(p.toLowerCase()));
    if (idx !== -1 && parts[idx + 1]) {
      const id = parts[idx + 1];
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }

    // last-resort: first path segment might be the id
    if (parts[0] && /^[a-zA-Z0-9_-]{11}$/.test(parts[0])) {
      return parts[0];
    }
  } catch {
    // not a URL
  }
  return "";
}
