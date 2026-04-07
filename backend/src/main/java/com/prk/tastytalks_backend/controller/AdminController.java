package com.prk.tastytalks_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import com.prk.tastytalks_backend.entity.User;
import com.prk.tastytalks_backend.entity.Recipe;
import com.prk.tastytalks_backend.service.UserService;
import com.prk.tastytalks_backend.service.RecipeService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        List<User> users = userService.getAllUsers();
        List<Recipe> recipes = recipeService.getAllRecipes();

        long totalUsers = users.size();
        long totalRecipes = recipes.size();
        long totalChefs = users.stream().filter(u -> "CHEF".equals(u.getRole())).count();
        long totalAdmins = users.stream().filter(u -> "ADMIN".equals(u.getRole())).count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalRecipes", totalRecipes);
        stats.put("totalChefs", totalChefs);
        stats.put("totalAdmins", totalAdmins);

        Map<String, Object> response = new HashMap<>();
        response.put("data", stats);
        return response;
    }

    @GetMapping("/users")
    public Map<String, Object> getUsers(@RequestParam(defaultValue = "1") int page,
                                       @RequestParam(defaultValue = "10") int limit) {
        List<User> users = userService.getAllUsers();
        // Simple pagination
        int start = (page - 1) * limit;
        int end = Math.min(start + limit, users.size());
        List<User> paginatedUsers = users.subList(start, end);

        Map<String, Object> response = new HashMap<>();
        response.put("data", paginatedUsers);
        response.put("total", users.size());
        response.put("page", page);
        response.put("limit", limit);
        return response;
    }

    @PutMapping("/users/{id}/role")
    public Map<String, Object> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        User user = userService.getUserById(id);
        if (user != null) {
            user.setRole(payload.get("role"));
            userService.saveUser(user);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }

    @DeleteMapping("/users/{id}")
    public Map<String, Object> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }

    @GetMapping("/recipes/pending")
    public Map<String, Object> getPendingRecipes() {
        // For now, return all recipes as pending
        List<Recipe> recipes = recipeService.getAllRecipes();
        Map<String, Object> response = new HashMap<>();
        response.put("data", recipes);
        return response;
    }
}