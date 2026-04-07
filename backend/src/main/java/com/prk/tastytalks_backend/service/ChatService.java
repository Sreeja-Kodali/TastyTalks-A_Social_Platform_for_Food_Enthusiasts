package com.prk.tastytalks_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import com.prk.tastytalks_backend.entity.ChatMessage;
import com.prk.tastytalks_backend.repository.ChatRepository;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public List<ChatMessage> getMessagesByRoom(String room) {
        return chatRepository.findByRoomOrderByTimestampAsc(room);
    }

    public ChatMessage sendMessage(String message, String room, String sender) {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setMessage(message);
        chatMessage.setRoom(room);
        chatMessage.setSender(sender);
        chatMessage.setTimestamp(LocalDateTime.now());
        return chatRepository.save(chatMessage);
    }

    public void deleteMessage(Long id) {
        chatRepository.deleteById(id);
    }
}