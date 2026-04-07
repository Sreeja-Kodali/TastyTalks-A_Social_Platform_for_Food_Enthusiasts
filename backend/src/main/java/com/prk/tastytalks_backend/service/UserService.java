package com.prk.tastytalks_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import com.prk.tastytalks_backend.entity.User;
import com.prk.tastytalks_backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElse(null);
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public User updateProfile(Long id, User updatedUser){
        User user = getUserById(id);
        if (user != null) {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            // Don't update password here for security
            return userRepository.save(user);
        }
        return null;
    }

    public void followUser(Long id){
        // Implement follow logic
    }

    public void bookmarkRecipe(Long recipeId){
        // Implement bookmark logic
    }

    public List<Object> getNotifications(Long id){
        // Return empty for now
        return new ArrayList<>();
    }

    public void markNotificationRead(Long id){
        // Implement notification read logic
    }
}