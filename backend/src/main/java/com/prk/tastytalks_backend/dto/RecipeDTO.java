package com.prk.tastytalks_backend.dto;

import java.util.List;

public class RecipeDTO {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String image;
    private String chefName;
    private UserDTO user;
    private String cuisine;
    private String category;
    private String difficulty;
    private List<String> ingredients;
    private List<String> instructions;
    private Integer likeCount;
    private List<String> likes;
    private Double averageRating;
    private Integer totalRatings;
    private List<Double> ratings;
    private Integer prepTime;
    private Integer cookTime;
    private Integer servings;
    private Integer views;
    private Boolean isFeatured;
    private Boolean isTrending;

    public RecipeDTO() {}

    public RecipeDTO(Long id, String title, String description, String imageUrl, String chefName,
                     String cuisine, String category, String difficulty, List<String> ingredients,
                     List<String> instructions, Integer likeCount, Double averageRating,
                     Integer prepTime, Integer cookTime, Integer servings, Integer views) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.chefName = chefName != null ? chefName : "Unknown Chef";
        this.cuisine = cuisine;
        this.category = category;
        this.difficulty = difficulty;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.likeCount = likeCount != null ? likeCount : 0;
        this.averageRating = averageRating != null ? averageRating : 0.0;
        this.prepTime = prepTime != null ? prepTime : 0;
        this.cookTime = cookTime != null ? cookTime : 0;
        this.servings = servings != null ? servings : 1;
        this.views = views != null ? views : 0;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getChefName() {
        return chefName != null ? chefName : "Unknown Chef";
    }

    public void setChefName(String chefName) {
        this.chefName = chefName != null ? chefName : "Unknown Chef";
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }

    public Integer getLikeCount() {
        return likeCount != null ? likeCount : 0;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount != null ? likeCount : 0;
    }

    public Double getAverageRating() {
        return averageRating != null ? averageRating : 0.0;
    }

    public void setAverageRating(Double averageRating) {
        this.averageRating = averageRating != null ? averageRating : 0.0;
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
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public List<String> getLikes() {
        return likes;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public List<Double> getRatings() {
        return ratings;
    }

    public void setRatings(List<Double> ratings) {
        this.ratings = ratings;
    }

    public Integer getTotalRatings() {
        return totalRatings;
    }

    public void setTotalRatings(Integer totalRatings) {
        this.totalRatings = totalRatings;
    }

    public Boolean getIsFeatured() {
        return isFeatured != null ? isFeatured : false;
    }

    public void setIsFeatured(Boolean isFeatured) {
        this.isFeatured = isFeatured != null ? isFeatured : false;
    }

    public Boolean getIsTrending() {
        return isTrending != null ? isTrending : false;
    }

    public void setIsTrending(Boolean isTrending) {
        this.isTrending = isTrending != null ? isTrending : false;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
