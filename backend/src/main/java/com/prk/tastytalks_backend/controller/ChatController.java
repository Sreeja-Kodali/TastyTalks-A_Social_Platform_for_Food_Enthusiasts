package com.prk.tastytalks_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import com.prk.tastytalks_backend.entity.ChatMessage;
import com.prk.tastytalks_backend.service.ChatService;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/messages")
    public Map<String, Object> getMessages(@RequestParam String room) {
        List<ChatMessage> messages = chatService.getMessagesByRoom(room);
        Map<String, Object> response = new HashMap<>();
        response.put("data", messages);
        return response;
    }

    @PostMapping("/messages")
    public ChatMessage sendMessage(@RequestBody Map<String, Object> payload) {
        String message = (String) payload.get("message");
        String room = (String) payload.get("room");
        // For now, assume sender is hardcoded or from auth
        return chatService.sendMessage(message, room, "user");
    }

    @DeleteMapping("/messages/{id}")
    public Map<String, Object> deleteMessage(@PathVariable Long id) {
        chatService.deleteMessage(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        return response;
    }
}