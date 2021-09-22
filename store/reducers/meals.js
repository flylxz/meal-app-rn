import { MEALS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

export const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.id
      );
      const updatedMeals =
        existingIndex >= 0
          ? [...state.favoriteMeals.filter((meal) => meal.id !== action.id)]
          : [
              ...state.favoriteMeals,
              state.meals.find((meal) => meal.id === action.id),
            ];
      return { ...state, favoriteMeals: updatedMeals };

    case SET_FILTERS:
      const { filters } = action;
      const updatedFilteredMeals = state.meals.filter((meal) => {
        if (filters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (filters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (filters.vegetarian && !meal.isVegetarian) {
          return false;
        }
        if (filters.vegan && !meal.isVegan) {
          return false;
        }
        return true;
      });

      return { ...state, filteredMeals: updatedFilteredMeals };

    default:
      return state;
  }
};
