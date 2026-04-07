package com.prk.tastytalks_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.prk.tastytalks_backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

    User findByEmail(String email);
    
   
}