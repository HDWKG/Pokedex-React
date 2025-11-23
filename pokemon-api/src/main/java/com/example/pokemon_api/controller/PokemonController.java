package com.example.pokemon_api.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pokemon_api.model.Pokemon;
import com.example.pokemon_api.repo.PokemonRepository;

@RestController
@RequestMapping("/pokemon")
@CrossOrigin(
    allowCredentials = "true",
    originPatterns = "*",
    allowedHeaders = "*"
)

public class PokemonController {

    private final PokemonRepository repo;

    public PokemonController(PokemonRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Pokemon> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Pokemon create(@RequestBody Pokemon pokemon) {
        return repo.save(pokemon);
    }

    @PutMapping("/{id}")
    public Pokemon update(@PathVariable Long id, @RequestBody Pokemon data) {
        Pokemon p = repo.findById(id).orElseThrow();
        p.setName(data.getName());
        p.setType(data.getType());
        return repo.save(p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
