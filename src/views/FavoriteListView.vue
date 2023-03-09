<template>
  <div class="favorites">
    <HouseContent
      :isFavorite="true"
      :housesprop="houses"
      @search="search"
      @sortBy="sortBy"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import HouseContent from "@/components/HouseContentComponent.vue";

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
    HouseContent,
  },
};
</script>

<style lang="scss" scoped></style>
