package com.prk.tastytalks_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.prk.tastytalks_backend.entity.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe,Long>{
}