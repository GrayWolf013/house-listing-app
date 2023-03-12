<template>
  <div class="desktop-only">
    <nav class="topnav tab-button header-menu">
      <img src="@/assets/img_logo_dtt@3x.png" alt="Dtt logo" />
      <router-link to="/" active-class="active">Houses</router-link>
      <router-link to="/favorite" active-class="active">Favorite</router-link>
      <router-link to="/about" active-class="active">About</router-link>
    </nav>
  </div>
  <div class="mobile-only">
    <BottomTabBar />
  </div>
  <router-view />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import BottomTabBar from "@/components/mobile/BottomTabBar";

export default {
  name: "FavoriteListView",
  setup() {
    const store = useStore();

    const houses = computed(() => {
      return store.getters.getHousesByIds(
        store.getters["favoriteStore/getAll"]
      );
    });
    return {
      houses,
    };
  },
  components: {
    BottomTabBar,
  },
};
</script>

<style lang="scss">
// desktop design
.desktop-only {
  .topnav {
    overflow: hidden;
    background-color: map-get($colors, BACKGROUND2);

    a {
      float: left;
      color: map-get($colors, TERTIARY2);
      text-align: center;
      padding: 20px;
      text-decoration: none;
      margin-right: 2%;

      &:hover {
        background-color: map-get($textColors, TERTIARY2);
        color: map-get($textColors, PRIMARY);
      }
    }

    img {
      float: left;
      padding-top: 14px;
      padding-bottom: 14px;
      height: auto;
      width: 8%;
      margin-left: 15%;
      margin-right: 2%;
    }

    .active {
      color: map-get($textColors, PRIMARY);
    }
  }
}

// mobile design
.mobile-only {
}
</style>
