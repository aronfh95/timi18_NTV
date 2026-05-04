import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Aefingar } from "./pages/aefingar";
import Timaverkefni from "./pages/timaverkefni-useeffect";

type Page = "home" | "timaverkefni";
function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <button
          className={page === "home" ? "nav-btn nav-btn-active" : "nav-btn"}
          onClick={() => setPage("home")}
        >
          Heim
        </button>
        <button
          className={
            page === "timaverkefni" ? "nav-btn nav-btn-active" : "nav-btn"
          }
          onClick={() => setPage("timaverkefni")}
        >
          Tímaverkefni
        </button>
      </nav>
      <main className="app-main">
        {page === "home" ? <Aefingar /> : <Timaverkefni />}
      </main>
    </div>
  );
}

export default App;
