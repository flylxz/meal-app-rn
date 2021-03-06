export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export const toggleFavorite = (id) => ({
  type: TOGGLE_FAVORITE,
  id,
});

export const setFilters = (filtersSetting) => ({
  type: SET_FILTERS,
  filters: filtersSetting,
});
