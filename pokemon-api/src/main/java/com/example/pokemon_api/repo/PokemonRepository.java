package com.example.pokemon_api.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pokemon_api.model.Pokemon;

public interface PokemonRepository extends JpaRepository<Pokemon, Long> {
}
