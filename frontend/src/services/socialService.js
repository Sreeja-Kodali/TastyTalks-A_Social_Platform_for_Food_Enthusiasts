import { userAPI } from './api';

export const followUser = (id) => userAPI.follow(id);
export const bookmarkRecipe = (recipeId) => userAPI.bookmark(recipeId);
export const getTopChefs = () => userAPI.getTopChefs();
