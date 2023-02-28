import { createStore } from "vuex";
import Api from "@/api/client";

Array.prototype.sortBy = function (p) {
  return this.slice(0).sort(function (a, b) {
    return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
  });
};

export default createStore({
  state: {
    houses: [],
  },

  getters: {
    search: (state) => (searchText) => {
      // check if value is event caused by clear x in input
      if (searchText.target) return state.houses;
      return state.houses.filter((house) =>
        house.location.street.toLowerCase().includes(searchText.toLowerCase())
      );
    },
    sortBy: (state) => (byPrice) => {
      if (state.houses) {
        if (byPrice) {
          return state.houses.sortBy("price");
        }
        return state.houses.sortBy("size");
      }
      return [];
    },
    getById: (state) => (id) => {
      return (
        state.houses.filter((house) => house.id.toString() == id)[0] ?? null
      );
    },
    removeElement: (state) => (id) => {
      return state.houses.filter((house) => house.id.toString() != id);
    },

    getByIdEditModel: (state, getters) => (id) => {
      var house = {
        streetName: "",
        houseNumber: null,
        numberAddition: null,
        zip: "",
        city: "",
        price: null,
        size: null,
        hasGarage: false,
        bedrooms: null,
        bathrooms: null,
        constructionYear: null,
        description: "",
      };
      if (id) {
        const model = getters.getById(id);
        if (model) {
          house.streetName = model.location.street;
          house.zip = model.location.zip;
          house.city = model.location.city;
          house.price = model.price;
          house.size = model.size;
          house.hasGarage = model.hasGarage;
          house.bedrooms = model.rooms.bedrooms;
          house.bathrooms = model.rooms.bathrooms;
          house.constructionYear = model.constructionYear;
          house.description = model.description;
        }
      }

      return house;
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
      state[data.property].push(data.value);
    },
  },

  actions: {
    getHouses: (context) => {
      Api.get("/houses")
        .then((data) =>
          context.commit("updateProperty", { property: "houses", value: data })
        )
        .catch((error) => console.error(error));
    },

    createHouse({ commit }, body) {
      Api.post("/houses", body)
        .then((data) =>
          commit("appendProperty", { property: "houses", value: data })
        )
        .catch((error) => console.error(error));
    },

    editHouse(context, data) {
      Api.edit("/houses", data).catch((error) => console.error(error));
    },

    uploadHouseImg(context, data) {
      Api.upload("/houses", data).catch((error) => console.error(error));
    },

    deleteHouse({ commit, getters }, id) {
      Api.delete("/houses", id)
        .then(() =>
          commit("updateProperty", {
            property: "houses",
            value: getters.removeElement(id),
          })
        )
        .catch((error) => console.error(error));
    },
  },
});
