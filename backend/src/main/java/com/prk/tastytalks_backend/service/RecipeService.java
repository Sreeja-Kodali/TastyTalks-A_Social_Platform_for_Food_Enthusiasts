package com.prk.tastytalks_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import com.prk.tastytalks_backend.entity.Recipe;
import com.prk.tastytalks_backend.repository.RecipeRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public List<Recipe> getAllRecipes(){
        return recipeRepository.findAll();
    }

    public Recipe createRecipe(Recipe recipe){
        return recipeRepository.save(recipe);
    }

    public Recipe getRecipeById(Long id){
        return recipeRepository.findById(id).orElse(null);
    }

    public Recipe updateRecipe(Long id, Recipe updatedRecipe){
        Recipe recipe = getRecipeById(id);
        if (recipe != null) {
            recipe.setTitle(updatedRecipe.getTitle());
            recipe.setDescription(updatedRecipe.getDescription());
            recipe.setImage(updatedRecipe.getImage());
            recipe.setIngredients(updatedRecipe.getIngredients());
            recipe.setInstructions(updatedRecipe.getInstructions());
            return recipeRepository.save(recipe);
        }
        return null;
    }

    public void deleteRecipe(Long id){
        recipeRepository.deleteById(id);
    }

    public void likeRecipe(Long id){
        Recipe recipe = getRecipeById(id);
        if (recipe != null) {
            if (recipe.getLikes() == null) {
                recipe.setLikes(new ArrayList<>());
            }
            // For now, just add a dummy user id
            recipe.getLikes().add("user123");
            recipeRepository.save(recipe);
        }
    }

    public void rateRecipe(Long id, double rating){
        Recipe recipe = getRecipeById(id);
        if (recipe != null) {
            if (recipe.getRatings() == null) {
                recipe.setRatings(new ArrayList<>());
            }
            recipe.getRatings().add(rating);
            recipeRepository.save(recipe);
        }
    }

    public List<Object> getComments(Long id){
        Recipe recipe = getRecipeById(id);
        if (recipe != null && recipe.getComments() != null) {
            return new ArrayList<>(recipe.getComments());
        }
        return new ArrayList<>();
    }

    public void addComment(Long id, String text){
        Recipe recipe = getRecipeById(id);
        if (recipe != null) {
            if (recipe.getComments() == null) {
                recipe.setComments(new ArrayList<>());
            }
            recipe.getComments().add(text);
            recipeRepository.save(recipe);
        }
    }
}