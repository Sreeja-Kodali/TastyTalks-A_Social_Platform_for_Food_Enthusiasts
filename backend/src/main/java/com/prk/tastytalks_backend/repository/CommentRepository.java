package com.prk.tastytalks_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.prk.tastytalks_backend.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment,Long>{
}