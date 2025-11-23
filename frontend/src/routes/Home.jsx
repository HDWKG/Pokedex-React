import { useState } from "react";
import PokemonSearch from "../components/PokemonSearch";
import PokemonCard from "../components/PokemonCard";
import { CheckCircle, Plus } from "lucide-react";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const addPokemon = async () => {
    if (!selectedPokemon) return;

    setIsLoading(true);
    try {
      const newEntry = {
        name: selectedPokemon.name,
        type: selectedPokemon.types[0].type.name,
        sprite: selectedPokemon.sprites.front_default,
      };

      await fetch("http://localhost:8080/pokemon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      setSuccessMessage(`${selectedPokemon.name} added to your collection!`);
      setSelectedPokemon(null);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Pokémon Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Search and add Pokémon to your personal collection
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-4 flex items-center gap-3 animate-slide-in">
            <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
            <p className="text-green-700 font-medium">{successMessage}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Find a Pokémon
          </h2>
          <PokemonSearch onSelect={setSelectedPokemon} />
        </div>

        {selectedPokemon ? (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Selected Pokémon
              </h2>
              <PokemonCard pokemon={selectedPokemon} />
            </div>

            <button
              onClick={addPokemon}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed text-lg"
            >
              <Plus size={24} />
              {isLoading ? "Adding..." : "Add Pokémon to My List"}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <p className="text-gray-400 text-lg">
              Search for a Pokémon above to get started
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
