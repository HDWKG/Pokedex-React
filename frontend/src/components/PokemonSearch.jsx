import { useState } from "react";
import { Search, Loader } from "lucide-react";

export default function PokemonSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (value) => {
    setQuery(value);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Fetch the full Pokémon list once from PokeAPI
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data = await res.json();

      // Filter suggestions based on the query
      const filtered = data.results
        .filter((p) => p.name.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 10); // only show first 10

      setSuggestions(filtered);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectPokemon = async (name) => {
    setQuery(name);
    setSuggestions([]);
    setIsLoading(true);

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemon = await res.json();
      onSelect(pokemon);
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400 pointer-events-none" size={20} />
          <input
            type="text"
            placeholder="Search Pokémon by name..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition text-gray-800 placeholder-gray-500"
          />
          {isLoading && (
            <Loader className="absolute right-4 text-blue-500 animate-spin" size={20} />
          )}
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg list-none p-0 m-0 max-h-64 overflow-y-auto z-50">
            {suggestions.map((s) => (
              <li
                key={s.name}
                onClick={() => selectPokemon(s.name)}
                className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition border-b border-gray-100 last:border-b-0 capitalize font-medium text-gray-700 hover:text-blue-600"
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}

        {/* No results message */}
        {query.length > 0 && suggestions.length === 0 && !isLoading && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500 z-50">
            No Pokémon found
          </div>
        )}
      </div>
    </div>
  );
}