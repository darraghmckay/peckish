import createReducer from '../lib/createReducer'
import ActionTypes from '../constants/ActionTypes'
import Recipe from '../records/Recipe';

const INITIAL_STATE = {};

export const searchedRecipes = createReducer(INITIAL_STATE, {
  [ActionTypes.SET_SEARCHED_RECIPES](state, payload) {
    let newState = {};
    payload.recipes.forEach((recipe) => {
      let id = recipe.href;
      newState[id] = {
        ...recipe,
        id
      };
    });

    return newState;
  }
});

