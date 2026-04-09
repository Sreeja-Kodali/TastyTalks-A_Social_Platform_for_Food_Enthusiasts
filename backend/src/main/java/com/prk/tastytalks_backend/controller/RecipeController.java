package com.prk.tastytalks_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.stream.Collectors;
import com.prk.tastytalks_backend.dto.RecipeDTO;
import com.prk.tastytalks_backend.entity.Recipe;
import com.prk.tastytalks_backend.mapper.DTOMapper;
import com.prk.tastytalks_backend.service.RecipeService;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public Map<String, Object> getRecipes(){
        List<RecipeDTO> recipes = recipeService.getAllRecipes().stream()
                .map(DTOMapper::toRecipeDTO)
                .collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();
        response.put("data", recipes);
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRecipe(@PathVariable Long id){
        Recipe recipe = recipeService.getRecipeById(id);
        if (recipe == null) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Recipe not found with id: " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("data", DTOMapper.toRecipeDTO(recipe));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/trending")
    public Map<String, Object> getTrendingRecipes(){
        List<RecipeDTO> recipes = recipeService.getAllRecipes().stream()
                .map(DTOMapper::toRecipeDTO)
                .collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();
        response.put("data", recipes);
        return response;
    }

    @GetMapping("/featured")
    public Map<String, Object> getFeaturedRecipes(){
        List<RecipeDTO> recipes = recipeService.getAllRecipes().stream()
                .map(DTOMapper::toRecipeDTO)
                .collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();
        response.put("data", recipes);
        return response;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CHEF','ADMIN')")
    public RecipeDTO createRecipe(@RequestBody Recipe recipe){
        Recipe created = recipeService.createRecipe(recipe);
        return DTOMapper.toRecipeDTO(created);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('CHEF','ADMIN')")
    public RecipeDTO updateRecipe(@PathVariable Long id, @RequestBody Recipe recipe){
        Recipe updated = recipeService.updateRecipe(id, recipe);
        return DTOMapper.toRecipeDTO(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('CHEF','ADMIN')")
    public Map<String, Object> deleteRecipe(@PathVariable Long id){
        recipeService.deleteRecipe(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }

    @PostMapping("/{id}/like")
    public Map<String, Object> likeRecipe(@PathVariable Long id){
        Recipe recipe = recipeService.likeRecipe(id);
        Map<String, Object> response = new HashMap<>();
        if (recipe != null) {
            response.put("data", recipe.getLikes());
        } else {
            response.put("data", new ArrayList<>());
        }
        return response;
    }

    @PostMapping("/{id}/rate")
    public Map<String, Object> rateRecipe(@PathVariable Long id, @RequestBody Map<String, Double> payload){
        double rating = payload.get("rating");
        recipeService.rateRecipe(id, rating);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }

    @GetMapping("/{id}/comments")
    public Map<String, Object> getComments(@PathVariable Long id){
        List<Object> comments = recipeService.getComments(id);
        Map<String, Object> response = new HashMap<>();
        response.put("data", comments);
        return response;
    }

    @PostMapping("/{id}/comments")
    public Map<String, Object> addComment(@PathVariable Long id, @RequestBody Map<String, String> payload){
        String text = payload.get("text");
        recipeService.addComment(id, text);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }
}