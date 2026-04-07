import { recipeAPI } from './api';

export const getRecipes = (params) => recipeAPI.getAll(params);
export const getRecipe = (id) => recipeAPI.getById(id);
export const getTrendingRecipes = () => recipeAPI.getTrending();
export const getFeaturedRecipes = () => recipeAPI.getFeatured();
export const createRecipe = (data) => recipeAPI.create(data);
export const updateRecipe = (id, data) => recipeAPI.update(id, data);
export const deleteRecipe = (id) => recipeAPI.delete(id);
export const likeRecipe = (id) => recipeAPI.like(id);
export const rateRecipe = (id, rating) => recipeAPI.rate(id, rating);
export const getRecipeComments = (id) => recipeAPI.getComments(id);
export const addRecipeComment = (id, text) => recipeAPI.addComment(id, text);
