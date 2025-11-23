import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./routes/Home.jsx";
import MyPokemon from "./routes/MyPokemon.jsx";

export default function App() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
          <Link to="/" className="text-white font-bold text-2xl">
            ⚡ Pokédex
          </Link>

          <div className="flex gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg ${
                isActive("/") ? "bg-white text-red-600" : "text-white"
              }`}
            >
              Home
            </Link>

            <Link
              to="/mypokemon"
              className={`px-4 py-2 rounded-lg ${
                isActive("/mypokemon") ? "bg-white text-red-600" : "text-white"
              }`}
            >
              My Pokémon
            </Link>
          </div>
        </div>
      </nav>

      <main className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypokemon" element={<MyPokemon />} />
        </Routes>
      </main>
    </>
  );
}
