import HeroVideo from "../components/HeroVideo.jsx";

export default function Home() {
  return (
    <>
      {/* Full-width hero (not inside the container) */}
      <HeroVideo />

      {/* Page content inside your container */}
      <main className="container" style={{ padding: "28px 0" }}>
        <h1 style={{ fontSize: "clamp(28px,4vw,48px)" }}>Arazzi</h1>
        <p style={{ opacity: 0.85, marginTop: 8 }}>
          We’re Arazzi Duo — Moran on piano, Moshe on kanun. Our music is like weaving a tapestry: jazz threads and Turkish threads coming together in new patterns every time we play. No two shows are the same — it’s always alive, always in the moment, and always about sharing the experience with you.
        </p>

        <section className="grid-2" style={{ marginTop: 24 }}>
          <div className="card">
            <h2 className="display" style={{ fontSize: 28, margin: "0 0 8px" }}>
              Coming Shows
            </h2>
            <p style={{ opacity: 0.8 }}>October 18th - Wild Eye bar Nevada City.</p>
          </div>
          <div className="card">
            <h2 className="display" style={{ fontSize: 28, margin: "0 0 8px" }}>
              Join Our List
            </h2>
            <p style={{ opacity: 0.8 }}>
              We’ll add a Netlify form to collect emails.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
