package com.prk.tastytalks_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.prk.tastytalks_backend.entity.User;
import com.prk.tastytalks_backend.entity.Role;
import com.prk.tastytalks_backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(String username, String email, String password, String roleStr){
        // Check if email already exists
        if (userRepository.findByEmail(email) != null) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        // Set role in uppercase, default to FOODIE
        Role role = Role.FOODIE;
        if (roleStr != null && !roleStr.isEmpty()) {
            try {
                role = Role.valueOf(roleStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                role = Role.FOODIE;
            }
        }
        user.setRoleEnum(role);

        user.setAvatar("https://ui-avatars.com/api/?name=" + username + "&background=random");
        return userRepository.save(user);
    }


    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);

        System.out.println("Raw password: " + password);
        System.out.println("Stored password: " + (user != null ? user.getPassword() : "null"));

        boolean passwordMatches = user != null && passwordEncoder.matches(password, user.getPassword());
        System.out.println("Password matches: " + passwordMatches);

        if (user == null || !passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
