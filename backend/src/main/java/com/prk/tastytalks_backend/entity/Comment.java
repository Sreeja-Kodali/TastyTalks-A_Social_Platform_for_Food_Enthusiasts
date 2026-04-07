package com.prk.tastytalks_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name="comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long recipeId;

    private Long userId;

    private String comment;

    public Comment(){}

    public Long getId(){
        return id;
    }

    public Long getRecipeId(){
        return recipeId;
    }

    public void setRecipeId(Long recipeId){
        this.recipeId = recipeId;
    }

    public Long getUserId(){
        return userId;
    }

    public void setUserId(Long userId){
        this.userId = userId;
    }

    public String getComment(){
        return comment;
    }

    public void setComment(String comment){
        this.comment = comment;
    }
}