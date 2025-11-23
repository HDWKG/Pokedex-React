export default function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  return (
    <div>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} width={120} />
      <p>Type: {pokemon.types[0].type.name}</p>
    </div>
  );
}
