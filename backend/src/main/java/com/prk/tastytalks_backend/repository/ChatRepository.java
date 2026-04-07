package com.prk.tastytalks_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.prk.tastytalks_backend.entity.ChatMessage;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByRoomOrderByTimestampAsc(String room);
}