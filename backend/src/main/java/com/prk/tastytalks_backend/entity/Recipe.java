package com.prk.tastytalks_backend.entity;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name="recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String image;

    private String cuisine;

    private String category;

    private String difficulty;

    @Column(name="prep_time")
    private Integer prepTime = 0;

    @Column(name="cook_time")
    private Integer cookTime = 0;

    private Integer servings = 1;

    private Integer views = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "recipe_ingredients",
        joinColumns = @JoinColumn(name = "recipe_id")
    )
    @Column(name = "ingredient_value")
    private List<String> ingredients = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "recipe_instructions",
        joinColumns = @JoinColumn(name = "recipe_id")
    )
    @Column(name = "instruction_value")
    private List<String> instructions = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ElementCollection
    private List<String> likes;

    @ElementCollection
    private List<Double> ratings;

    @ElementCollection
    private List<String> comments;

    public Recipe(){}

    public Long getId(){
        return id;
    }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getImage(){
        return image;
    }

    public void setImage(String image){
        this.image = image;
    }

    public String getCuisine(){
        return cuisine;
    }

    public void setCuisine(String cuisine){
        this.cuisine = cuisine;
    }

    public String getCategory(){
        return category;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public String getDifficulty(){
        return difficulty;
    }

    public void setDifficulty(String difficulty){
        this.difficulty = difficulty;
    }

    public List<String> getIngredients(){
        return ingredients;
    }

    public void setIngredients(List<String> ingredients){
        this.ingredients = ingredients;
    }

    public List<String> getInstructions(){
        return instructions;
    }

    public void setInstructions(List<String> instructions){
        this.instructions = instructions;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

    public List<String> getLikes(){
        return likes;
    }

    public void setLikes(List<String> likes){
        this.likes = likes;
    }

    public List<Double> getRatings(){
        return ratings;
    }

    public void setRatings(List<Double> ratings){
        this.ratings = ratings;
    }

    public List<String> getComments(){
        return comments;
    }

    public void setComments(List<String> comments){
        this.comments = comments;
    }
    public Integer getPrepTime() {
        return prepTime != null ? prepTime : 0;
    }

    public void setPrepTime(Integer prepTime) {
        this.prepTime = prepTime != null ? prepTime : 0;
    }

    public Integer getCookTime() {
        return cookTime != null ? cookTime : 0;
    }

    public void setCookTime(Integer cookTime) {
        this.cookTime = cookTime != null ? cookTime : 0;
    }

    public Integer getServings() {
        return servings != null ? servings : 1;
    }

    public void setServings(Integer servings) {
        this.servings = servings != null ? servings : 1;
    }

    public Integer getViews() {
        return views != null ? views : 0;
    }

    public void setViews(Integer views) {
        this.views = views != null ? views : 0;
    }}