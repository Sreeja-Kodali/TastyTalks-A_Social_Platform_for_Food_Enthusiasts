package com.prk.tastytalks_backend.mapper;

import com.prk.tastytalks_backend.dto.UserDTO;
import com.prk.tastytalks_backend.dto.RecipeDTO;
import com.prk.tastytalks_backend.entity.User;
import com.prk.tastytalks_backend.entity.Recipe;

public class DTOMapper {

    public static UserDTO toUserDTO(User user) {
        if (user == null) {
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setProfileImage(user.getProfileImage());
        dto.setAvatar(user.getAvatar());
        dto.setBio(user.getBio());
        dto.setWeeklyPoints(user.getWeeklyPoints() != null ? user.getWeeklyPoints() : 0);
        dto.setTotalPoints(user.getTotalPoints() != null ? user.getTotalPoints() : 0);
        dto.setFollowersCount(user.getFollowers() != null ? user.getFollowers().size() : 0);
        dto.setFollowingCount(user.getFollowing() != null ? user.getFollowing().size() : 0);
        dto.setRecipeCount(user.getRecipes() != null ? user.getRecipes().size() : 0);

        return dto;
    }

    public static RecipeDTO toRecipeDTO(Recipe recipe) {
        if (recipe == null) {
            return null;
        }

        String chefName = recipe.getUser() != null && recipe.getUser().getUsername() != null
                ? recipe.getUser().getUsername()
                : "Unknown Chef";

        Integer likeCount = recipe.getLikes() != null ? recipe.getLikes().size() : 0;
        
        Double averageRating = 0.0;
        if (recipe.getRatings() != null && !recipe.getRatings().isEmpty()) {
            averageRating = recipe.getRatings().stream()
                    .mapToDouble(Double::doubleValue)
                    .average()
                    .orElse(0.0);
        }

        RecipeDTO dto = new RecipeDTO();
        dto.setId(recipe.getId());
        dto.setTitle(recipe.getTitle());
        dto.setDescription(recipe.getDescription());
        dto.setImageUrl(recipe.getImage());
        dto.setChefName(chefName);
        dto.setCuisine(recipe.getCuisine());
        dto.setCategory(recipe.getCategory());
        dto.setDifficulty(recipe.getDifficulty());
        dto.setIngredients(recipe.getIngredients());
        dto.setInstructions(recipe.getInstructions());
        dto.setLikeCount(likeCount);
        dto.setAverageRating(averageRating);
        dto.setPrepTime(recipe.getPrepTime() != null ? recipe.getPrepTime() : 0);
        dto.setCookTime(recipe.getCookTime() != null ? recipe.getCookTime() : 0);
        dto.setServings(recipe.getServings() != null ? recipe.getServings() : 1);
        dto.setViews(recipe.getViews() != null ? recipe.getViews() : 0);

        return dto;
    }
}
