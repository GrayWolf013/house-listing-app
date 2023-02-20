import { createStore } from 'vuex'
import Api from "@/api/client";

export default createStore({
  state: {
    houses: [],
  },

  mutations: {
    /**
     * Updates a specific property in the store
     * @param {object} state The store's state
     * @param {object} data An object containing the property and value
     */
    updateProperty: (state, data) => {
      state[data.property] = data.value;
    },
  },

  actions: {
    getHouses: (context) => {
      Api.get("/houses")
        .then(data => context.commit('updateProperty', { property: 'houses', value: data }))
        .catch((error) => console.error(error))
    },
  },
});
