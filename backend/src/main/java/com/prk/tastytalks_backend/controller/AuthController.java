package com.prk.tastytalks_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import com.prk.tastytalks_backend.dto.LoginRequest;
import com.prk.tastytalks_backend.dto.RegisterRequest;
import com.prk.tastytalks_backend.dto.UserDTO;
import com.prk.tastytalks_backend.entity.User;
import com.prk.tastytalks_backend.mapper.DTOMapper;
import com.prk.tastytalks_backend.security.JwtUtils;
import com.prk.tastytalks_backend.security.CustomUserDetails;
import com.prk.tastytalks_backend.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequest request) {
        User savedUser = authService.register(request.getUsername(), request.getEmail(), request.getPassword(), request.getRole());
        return ResponseEntity.ok(DTOMapper.toUserDTO(savedUser));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        User user = authService.login(request.getEmail(), request.getPassword());
        String token = jwtUtils.generateToken(user.getEmail());
        UserDTO userDTO = DTOMapper.toUserDTO(user);
        return ResponseEntity.ok(Map.of(
            "token", token,
            "user", userDTO
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).build();
        }
        User user = authService.findByEmail(currentUser.getEmail());
        return ResponseEntity.ok(DTOMapper.toUserDTO(user));
    }
}
