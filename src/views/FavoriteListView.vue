<template>
  <!-- <div class="header1">Favorite Houses</div>
  <div>
  <div v-for="house in houses" :key="house.id">
    {{ house }}
  </div>
  </div> -->

  <div class="favorites">
    <HouseContent :isFavorite="true" :housesprop="houses" @search="search" @sortBy="sortBy"/>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import HouseContent from "@/components/HouseContentComponent.vue"

export default {
  name: "FavoriteListView",
  setup() {
    const store = useStore();

    const state = reactive({});

    const houses = computed(() => {
      return store.getters.getHousesByIds(store.getters["favoriteStore/getAll"]) 
    });
    return {
      ...toRefs(state),
      houses,
    };
  },
  components: {
    HouseContent,
  },
};
</script>

<style lang="scss" scoped></style>
