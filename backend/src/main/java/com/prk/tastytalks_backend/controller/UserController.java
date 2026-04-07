package com.prk.tastytalks_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.stream.Collectors;
import com.prk.tastytalks_backend.entity.User;
import com.prk.tastytalks_backend.dto.UserDTO;
import com.prk.tastytalks_backend.mapper.DTOMapper;
import com.prk.tastytalks_backend.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDTO> getUsers(){
        return userService.getAllUsers().stream()
            .map(DTOMapper::toUserDTO)
            .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public Map<String, Object> getUser(@PathVariable Long id){
        User user = userService.getUserById(id);
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("user", DTOMapper.toUserDTO(user));
        data.put("recipes", user != null ? user.getRecipes() : null);
        response.put("data", data);
        return response;
    }

    @GetMapping("/top-chefs")
    public Map<String, Object> getTopChefs(){
        List<UserDTO> chefs = userService.getAllUsers().stream()
            .filter(user -> user.getRole() != null && 
                   (user.getRole().equals("CHEF") || user.getRole().equals("ADMIN")))
            .map(DTOMapper::toUserDTO)
            .collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();
        response.put("data", chefs);
        return response;
    }

    @GetMapping("/{id}/bookmarks")
    public Map<String, Object> getBookmarks(@PathVariable Long id){
        // For now, return empty list - need to implement bookmarks in entity
        List<Object> bookmarks = new ArrayList<>();
        Map<String, Object> response = new HashMap<>();
        response.put("data", bookmarks);
        return response;
    }

    @PutMapping("/{id}")
    public UserDTO updateProfile(@PathVariable Long id, @RequestBody User updatedUser){
        User user = userService.updateProfile(id, updatedUser);
        return DTOMapper.toUserDTO(user);
    }

    @PostMapping("/{id}/follow")
    public Map<String, Object> followUser(@PathVariable Long id){
        userService.followUser(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }

    @PostMapping("/bookmark/{recipeId}")
    public Map<String, Object> bookmarkRecipe(@PathVariable Long recipeId){
        userService.bookmarkRecipe(recipeId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }

    @GetMapping("/{id}/notifications")
    public Map<String, Object> getNotifications(@PathVariable Long id){
        List<Object> notifications = userService.getNotifications(id);
        Map<String, Object> response = new HashMap<>();
        response.put("data", notifications);
        return response;
    }

    @PutMapping("/notifications/{id}/read")
    public Map<String, Object> markNotificationRead(@PathVariable Long id){
        userService.markNotificationRead(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }
}