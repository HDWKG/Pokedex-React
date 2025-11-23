import { useState, useEffect } from "react";
import { Trash2, Edit2, X, Check } from "lucide-react";

export default function MyPokemon() {
  const [myPokemon, setMyPokemon] = useState([]);
  const [editingPokemon, setEditingPokemon] = useState(null);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/pokemon")
      .then((res) => res.json())
      .then((data) => {
        setMyPokemon(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const deletePokemon = async (id) => {
    await fetch(`http://localhost:8080/pokemon/${id}`, {
      method: "DELETE",
    });
    setMyPokemon(myPokemon.filter((p) => p.id !== id));
  };

  const saveEdit = async () => {
    const updated = await fetch(
      `http://localhost:8080/pokemon/${editingPokemon.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, type: newType }),
      }
    ).then((res) => res.json());

    setMyPokemon(myPokemon.map((p) => (p.id === updated.id ? updated : p)));
    setEditingPokemon(null);
  };

  const startEditing = (p) => {
    setEditingPokemon(p);
    setNewName(p.name);
    setNewType(p.type);
  };

  const getTypeColor = (type) => {
    const colors = {
      fire: "bg-red-100 text-red-800 border-red-300",
      water: "bg-blue-100 text-blue-800 border-blue-300",
      grass: "bg-green-100 text-green-800 border-green-300",
      electric: "bg-yellow-100 text-yellow-800 border-yellow-300",
      psychic: "bg-purple-100 text-purple-800 border-purple-300",
      ice: "bg-cyan-100 text-cyan-800 border-cyan-300",
      dragon: "bg-indigo-100 text-indigo-800 border-indigo-300",
      dark: "bg-gray-800 text-gray-100 border-gray-900",
      fairy: "bg-pink-100 text-pink-800 border-pink-300",
      flying: "bg-sky-100 text-sky-800 border-sky-300",
    };
    return (
      colors[type?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-300"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            My Pokédex
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your Pokémon collection
          </p>
        </div>

        {editingPokemon && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full border border-gray-100">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Edit Pokémon
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={saveEdit}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Check size={18} />
                  Save
                </button>
                <button
                  onClick={() => setEditingPokemon(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <X size={18} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading your Pokémon...</p>
          </div>
        ) : myPokemon.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <p className="text-gray-400 text-lg">
              No Pokémon yet. Start building your collection!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myPokemon.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
              >
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex justify-center">
                  <img
                    src={p.sprite}
                    width={120}
                    height={120}
                    alt={p.name}
                    className="drop-shadow-lg"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 capitalize">
                    {p.name}
                  </h3>

                  <div className="mb-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getTypeColor(
                        p.type
                      )}`}
                    >
                      {p.type}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(p)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition text-sm shadow-md"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => deletePokemon(p.id)}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition text-sm shadow-md"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
