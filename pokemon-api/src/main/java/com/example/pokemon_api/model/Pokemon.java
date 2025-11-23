package com.example.pokemon_api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Pokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String sprite; // ADD THIS

    public Pokemon() {}

    public Pokemon(String name, String type, String sprite) {
        this.name = name;
        this.type = type;
        this.sprite = sprite;
    }

    public Long getId() { return id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getSprite() { return sprite; }
    public void setSprite(String sprite) { this.sprite = sprite; }
}
