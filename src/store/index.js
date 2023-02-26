import { createStore } from 'vuex'
import Api from "@/api/client";

Array.prototype.sortBy = function(p) {
  return this.slice(0).sort(function(a,b) {
    return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  });
}

export default createStore({
  state: {
    houses: [],
  },
  
  getters: {
    search: (state) => (searchText) => {
      // check if value is event caused by clear x in input
      if(searchText.target) return state.houses
      return state.houses.filter(house => house.location.street.toLowerCase().includes(searchText.toLowerCase()))
    },
    sortBy: (state) => (byPrice) => {
      if (state.houses) {
        if (byPrice) {
          return state.houses.sortBy('price')
        } 
        return state.houses.sortBy('size')
      }
      return []
    },
    getById: (state) => (id) => {
      return state.houses.filter(house => house.id.toString() == id)[0]
    },
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
    /**
     * Append a specific property in the store
     * @param {object} state The store's state
     * @param {object} data An object containing the property and value
     */
    appendProperty: (state, data) => {
      state[data.property].push(data.value)
    },
  },

  actions: {
    getHouses: (context) => {
      Api.get("/houses")
        .then(data => context.commit('updateProperty', { property: 'houses', value: data }))
        .catch((error) => console.error(error))
    },

    // createHouse({commit}, user) {
      createHouse({commit}, body) {
    //     commit('SET_USER', user)
    //   },
    // createHouse: (context) => (body) => {

      console.log("body")
      console.log(body)
      console.log("body")

      Api.post("/houses", body)
        .then(data => commit('appendProperty', { property: 'houses', value: data }))
        .catch((error) => console.error(error))
    },
  },
});
