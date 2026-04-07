package com.prk.tastytalks_backend.dto;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String profileImage;
    private String avatar;
    private String bio;
    private Integer weeklyPoints;
    private Integer totalPoints;
    private Integer followersCount;
    private Integer followingCount;
    private Integer recipeCount;

    public UserDTO() {}

    public UserDTO(Long id, String username, String email, String role, String profileImage, 
                   String avatar, String bio, Integer weeklyPoints, Integer totalPoints,
                   Integer followersCount, Integer followingCount, Integer recipeCount) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.profileImage = profileImage;
        this.avatar = avatar;
        this.bio = bio;
        this.weeklyPoints = weeklyPoints != null ? weeklyPoints : 0;
        this.totalPoints = totalPoints != null ? totalPoints : 0;
        this.followersCount = followersCount != null ? followersCount : 0;
        this.followingCount = followingCount != null ? followingCount : 0;
        this.recipeCount = recipeCount != null ? recipeCount : 0;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Integer getWeeklyPoints() {
        return weeklyPoints != null ? weeklyPoints : 0;
    }

    public void setWeeklyPoints(Integer weeklyPoints) {
        this.weeklyPoints = weeklyPoints != null ? weeklyPoints : 0;
    }

    public Integer getTotalPoints() {
        return totalPoints != null ? totalPoints : 0;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints != null ? totalPoints : 0;
    }

    public Integer getFollowersCount() {
        return followersCount != null ? followersCount : 0;
    }

    public void setFollowersCount(Integer followersCount) {
        this.followersCount = followersCount != null ? followersCount : 0;
    }

    public Integer getFollowingCount() {
        return followingCount != null ? followingCount : 0;
    }

    public void setFollowingCount(Integer followingCount) {
        this.followingCount = followingCount != null ? followingCount : 0;
    }

    public Integer getRecipeCount() {
        return recipeCount != null ? recipeCount : 0;
    }

    public void setRecipeCount(Integer recipeCount) {
        this.recipeCount = recipeCount != null ? recipeCount : 0;
    }
}
