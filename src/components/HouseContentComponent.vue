<template>
  <div class="home-body" :class="{ nonclickable: showAlert }">
    <div class="home-body__TOP" v-show="isFavorite">
      <div class="header1">Favorite Houses</div>
    </div>
    <div class="home-body__TOP" v-show="!isFavorite">
      <div class="header1">Houses</div>
      <!--   button for descktop     -->
      <button class="btn desktop-only" @click="push('createHouse')">
        <div id="btn_container ">
          <img src="@/assets/ic_plus_white@3x.png" width="15" height="15" />
          <span>CREATE NEW</span>
        </div>
      </button>
      <!--   button for mobile     -->
      <div class="mobile-only">
        <button @click="push('createHouse')">
          <img src="@/assets/ic_plus_grey@3x.png" width="25" height="25" />
        </button>
      </div>
    </div>
    <div class="home-body__BODY" v-show="!isFavorite">
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
          :to="'/details/' + house.id"
        >
          <HouseCard :houseprop="house" @toggleAlert="toggleAlert" />
        </router-link>
      </div>
    </div>
    <EmptySearchView v-else />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import HouseCard from "./HouseCardComponent.vue";
import EmptySearchView from "./EmptySearchComponent.vue";

export default {
  name: "HomeContent",
  props: {
    housesprop: {
      type: Array,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, context) {
    const router = useRouter();

    const state = reactive({
      searchText: "",
      sortByPrice: true,
      showAlert: false,
    });

    function toggleAlert(showAlert) {
      state.showAlert = showAlert;
    }

    function search(searchText) {
      context.emit("search", searchText);
    }

    function sortBy(price) {
      state.sortByPrice = price;
      context.emit("sortBy", price);
    }

    function push(routeName) {
      router.push({ name: routeName });
    }

    return {
      ...toRefs(state),
      toggleAlert,
      search,
      sortBy,
      push,
    };
  },
  components: {
    HouseCard,
    EmptySearchView,
  },
};
</script>

<style lang="scss" scoped>
.nonclickable {
  pointer-events: none;
}
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
    /* Styles for desktop devices */
    @media screen and (min-width: 768px) {
      display: flex;
      flex-direction: row;
    }
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
      @media screen and (min-width: 768px) {
        width: 130px;
      }
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

// design  for mobile version
.mobile-only {
  button {
    border: none;
    background: none;
    height: 100%;
  }
}
@media screen and (max-width: 767px) {
  .header1 {
    width: 100%;
    text-align: center;
  }
  input[type="search"] {
    width: 100%;
    margin-bottom: 20px;
  }
  .sort-button {
    width: 100%;
    button {
      width: 50%;
    }
  }
}
</style>
