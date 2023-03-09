export const favoriteStore = {
  namespaced: true,
  state: {
    favoriteHouses: [],
  },

  getters: {
    isFavorite: (state) => (houseId) => {
      let isFavorite = false;
      state.favoriteHouses.forEach((favoriteHouseId) => {
        if (favoriteHouseId.toString() == houseId) {
          isFavorite = true;
        }
      });
      return isFavorite;
    },

    getAll: (state) => {
      return state.favoriteHouses;
    },
  },
  mutations: {
    addFavoriteHouse: (state, houseId) => {
      state.favoriteHouses.push(houseId);
    },

    removeFavoriteHouse: (state, houseId) => {
      const index = state.favoriteHouses.indexOf(houseId);
      if (index !== -1) {
        state.favoriteHouses.splice(index, 1);
      }
    },
  },

  actions: {
    addToFavorites: ({ commit }, houseId) => {
      commit("addFavoriteHouse", houseId);
    },

    removeFromFavorites: ({ commit }, houseId) => {
      commit("removeFavoriteHouse", houseId);
    },
  },
};
