import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";

function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <NavLink to="/" className="brand" style={{fontFamily:'"Playfair Display",serif', fontSize:20, color:'#fff', textDecoration:'none'}}>Arazzi</NavLink>
        <div>
          <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer container">
      <div>© {new Date().getFullYear()} Arazzi</div>
      <div style={{display:'flex', gap:14}}>
        <a href="#" aria-label="Instagram">Instagram</a>
        <a href="#" aria-label="YouTube">YouTube</a>
        <a href="#" aria-label="Spotify">Spotify</a>
      </div>
    </footer>
  );
}

function Page({ title, children }) {
  return (
    <main className="container" style={{padding:'28px 0'}}>
      <h1 style={{fontSize:'clamp(28px,4vw,48px)'}}>{title}</h1>
      <div className="stack-20">{children}</div>
    </main>
  );
}

function Contact(){ return <Page title="Contact">Contact form here.</Page>; }
function NotFound(){ return <Page title="Not Found">This page does not exist.</Page>; }

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}
