import { createStore } from "vuex";
import Api from "@/api/client";
import {
  convertApiModelToEditHouseModel,
  convertEditHouseModelToApiModel,
} from "@/store/modelConverter";
import { favoriteStore } from "./modules/favoriteStore";

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

      const filteredByStreet = state.houses.filter((house) =>
        house.location.street.toLowerCase().includes(searchText.toLowerCase())
      );
      const filteredByPrice = state.houses.filter((house) =>
        house.price.toString().toLowerCase().includes(searchText.toLowerCase())
      );
      const filteredByZip = state.houses.filter((house) =>
        house.location.zip.toLowerCase().includes(searchText.toLowerCase())
      );
      const filteredBySize = state.houses.filter((house) =>
        house.size.toString().toLowerCase().includes(searchText.toLowerCase())
      );
      const filteredByCity = state.houses.filter((house) =>
        house.location.city.toLowerCase().includes(searchText.toLowerCase())
      );
      let result = [
        ...new Set(
          filteredByStreet.concat(
            filteredByPrice,
            filteredByZip,
            filteredBySize,
            filteredByCity
          )
        ),
      ];
      return result;
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
      const apiModel = getters.getById(id);
      const house = convertApiModelToEditHouseModel(apiModel);
      return house;
    },

    getHouseRecommendations: (state, getters) => (id) => {
      const model = getters.getById(id);
      if (!model) {
        return null;
      }
      const { location, size, price } = model;

      // Filter out houses based on the location
      const filteredHouses = state.houses.filter((house) => {
        const houseLocation = house.location;
        if (house.id.toString() !== id) {
          // exclude house with matching id)
          if (
            houseLocation.city === location.city &&
            houseLocation.zip === location.zip
          ) {
            return (
              houseLocation.city === location.city &&
              houseLocation.zip === location.zip
            );
          } else if (houseLocation.city === location.city) {
            return houseLocation.city === location.city;
          } else if (houseLocation.zip === location.zip) {
            return houseLocation.zip === location.zip;
          } else {
            return true; // Don't filter if no city or zip specified
          }
        }
      });
      // Sort the filtered houses by their similarity to the model in terms of size and price
      const sortedHouses = filteredHouses.sort((house1, house2) => {
        const house1SizeDiff = Math.abs(house1.size - size);
        const house2SizeDiff = Math.abs(house2.size - size);
        const house1PriceDiff = Math.abs(house1.price - price);
        const house2PriceDiff = Math.abs(house2.price - price);
        const house1TotalDiff = house1SizeDiff + house1PriceDiff;
        const house2TotalDiff = house2SizeDiff + house2PriceDiff;
        return house1TotalDiff - house2TotalDiff;
      });
      // Return the top 3 houses from the sorted list
      return sortedHouses.slice(0, 3);
    },
    getHousesByIds: (state) => (ids) => {
      return state.houses.filter(house => ids.includes(house.id))
    }
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

    /**
     * Edit a specific property in an array in the store
     * @param {object} state The store's state
     * @param {object} data An object containing the array, id and value
     */
    editProperty: (state, data) => {
      state[data.array].forEach((element, index) => {
        if (element.id.toString() == data.id) {
          state[data.array][index] = data.value;
        }
      });
    },

    /**
     * Edit a specific property in an array in the store
     * @param {object} state The store's state
     * @param {object} data An object containing the array, id, property and value
     */
    editPropertyInArray: (state, data) => {
      state[data.array].forEach((element) => {
        if (element.id.toString() == data.id)
          element[data.property] = data.value;
      });
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
      return new Promise((resolve, reject) => {
        Api.post("/houses", body)
          .then((data) => {
            commit("appendProperty", { property: "houses", value: data });
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    editHouse({ commit }, data) {
      Api.edit("/houses", data)
        .then(() =>
          commit("editProperty", {
            array: "houses",
            id: data.id,
            value: convertEditHouseModelToApiModel(data.body),
          })
        )
        .catch((error) => console.error(error));
    },

    uploadHouseImg({ commit }, data) {
      Api.upload("/houses", data)
        .then(() =>
          commit("editPropertyInArray", {
            array: "houses",
            id: data.id,
            property: "image",
            value: data.value,
          })
        )
        .catch((error) => console.error(error));
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
  modules: {
    favoriteStore: favoriteStore,
  },
});
