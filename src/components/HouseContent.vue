<template>
  <div class="home-body">
    <div class="home-body__TOP">
      <div class="header1">Houses</div>
      <router-link
        style="text-decoration: none; color: inherit"
        :to="{ name: 'createHouse' }"
      >
        <button class="btn">
          <div id="btn_container ">
            <img src="@/assets/ic_plus_white@3x.png" width="15" height="15" />
            <span>CREATE NEW</span>
          </div>
        </button>
      </router-link>
    </div>
    <div class="home-body__BODY">
      <input
        v-model="searchText"
        type="search"
        placeholder="search for a house"
        name="search"
        @keyup="search(searchText)"
      />
      <div class="sort-button">
        <button
          :class="{ active: sortByPrice }"
          class="input-field-title left"
          @click="sortBy(true)"
        >
          Price
        </button>
        <button
          :class="{ active: !sortByPrice }"
          class="input-field-title right"
          @click="sortBy(false)"
        >
          Size
        </button>
      </div>
    </div>
    <div>
      <br />
      <div v-if="searchText && housesprop.length > 0" class="header2">
        {{ housesprop.length }} result found
      </div>
    </div>
    <br />
    <div v-if="housesprop.length > 0">
      <div v-for="house of housesprop" :key="house.id">
        <router-link
          style="text-decoration: none; color: inherit"
          v-if="house.id"
          :to="{ name: 'houseDetails', params: { houseId: house.id } }"
        >
          <HouseCard :houseprop="house" />
        </router-link>
      </div>
    </div>
    <EmptySearchView
      v-else
    />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import HouseCard from "./HouseCard.vue";
import EmptySearchView from "./EmptySearchView.vue";
export default {
  name: "HomeContent",
  props: {
    housesprop: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const state = reactive({
      searchText: "",
      sortByPrice: true,
    });

    function search(searchText) {
      context.emit("search", searchText);
    }

    function sortBy(price) {
      state.sortByPrice = price;
      context.emit("sortBy", price);
    }

    return {
      ...toRefs(state),
      search,
      sortBy,
    };
  },
  components: {
    HouseCard,
    EmptySearchView,
  },
};
</script>

<style lang="scss">
.home-body {
  margin-left: 15%;
  margin-right: 15%;
  margin-top: 3%;

  .home-body__TOP {
    display: flex;
    justify-content: space-between;
  }

  .home-body__BODY {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .sort-button {
    .left {
      border-radius: 6px 0 0 6px;
    }
    .right {
      border-radius: 0 6px 6px 0;
    }
    button {
      width: 130px;
      height: 38px;
      border: none;
      color: white;
    }
    .active {
      background: map-get($colors, PRIMARY);
    }
  }
  .btn {
    width: 160px;
    height: 40px;
    padding: 0 10px;
    text-align: center;
    border: none;
    border-radius: 6px;
    justify-content: center;
    font-size: 16px;
    color: #333;
    background: map-get($colors, PRIMARY);
  }

  #btn_container {
    width: 20px;
    height: 20px;
    float: left;
  }

  .btn img {
    margin-right: 8px;
    vertical-align: middle;
  }

  .btn span {
    color: map-get($colors, BACKGROUND2);
    width: 120px;
    vertical-align: middle;
    margin-top: 0px;
  }
}
</style>
